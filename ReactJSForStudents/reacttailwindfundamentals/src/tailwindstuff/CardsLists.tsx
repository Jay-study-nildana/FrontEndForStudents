import { useState } from "react";
import type { JSX } from "react";

/**
 * CardsLists.tsx
 *
 * Demonstrates common card and list UI patterns using Tailwind CSS:
 * - Profile card with actions and badge
 * - Product card with price, tags, and favorite toggle
 * - Horizontal media card (image + content)
 * - Gallery card (image + caption)
 * - Simple list group and nested list
 * - Interactive checklist (mark complete)
 *
 * Usage: drop into src/components and render <CardsLists /> from your app.
 */

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  image?: string;
};

const sampleProducts: Product[] = [
  {
    id: "p1",
    title: "Classic Tee",
    price: "$24",
    description: "Comfortable cotton tee with classic fit.",
    tags: ["cotton", "unisex"],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Denim Jacket",
    price: "$79",
    description: "Durable denim jacket with a clean silhouette.",
    tags: ["outerwear", "denim"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=60&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Sneakers",
    price: "$59",
    description: "Lightweight everyday sneakers, breathable mesh.",
    tags: ["footwear"],
    image: "https://images.unsplash.com/photo-1528701800489-476a4c8b9b10?w=800&q=60&auto=format&fit=crop",
  },
];

export default function CardsLists(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProfileCard />
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <HorizontalCard
              title="Weekly Digest"
              subtitle="Top reads and projects"
              body="A short summary of what happened this week across the product and design teams. Cards are great for compact summaries."
              image="https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200&q=60&auto=format&fit=crop"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GalleryCard
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format&fit=crop"
            alt="Ocean waves"
            caption="Ocean waves at sunset — example image card"
          />

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Simple list group</h3>
              <SimpleList
                items={[
                  "Semantic markup (ul/ol)",
                  "Use list-disc or list-decimal classes",
                  "Keep items short and scannable",
                ]}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Interactive checklist</h3>
              <Checklist
                items={[
                  { id: "c1", text: "Install Tailwind and configure content paths" },
                  { id: "c2", text: "Create base styles and import in root" },
                  { id: "c3", text: "Build a few reusable component classes" },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">Nested list example</h3>
          <NestedList />
        </section>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tip: extract repeated sets of classes into components or @apply rules to keep markup readable.
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function ProfileCard() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=60&auto=format&fit=crop"
          alt="Avatar"
          className="h-16 w-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
        <div>
          <h4 className="text-lg font-semibold">Alex Johnson</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Product Designer</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-800">Lead</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Remote</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        Alex focuses on creating accessible, high-quality interfaces. Enjoys pair-design sessions and micro-interactions.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
          Message
        </button>
        <button className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-sm">View profile</button>
        <button className="ml-auto text-sm text-gray-500 dark:text-gray-400">More</button>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
        ) : (
          <div className="w-full h-40 bg-gray-100 dark:bg-gray-900" />
        )}

        <button
          onClick={() => setFav((s) => !s)}
          aria-pressed={fav}
          className="absolute top-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow hover:scale-105 transform transition"
          title={fav ? "Remove favorite" : "Add favorite"}
        >
          {fav ? (
            <svg className="h-5 w-5 text-pink-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 21s-7-4.35-9.06-6.21A5.5 5.5 0 013 9.5 5.5 5.5 0 018.5 4 6.5 6.5 0 0112 6.1 6.5 6.5 0 0115.5 4 5.5 5.5 0 0121 9.5c0 2.04-.77 3.86-3.06 5.29C19 16.65 12 21 12 21z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-9.06-6.21A5.5 5.5 0 013 9.5 5.5 5.5 0 018.5 4 6.5 6.5 0 0112 6.1 6.5 6.5 0 0115.5 4 5.5 5.5 0 0121 9.5c0 2.04-.77 3.86-3.06 5.29C19 16.65 12 21 12 21z" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div>
            <h4 className="font-semibold">{product.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-base font-bold">{product.price}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Free returns</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm">Add to cart</button>
          <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm">Details</button>
        </div>
      </div>
    </article>
  );
}

function HorizontalCard({ title, subtitle, body, image }: { title: string; subtitle?: string; body: string; image?: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex gap-4 items-start">
      {image && (
        <div className="shrink-0 w-28 h-20 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start gap-3">
          <div>
            <h4 className="font-semibold">{title}</h4>
            {subtitle && <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setExpanded((s) => !s)}
              className="text-sm text-indigo-600 hover:underline"
              aria-expanded={expanded}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        <p className={`mt-2 text-sm text-gray-700 dark:text-gray-300 ${expanded ? "" : "line-clamp-2"}`}>
          {body}
        </p>
      </div>
    </article>
  );
}

function GalleryCard({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm overflow-hidden">
      <img src={src} alt={alt} className="w-full h-56 object-cover rounded-md" />
      {caption && <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">{caption}</figcaption>}
    </figure>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
      {items.map((it, i) => (
        <li key={i} className="py-3 flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
              {i + 1}
            </span>
          </div>
          <div className="flex-1 text-sm text-gray-700 dark:text-gray-300">{it}</div>
        </li>
      ))}
    </ul>
  );
}

function Checklist({ items }: { items: { id: string; text: string }[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((it) => [it.id, false]))
  );

  function toggle(id: string) {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  }

  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id} className="flex items-start gap-3">
          <label className="inline-flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!checked[it.id]}
              onChange={() => toggle(it.id)}
              className="h-4 w-4 mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-400"
            />
            <div>
              <div className={`text-sm ${checked[it.id] ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                {it.text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Tip: mark items as done</div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}

function NestedList() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ol className="list-decimal pl-6 space-y-2">
        <li>
          Setup project
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Initialize repo</li>
            <li>Install dependencies</li>
            <li>Configure Tailwind</li>
          </ul>
        </li>
        <li>
          Build components
          <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
            <li>Layout primitives</li>
            <li>Form controls</li>
            <li>Cards & lists</li>
          </ol>
        </li>
        <li>
          Accessibility & polish
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            <li>Keyboard support</li>
            <li>Focus styles</li>
            <li>Contrast checks</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}