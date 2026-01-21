import { useState } from "react";
import type { JSX } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
    QueryCache,
    type QueryKey,
} from "@tanstack/react-query";

/* ...existing code... */

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

type Order = {
    id: number | string;
    productId: number;
    quantity: number;
    createdAt: string;
    optimistic?: boolean;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let PRODUCTS: Product[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (i + 1) * 3,
    stock: 5 + (i % 6),
}));

let ORDERS: Order[] = [];

async function fetchProducts({ page = 1, limit = 6 }: { page?: number; limit?: number }) {
    await sleep(400);
    const start = (page - 1) * limit;
    const items = PRODUCTS.slice(start, start + limit);
    const total = PRODUCTS.length;
    return { items, total };
}

async function fetchOrders() {
    await sleep(300);
    return ORDERS.slice().reverse();
}

async function placeOrderApi({ productId, quantity }: { productId: number; quantity: number }) {
    await sleep(600);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) throw new Error("Insufficient stock");
    if (Math.random() < 0.12) throw new Error("Server failed to place order");
    product.stock -= quantity;
    const order: Order = {
        id: ORDERS.length + 1,
        productId,
        quantity,
        createdAt: new Date().toISOString(),
    };
    ORDERS.push(order);
    return order;
}

/* ----- React Query demo component ----- */
const queryClient = new QueryClient({ queryCache: new QueryCache() });

function Products({
    page,
    setPage,
}: {
    page: number;
    setPage: (fn: number | ((s: number) => number)) => void;
}) {
    const { data, isLoading, isError, isFetching } = useQuery<{ items: Product[]; total: number }, Error>(
        ["products", page],
        () => fetchProducts({ page, limit: 6 }),
        { keepPreviousData: true, staleTime: 1000 * 10 }
    );

    if (isLoading) return <div className="text-gray-600">Loading products...</div>;
    if (isError) return <div className="text-red-600">Failed loading products</div>;

    const totalPages = Math.ceil((data?.total ?? 0) / 6);

    return (
        <div className="border rounded p-4 bg-white">
            <h3 className="text-lg font-medium mb-2">
                Products {isFetching ? <span className="text-sm text-gray-500">(refreshing...)</span> : null}
            </h3>
            <ul className="space-y-2">
                {data?.items.map((p) => (
                    <li key={p.id} className="text-sm">
                        <span className="font-medium">{p.name}</span> — ${p.price} — stock: <span className="text-indigo-600">{p.stock}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-3 flex items-center gap-3">
                <button
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    onClick={() => setPage((s: number) => Math.max(1, s - 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {page} / {totalPages}
                </span>
                <button
                    className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
                    onClick={() => setPage((s: number) => Math.min(totalPages, s + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

function Orders() {
    const { data = [], isLoading } = useQuery<Order[], Error>(["orders"], fetchOrders, { staleTime: 1000 * 20 });
    if (isLoading) return <div className="text-gray-600">Loading orders...</div>;
    return (
        <div className="border rounded p-4 bg-white">
            <h3 className="text-lg font-medium mb-2">Orders</h3>
            <ul className="space-y-2 text-sm">
                {data.length === 0 && <li className="text-gray-500">No orders yet</li>}
                {data.map((o) => (
                    <li key={o.id}>
                        Order #{o.id} — product {o.productId} — qty: {o.quantity} — {new Date(o.createdAt).toLocaleString()}
                        {o.optimistic ? <span className="ml-2 text-xs text-yellow-600">optimistic</span> : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function OrderForm() {
    const [productId, setProductId] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(1);
    const qc = useQueryClient();

    const mutation = useMutation<Order, Error, { productId: number; quantity: number }>(placeOrderApi, {
        onMutate: async (vars) => {
            // cancel ongoing related queries
            await qc.cancelQueries({ queryKey: ["products"] });
            await qc.cancelQueries({ queryKey: ["orders"] });

            // snapshot all product queries
            const productEntries = qc
                .getQueryCache()
                .findAll()
                .filter((e) => (e.queryKey?.[0] as string) === "products");

            const prevProducts = productEntries.map((entry) => ({
                queryKey: entry.queryKey as QueryKey,
                data: qc.getQueryData(entry.queryKey as QueryKey),
            }));

            const prevOrders = qc.getQueryData<Order[]>(["orders"]);

            // optimistic update: add order to orders list
            qc.setQueryData<Order[] | undefined>(["orders"], (old = []) => [
                ...(old || []),
                { id: `temp-${Date.now()}`, productId: vars.productId, quantity: vars.quantity, createdAt: new Date().toISOString(), optimistic: true },
            ]);

            // decrement stock across all cached product pages
            productEntries.forEach((entry) => {
                const key = entry.queryKey as QueryKey;
                qc.setQueryData<{ items: Product[]; total: number } | undefined>(key, (old) => {
                    if (!old) return old;
                    const items = old.items.map((p) => (p.id === vars.productId ? { ...p, stock: Math.max(0, p.stock - vars.quantity) } : p));
                    return { ...old, items };
                });
            });

            return { prevProducts, prevOrders };
        },
        onError: (err, vars, context: any) => {
            // rollback all product pages
            if (context?.prevProducts) {
                context.prevProducts.forEach((p: any) => qc.setQueryData(p.queryKey, p.data));
                console.log("Rolled back products due to error:", err.message);
                console.log("vars during error:", vars);
            }
            if (context?.prevOrders) qc.setQueryData(["orders"], context.prevOrders);
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ["orders"] });
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });

    return (
        <div className="border rounded p-4 bg-white">
            <h3 className="text-lg font-medium mb-2">Place Order (optimistic)</h3>
            <div className="flex flex-col gap-3">
                <label className="text-sm">
                    Product ID:
                    <input
                        type="number"
                        value={productId}
                        min={1}
                        onChange={(e) => setProductId(Number(e.target.value))}
                        className="ml-2 w-20 px-2 py-1 border rounded"
                    />
                </label>
                <label className="text-sm">
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="ml-2 w-20 px-2 py-1 border rounded"
                    />
                </label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => mutation.mutate({ productId, quantity })}
                        disabled={mutation.isLoading}
                        className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        {mutation.isLoading ? "Placing..." : "Place Order"}
                    </button>
                    {mutation.isError && <div className="text-red-600 text-sm">Error: {mutation.error?.message}</div>}
                </div>
            </div>
        </div>
    );
}

export default function QueryPageOne(): JSX.Element {
    const [page, setPage] = useState<number>(1);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto p-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-semibold">React Query — Product & Order Flow Demo</h2>
                    <p className="text-sm text-gray-500 -mt-1">Features: Query Invalidation • Optimistic Updates • Pagination</p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">
                        <div>
                            <Products page={page} setPage={setPage} />
                            <div className="h-3" />
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1 bg-gray-100 rounded"
                                    onClick={() => queryClient.invalidateQueries({ queryKey: ["products"] })}
                                >
                                    Invalidate Products
                                </button>
                                <button
                                    className="px-3 py-1 bg-gray-100 rounded"
                                    onClick={() => queryClient.invalidateQueries({ queryKey: ["orders"] })}
                                >
                                    Invalidate Orders
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <div className="w-full">
                                <OrderForm />
                            </div>
                            <div className="w-full">
                                <Orders />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-gray-600">
                        Tip: Try placing orders — optimistic UI will update immediately; occasional simulated server failures demonstrate rollback.
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    );
}
/* ...existing code... */