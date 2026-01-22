import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./MainLayout";

// Lazy page imports (code-splitting)
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

//PWA demo

const PWADemo = lazy(() => import("./components/PWADemo"));

export type AppRoute = {
  path: string;
  name?: string;
  element?: React.ReactNode;
  children?: AppRoute[];
};

// Central route config
export const routesConfig: AppRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
  },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
  },
  {
    path: "/pwa-demo",
    name: "PWA Demo",
    element: <PWADemo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

/**
 * Build react-router children from the central config.
 * - "/" -> index
 * - "*" -> wildcard
 * - Strip leading "/" for top-level absolute paths so they become child paths
 */
function buildChildrenFromConfig(routes: AppRoute[]) {
  const children: Array<Record<string, any>> = [];

  for (const r of routes) {
    if (r.path === "/") {
      children.push({ index: true, element: r.element });
      continue;
    }

    if (r.path === "*") {
      children.push({ path: "*", element: r.element });
      continue;
    }

    const relative = r.path.startsWith("/") ? r.path.replace(/^\//, "") : r.path;
    children.push({ path: relative, element: r.element });
  }

  return children;
}

// Router component using MainLayout as wrapper
export default function AppRoutes(): React.ReactElement {
  const children = buildChildrenFromConfig(routesConfig);

  const elements = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children,
    },
  ]);

  return (
    // Keep the Suspense close-to-root so lazy pages show fallback
    <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
      {elements}
    </Suspense>
  );
}