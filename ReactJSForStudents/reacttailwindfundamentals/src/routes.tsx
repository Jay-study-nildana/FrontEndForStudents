import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./MainLayout";

// Lazy page imports (code-splitting)
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

//Tailwind related componets

const TailwindHQ = lazy(() => import("./tailwindstuff/TailwindHQ"));
const Fundamentals = lazy(() => import("./tailwindstuff/Fundamentals"));
const DarkLightMode = lazy(() => import("./tailwindstuff/DarkLightMode"));
const LayoutBasics = lazy(() => import("./tailwindstuff/LayoutBasics"));
const FlexboxGrid = lazy(() => import("./tailwindstuff/FlexboxGrid"));
const ResponsiveDesign = lazy(() => import("./tailwindstuff/ResponsiveDesign"));
const TypographyShowcase = lazy(() => import("./tailwindstuff/TypographyShowcase"));
const ButtonsVariants = lazy(() => import("./tailwindstuff/ButtonsVariants"));
const FormsInputs = lazy(() => import("./tailwindstuff/FormsInputs"));
const CardsLists = lazy(() => import("./tailwindstuff/CardsLists"));
const ModalsPopoversDropdowns = lazy(() => import("./tailwindstuff/ModalsPopoversDropdowns"));
const AnimationsMotion = lazy(() => import("./tailwindstuff/AnimationsMotion"));
const StateDrivenClasses = lazy(() => import("./tailwindstuff/StateDrivenClasses"));

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
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/tailwindhq",
    name: "TailwindHQ",
    element: <TailwindHQ />,
  },
  {
    path: "/tw/fundamentals",
    name: "Tailwind Fundamentals",
    element: <Fundamentals />,
  },
  {
    path: "/tw/dark-light-mode",
    name: "Dark / Light Mode",
    element: <DarkLightMode />,
  },
  {
    path: "/tw/layout-basics",
    name: "Layout Basics",
    element: <LayoutBasics />,
  },
  {
    path: "/tw/flexbox-grid",
    name: "Flexbox & Grid",
    element: <FlexboxGrid />,
  },
  {
    path: "/tw/responsive-design",
    name: "Responsive Design",
    element: <ResponsiveDesign />,
  },
  {
    path: "/tw/typography-showcase",
    name: "Typography Showcase",
    element: <TypographyShowcase />,
  },
  {
    path: "/tw/buttons-variants",
    name: "Buttons Variants",
    element: <ButtonsVariants />,
  },
  {
    path: "/tw/forms-inputs",
    name: "Forms & Inputs",
    element: <FormsInputs />,
  },
  {
    path: "/tw/cards-lists",
    name: "Cards & Lists",
    element: <CardsLists />,
  },
  {
    path: "/tw/modals-popovers-dropdowns",
    name: "Modals, Popovers & Dropdowns",
    element: <ModalsPopoversDropdowns />,
  },
  {
    path: "/tw/animations-motion",
    name: "Animations & Motion",
    element: <AnimationsMotion />,
  },
  {
    path: "/tw/state-driven-classes",
    name: "State Driven Classes",
    element: <StateDrivenClasses />,
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