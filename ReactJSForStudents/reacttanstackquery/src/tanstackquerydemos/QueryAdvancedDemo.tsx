import { useState, useEffect } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    useQueries,
} from "@tanstack/react-query";
import type { JSX } from "react";

/* Advanced React Query demo (TypeScript)
   Features demonstrated:
   - QueryClient + QueryClientProvider
   - useInfiniteQuery (infinite/paginated fetching)
   - useQuery (dependent queries, placeholderData, select)
   - useQueries (parallel queries)
   - Optimistic updates with rollback (mutations)
   - Prefetching on hover
   - Invalidations, refetch intervals, staleTime/cacheTime
   - Background updates & isFetching global indicator
   - Complex cache updates across multiple query keys/pages
*/

/* ----------------- In-memory fake API ----------------- */
type Product = { id: number; name: string; price: number; stock: number; category: string; description?: string };
type Customer = { id: number; name: string; email: string };
type Order = { id: number; items: { productId: number; qty: number }[]; customerId: number; createdAt: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CATEGORIES = ["gemstones", "electronics", "books", "home", "tools"] as const;

let DB_PRODUCTS: Product[] = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.round((5 + Math.random() * 200) * 100) / 100,
    stock: 1 + Math.floor(Math.random() * 20),
    category: CATEGORIES[i % CATEGORIES.length],
    description: `Detailed description for product ${i + 1}.`,
}));

let DB_CUSTOMERS: Customer[] = [
    { id: 1, name: "Alice Park", email: "alice@example.com" },
    { id: 2, name: "Ben Carter", email: "ben@example.com" },
    { id: 3, name: "Chloe Zhang", email: "chloe@example.com" },
];

let DB_ORDERS: Order[] = [];

/* API helpers */
async function apiFetchProducts(page = 1, limit = 12, q?: string, category?: string) {
    await sleep(350 + Math.random() * 200);
    let list = DB_PRODUCTS.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    const start = (page - 1) * limit;
    const items = list.slice(start, start + limit);
    const hasMore = start + limit < list.length;
    return { items, nextPage: hasMore ? page + 1 : undefined, total: list.length };
}

async function apiFetchProductById(id: number) {
    await sleep(180 + Math.random() * 200);
    const p = DB_PRODUCTS.find((x) => x.id === id);
    if (!p) throw new Error("Product not found");
    return p;
}

async function apiFetchCustomers() {
    await sleep(200);
    return DB_CUSTOMERS.slice();
}

async function apiPlaceOrder(customerId: number, items: { productId: number; qty: number }[]) {
    await sleep(500 + Math.random() * 300);
    for (const it of items) {
        const prod = DB_PRODUCTS.find((p) => p.id === it.productId);
        if (!prod) throw new Error(`Product ${it.productId} not found`);
        if (prod.stock < it.qty) throw new Error(`Insufficient stock for ${prod.name}`);
    }
    if (Math.random() < 0.08) throw new Error("Payment gateway failed");
    items.forEach((it) => {
        const prod = DB_PRODUCTS.find((p) => p.id === it.productId);
        if (prod) prod.stock -= it.qty;
    });
    const order: Order = { id: DB_ORDERS.length + 1, items, customerId, createdAt: new Date().toISOString() };
    DB_ORDERS.push(order);
    return order;
}

async function apiFetchOrders({ since = 0 }: { since?: number } = {}) {
    await sleep(200);
    return DB_ORDERS.filter((o) => o.id > since).slice().reverse();
}

/* ----------------- Query client ----------------- */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 10,
            cacheTime: 1000 * 60 * 5,
        },
        mutations: {
            retry: 0,
        },
    },
});

/* ----------------- Components ----------------- */

function GlobalFetchingIndicator() {
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        const unsub = queryClient.getQueryCache().subscribe(() => {
            const count = queryClient.isFetching();
            setIsFetching(count > 0);
        });
        return unsub;
    }, []);
    return isFetching ? <div className="text-xs text-indigo-600">Background fetching…</div> : null;
}

