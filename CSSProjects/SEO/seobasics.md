# SEO Basics — Detailed One‑Page Guide for Students

A practical, expanded reference covering fundamental and actionable principles of Search Engine Optimization (SEO). Use this when building, reviewing, or teaching web pages. Includes examples, best practices, and a concise audit workflow.

---

## 1. Why SEO matters
- Organic search drives sustainable, high‑intent traffic.
- Good SEO improves discoverability, credibility, and user experience.
- SEO and accessibility overlap: well-structured, accessible sites often perform better in search.

---

## 2. On‑page SEO (page-level signals)
- Title tag (`<title>`)
  - Unique per page. Put primary keywords near the beginning.
  - Aim ~50–60 characters (avoid truncation).
  - Example: `<title>Semantic HTML & Accessibility — Course Notes</title>`

- Meta description
  - 120–160 chars. Not a ranking signal but improves click‑through rates (CTR).
  - Write a concise benefit-driven summary.
  - Example:
    ```html
    <meta name="description" content="Practical notes on semantic HTML and accessibility for web developers. Learn best practices and examples.">
    ```

- Headings
  - One logical `<h1>` per page. Use H2/H3 to structure content hierarchically.
  - Use keywords naturally; headings help search engines understand structure.

- URL structure
  - Short, human-readable, hyphen-separated. Avoid query-parameter heavy URLs for primary content.
  - Example: `/course/semantic-html`

- Content quality
  - Satisfy user intent. Original, in-depth, and helpful content tends to rank better.
  - Use natural language and long-form when appropriate; include examples and links to primary resources.
  - Avoid duplicate content; canonicalize if duplicates exist.

- Images
  - Use descriptive filenames and `alt` attributes (both accessibility & SEO).
  - Provide `width`/`height` and use responsive images (`srcset`/`sizes`) and WebP where possible.
  - Lazy-load offscreen images with `loading="lazy"`.

- Internal linking
  - Use descriptive anchor text. Link related pages to help distribute authority and aid discovery.

- Structured markup for useful snippets
  - `article`, `product`, `breadcrumbList`, `FAQ`, `howTo`, etc. (via JSON‑LD).
  - Example Article JSON‑LD:
    ```html
    <script type="application/ld+json">
    {
      "@context":"https://schema.org",
      "@type":"Article",
      "headline":"SEO Basics — One‑Page Guide",
      "author":{"@type":"Person","name":"Instructor"},
      "datePublished":"2025-12-30"
    }
    </script>
    ```

---

## 3. Technical SEO (site health & crawlability)
- Mobile-first & responsive design
  - Ensure viewport meta and mobile usability. Test with Mobile-Friendly Test and Lighthouse.

- Performance & Core Web Vitals
  - LCP (Largest Contentful Paint) ≲ 2.5s
  - INP / FID (interactivity) ≲ 200ms (aim low)
  - CLS (visual stability) ≲ 0.1
  - Optimize images, defer non-critical JS, use efficient caching and CDNs, and preload key resources.

- Indexability & crawl controls
  - `robots.txt` for broad crawl rules (don’t block CSS/JS needed for rendering).
  - `meta name="robots"` for per-page control (`noindex`, `nofollow`).
  - `link rel="canonical"` to avoid duplicate content issues.

- Sitemaps & discovery
  - Provide `sitemap.xml`, submit to Google Search Console and Bing Webmaster Tools.

- HTTPS & security
  - Sitewide HTTPS (HSTS where appropriate).

- Server rendering / JavaScript sites
  - Use SSR or prerendering for critical content where search engines need stable HTML.
  - If using client-side rendering, ensure crawlers can access meaningful HTML (or use dynamic rendering if necessary).

- Pagination, faceted navigation & parameters
  - Avoid infinite crawl by search bots via proper `robots.txt`, canonicalization, or `rel="nofollow"` on irrelevant filters.
  - Use canonical tags for paginated pages or implement `rel="prev/next"` patterns thoughtfully.

---

## 4. Content Strategy & Keyword Research
- Understand intent:
  - Informational, navigational, transactional — craft content to match.
- Keyword research basics:
  - Use tools (Google Keyword Planner, Ahrefs, SEMrush, Ubersuggest) to find search volume and difficulty.
  - Target long‑tail phrases for specific user intent.
- Content mapping:
  - Map keywords to pages; avoid competing pages for the same keyword (keyword cannibalization).
- Content freshness:
  - Update and improve pages over time; search engines value maintained content for some queries.

---

## 5. Links & Authority
- Internal links: distribute authority to important pages; use contextual linking.
- Backlinks: quality over quantity. Seek relevant, authoritative sites.
- Avoid manipulative link schemes; follow webmaster guidelines.

---

## 6. Local SEO (if relevant)
- Google Business Profile (GBP): claim & optimize listing.
- NAP consistency (Name, Address, Phone).
- Local schema: `LocalBusiness`, embed structured data with accurate address/contact details.
- Reviews and local citations help local ranking signals.

---

## 7. Analytics, Tracking & Monitoring
- Google Search Console: index coverage, queries, performance, URL inspection.
- Google Analytics (or alternatives): sessions, bounce/dwell times, conversion funnels.
- Regular checks:
  - Index coverage (errors), manual actions, security issues.
  - Performance reports & Core Web Vitals.
- Set up alerts for spikes/drops in traffic.

---

## 8. Accessibility & SEO overlap
- Alt attributes, semantic headings, ARIA when needed — both help users and search engines.
- Accessible pages increase dwell time and reduce bounce, indirectly benefiting SEO.
- Avoid relying solely on JavaScript-injected content — ensure content is accessible to crawlers and assistive tech.

---

## 9. Common Mistakes to Avoid
- Missing or duplicate titles/meta descriptions.
- Thin, auto-generated content with low value.
- Ignoring mobile/usability and performance.
- Blocking CSS/JS in robots.txt (this can prevent proper rendering).
- Over-optimizing (keyword stuffing) or deceptive practices (cloaking).
- Nocanonicalization for paginated content or tag pages.

---

## 10. Quick Audit Checklist (workflow)
1. Crawl the page (Screaming Frog or site:crawl).
2. Check `<title>` and `<meta description>` uniqueness and length.
3. Verify H1 and heading hierarchy.
4. Check robots.txt and meta robots for `noindex` issues.
5. Confirm canonical tag matches preferred URL.
6. Run Lighthouse / PageSpeed Insights: fix LCP, CLS, INP issues.
7. Test mobile friendliness.
8. Validate structured data (Rich Results Test).
9. Inspect server logs or Search Console for crawl errors.
10. Review backlinks & internal linking.

---

## 11. Practical Examples (snippets)
- Basic head meta:
  ```html
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Intro to Semantic HTML — MyCourse</title>
  <meta name="description" content="Practical notes on semantic HTML and accessibility for web developers.">
  <link rel="canonical" href="https://example.com/semantic-html">
  ```

- Open Graph & Twitter:
  ```html
  <meta property="og:title" content="Intro to Semantic HTML">
  <meta property="og:description" content="Practical notes on semantic HTML and accessibility.">
  <meta property="og:image" content="https://example.com/og.png">
  <meta name="twitter:card" content="summary_large_image">
  ```

- Breadcrumb JSON‑LD:
  ```html
  <script type="application/ld+json">
  {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://example.com/"},
      {"@type":"ListItem","position":2,"name":"Course","item":"https://example.com/course"},
      {"@type":"ListItem","position":3,"name":"Semantic HTML","item":"https://example.com/course/semantic-html"}
    ]
  }
  </script>
  ```

---

## 12. Resources & Tools (learn & test)
- Google Search Central (official docs)
- Google Search Console & Analytics
- PageSpeed Insights / Lighthouse / Web Vitals
- Rich Results Test & Schema.org
- Mobile-Friendly Test
- Screaming Frog / Ahrefs / SEMrush / Moz

---

## Final tips for students
- Build for users first; search engines follow.
- Measure: use tools, collect data, iterate.
- Avoid “quick hacks” that violate guidelines — they can cause penalties.
- SEO is multidisciplinary: content, UX, performance, accessibility, and analytics all matter.

---

## Printable Quick Checklist
- [ ] Title, meta description, canonical
- [ ] One H1, clear heading structure
- [ ] Accessible images (alt) and responsive images
- [ ] Mobile-friendly & performant
- [ ] Robots, sitemap, structured data
- [ ] Internal links and crawlable content
- [ ] Analytics & Search Console monitoring

---