/* ProductList: infinite scroll + search + category filter + prefetch on hover */
function ProductList({ onSelect }: { onSelect: (id: number) => void }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string | undefined>(undefined);
    const limit = 12;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch,
    } = useInfiniteQuery(
        ["products-infinite", { q: query, category }],
        ({ pageParam = 1 }) => apiFetchProducts(pageParam, limit, query, category),
        {
            getNextPageParam: (last) => last.nextPage,
            keepPreviousData: true,
            staleTime: 1000 * 20,
            cacheTime: 1000 * 60 * 10,
            onError: (err) => console.error("Products infinite error:" + status, err),
        }
    );

    const items = data?.pages.flatMap((p) => p.items) ?? [];

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="px-2 py-1 border rounded w-48"
                    />
                    <select
                        value={category ?? ""}
                        onChange={(e) => setCategory(e.target.value || undefined)}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="">All categories</option>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => {
                            queryClient.removeQueries({ queryKey: ["products-infinite"], exact: false });
                            refetch();
                        }}
                        className="px-2 py-1 bg-gray-100 rounded"
                    >
                        Refresh
                    </button>
                </div>
                <GlobalFetchingIndicator />
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((p) => (
                    <div
                        key={p.id}
                        className="border rounded p-3 hover:shadow cursor-pointer"
                        onClick={() => onSelect(p.id)}
                        onMouseEnter={() => queryClient.prefetchQuery(["product", p.id], () => apiFetchProductById(p.id))}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-medium">{p.name}</div>
                                <div className="text-xs text-gray-500">{p.category}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">${p.price.toFixed(2)}</div>
                                <div className="text-xs text-indigo-600">stock {p.stock}</div>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</div>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">Showing {items.length} items</div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        {isFetchingNextPage ? "Loading…" : hasNextPage ? "Load more" : "No more"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ProductDetail: dependent query + add-to-cart optimistic mutation */
function ProductDetail({ productId }: { productId?: number }) {
    const qc = useQueryClient();

    const query = useQuery(
        ["product", productId],
        () => (productId ? apiFetchProductById(productId) : Promise.reject(new Error("No id"))),
        {
            enabled: !!productId,
            placeholderData: () =>
                productId
                    ? { id: productId, name: `Product ${productId}`, price: 0, stock: 0, category: "unknown", description: "Loading..." }
                    : undefined,
            select: (p: Product) => ({ ...p, displayPrice: p.price.toFixed(2) } as Product & { displayPrice?: string }),
        }
    );

    const addToCartMutation = useMutation(
        async ({ id, qty }: { id: number; qty: number }) => {
            await sleep(200);
            return { id, qty };
        },
        {
            onMutate: async ({ id, qty }) => {
                await qc.cancelQueries({ queryKey: ["cart"] });
                const prevCart = qc.getQueryData<{ productId: number; qty: number }[]>(["cart"]) ?? [];
                const productKeys = qc.getQueryCache().findAll().filter((e) => (e.queryKey?.[0] as string) === "products-infinite");
                const prevProducts = productKeys.map((k) => ({ key: k.queryKey, data: qc.getQueryData(k.queryKey) }));

                qc.setQueryData(["cart"], (old: any[] = []) => {
                    const idx = old.findIndex((it) => it.productId === id);
                    if (idx >= 0) {
                        const next = old.slice();
                        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
                        return next;
                    }
                    return [...old, { productId: id, qty }];
                });

                productKeys.forEach((entry) => {
                    qc.setQueryData(entry.queryKey, (old: any) => {
                        if (!old) return old;
                        const pages = old.pages?.map((pg: any) => ({
                            ...pg,
                            items: pg.items.map((it: Product) => (it.id === id ? { ...it, stock: Math.max(0, it.stock - qty) } : it)),
                        }));
                        if (pages) return { ...old, pages };
                        if (old.items) {
                            return { ...old, items: old.items.map((it: Product) => (it.id === id ? { ...it, stock: Math.max(0, it.stock - qty) } : it)) };
                        }
                        return old;
                    });
                });

                return { prevCart, prevProducts };
            },
            onError: (err, variables, context: any) => {
                if (context?.prevCart) qc.setQueryData(["cart"], context.prevCart);
                if (context?.prevProducts) context.prevProducts.forEach((p: any) => qc.setQueryData(p.key, p.data));
                console.error("Add to cart failed:", err);
                console.log("Variables during error:", variables);
            },
            onSettled: () => {
                qc.invalidateQueries({ queryKey: ["cart"] });
                qc.invalidateQueries({ queryKey: ["products-infinite"] });
            },
        }
    );

    if (!productId) return <div className="p-4 bg-white rounded border">Select a product to see details</div>;
    if (query.isLoading) return <div className="p-4 bg-white rounded border">Loading detail…</div>;
    if (query.isError) return <div className="p-4 bg-white rounded border text-red-600">Error loading product</div>;

    const product = query.data as Product;

    return (
        <div className="p-4 bg-white rounded border">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="text-sm text-gray-500">{product.category}</div>
                </div>
                <div className="text-right">
                    <div className="text-xl font-semibold">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-indigo-600">stock: {product.stock}</div>
                </div>
            </div>

            <p className="mt-3 text-sm text-gray-700">{product.description}</p>

            <div className="mt-4 flex items-center gap-3">
                <button
                    onClick={() => addToCartMutation.mutate({ id: product.id, qty: 1 })}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                    disabled={product.stock <= 0 || addToCartMutation.isLoading}
                >
                    Add to cart
                </button>
                {addToCartMutation.isError && <div className="text-xs text-red-600">Add failed</div>}
            </div>
        </div>
    );
}

/* Cart & Checkout: optimistic checkout + multi-cache updates + invalidation */
function CartAndCheckout() {
    const qc = useQueryClient();
    const { data: cart = [] } = useQuery<{ productId: number; qty: number }[]>(["cart"], { initialData: [] });
    const customersQuery = useQuery(["customers"], apiFetchCustomers, { staleTime: 1000 * 60 * 2 });

    const checkoutMutation = useMutation(
        async ({ customerId }: { customerId: number }) => {
            const items = (cart ?? []).map((c) => ({ productId: c.productId, qty: c.qty }));
            if (items.length === 0) throw new Error("Cart is empty");
            return apiPlaceOrder(customerId, items);
        },
        {
            onMutate: async ({ customerId }) => {
                await qc.cancelQueries({ queryKey: ["cart"] });
                await qc.cancelQueries({ queryKey: ["orders"] });
                const prevCart = qc.getQueryData<{ productId: number; qty: number }[] | undefined>(["cart"]);
                const prevProducts = qc.getQueryCache().findAll().filter((e) => (e.queryKey?.[0] as string) === "products-infinite").map((entry) => ({ key: entry.queryKey, data: qc.getQueryData(entry.queryKey) }));
                const prevOrders = qc.getQueryData(["orders"]);

                qc.setQueryData(["cart"], () => []);

                const items = prevCart ?? [];
                prevProducts.forEach((p) => {
                    qc.setQueryData(p.key, (old: any) => {
                        if (!old) return old;
                        const pages = old.pages?.map((pg: any) => ({
                            ...pg,
                            items: pg.items.map((it: Product) => {
                                const found = items.find((x: any) => x.productId === it.id);
                                return found ? { ...it, stock: Math.max(0, it.stock - found.qty) } : it;
                            }),
                        }));
                        if (pages) return { ...old, pages };
                        if (old.items) {
                            return { ...old, items: old.items.map((it: Product) => {
                                const found = items.find((x: any) => x.productId === it.id);
                                return found ? { ...it, stock: Math.max(0, it.stock - found.qty) } : it;
                            }) };
                        }
                        return old;
                    });
                });

                qc.setQueryData<Order[] | undefined>(["orders"], (old = []) => [
                    ...old,
                    { id: -Date.now(), items: (prevCart ?? []).map((c: any) => ({ productId: c.productId, qty: c.qty })), customerId, createdAt: new Date().toISOString() },
                ]);

                return { prevCart, prevProducts, prevOrders };
            },
            onError: (err, vars, context: any) => {
                if (context?.prevCart) qc.setQueryData(["cart"], context.prevCart);
                if (context?.prevProducts) context.prevProducts.forEach((p: any) => qc.setQueryData(p.key, p.data));
                if (context?.prevOrders) qc.setQueryData(["orders"], context.prevOrders);
                console.error("Checkout failed:", err);
                console.log("Variables during error:", vars);
            },
            onSuccess: () => {
                qc.invalidateQueries({ queryKey: ["orders"] });
                qc.invalidateQueries({ queryKey: ["products-infinite"] });
            },
            onSettled: () => {
                qc.invalidateQueries({ queryKey: ["orders"] });
                qc.invalidateQueries({ queryKey: ["cart"] });
            },
        }
    );

    return (
        <div className="bg-white rounded shadow p-4">
            <h4 className="font-semibold mb-2">Cart</h4>
            {cart.length === 0 ? (
                <div className="text-sm text-gray-500">Cart empty</div>
            ) : (
                <ul className="space-y-2 text-sm">
                    {cart.map((c) => {
                        const prod = DB_PRODUCTS.find((p) => p.id === c.productId);
                        return (
                            <li key={c.productId} className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{prod?.name ?? `Product ${c.productId}`}</div>
                                    <div className="text-xs text-gray-500">qty: {c.qty}</div>
                                </div>
                                <div className="text-sm">${(prod?.price ?? 0).toFixed(2)}</div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className="mt-3 flex items-center gap-2">
                <select
                    className="px-2 py-1 border rounded"
                    defaultValue={customersQuery.data?.[0]?.id ?? ""}
                    id="customer-select"
                >
                    {customersQuery.data?.map((c) => (
                        <option value={c.id} key={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        const sel = (document.getElementById("customer-select") as HTMLSelectElement).value;
                        checkoutMutation.mutate({ customerId: Number(sel) });
                    }}
                    disabled={checkoutMutation.isLoading || cart.length === 0}
                    className="px-3 py-1 bg-indigo-700 text-white rounded disabled:opacity-50"
                >
                    {checkoutMutation.isLoading ? "Processing…" : "Checkout"}
                </button>
                {checkoutMutation.isError && <div className="text-xs text-red-600">Checkout failed: {(checkoutMutation.error as Error).message}</div>}
            </div>
        </div>
    );
}

/* Orders panel shows live updates (refetchInterval) and uses dependent/parallel queries */
function OrdersPanel() {
    const ordersQuery = useQuery<Order[], Error>(["orders"], () => apiFetchOrders({ since: 0 }), {
        refetchInterval: 5000,
        staleTime: 1000 * 5,
    });

    const recent = ordersQuery.data ?? [];

    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold">Orders</h4>
                <div className="text-xs text-gray-500">{recent.length} total</div>
            </div>
            <ul className="mt-2 space-y-2 text-sm">
                {recent.length === 0 && <li className="text-gray-500">No orders yet</li>}
                {recent.slice(0, 8).map((o) => (
                    <li key={o.id} className="flex justify-between">
                        <div>
                            <div className="font-medium">Order #{o.id}</div>
                            <div className="text-xs text-gray-500">Customer #{o.customerId}</div>
                        </div>
                        <div className="text-xs">{new Date(o.createdAt).toLocaleTimeString()}</div>
                    </li>
                ))}
            </ul>
            {ordersQuery.isFetching && <div className="mt-2 text-xs text-indigo-600">Refreshing orders…</div>}
        </div>
    );
}

/* Advanced demo root */
export default function QueryAdvancedDemo(): JSX.Element {
    const [selectedProduct, setSelectedProduct] = useState<number | undefined>(undefined);

    function Content() {
        // parallel queries must run inside QueryClientProvider (useQueries needs client)
        const parallel = useQueries({
            queries: [
                { queryKey: ["customers"], queryFn: apiFetchCustomers, staleTime: 1000 * 60 },
                {
                    queryKey: ["promos"],
                    queryFn: async () => {
                        await sleep(120);
                        return { banner: "SPRING_SALE", discountPercent: 10 };
                    },
                },
            ],
        }) as any[];

        return (
            <div className="container mx-auto p-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">React Query — Advanced Example</h2>
                            <div className="text-sm text-gray-500">Demonstrates advanced patterns</div>
                        </div>

                        <ProductList onSelect={(id) => setSelectedProduct(id)} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ProductDetail productId={selectedProduct} />
                            <div className="bg-white rounded shadow p-4">
                                <h4 className="font-semibold mb-2">Parallel & Prefetch Example</h4>
                                <div className="text-sm text-gray-600">Customers: {parallel[0].data?.length ?? "—"}</div>
                                <div className="text-sm text-gray-600 mt-1">Promo banner: {(parallel[1].data as any)?.banner ?? "—"}</div>
                                <div className="mt-3">
                                    <small className="text-xs text-gray-500">Hover products to prefetch details; click to open details pane.</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <CartAndCheckout />
                        <OrdersPanel />
                        <div className="bg-white rounded shadow p-4">
                            <h4 className="font-semibold">Dev Tools-ish</h4>
                            <div className="mt-2 text-xs text-gray-600">
                                <button
                                    className="px-2 py-1 bg-gray-100 rounded mr-2"
                                    onClick={() => {
                                        queryClient.clear();
                                    }}
                                >
                                    Clear cache
                                </button>
                                <button
                                    className="px-2 py-1 bg-gray-100 rounded"
                                    onClick={() => {
                                        apiPlaceOrder(1, [{ productId: 1 + Math.floor(Math.random() * DB_PRODUCTS.length), qty: 1 }]).then(() =>
                                            queryClient.invalidateQueries({ queryKey: ["orders"] })
                                        );
                                    }}
                                >
                                    Seed order
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Content />
        </QueryClientProvider>
    );
}