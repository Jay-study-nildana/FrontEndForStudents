import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./MainLayout";

// Lazy page imports (code-splitting)
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

// imports related to javascript learning page
const JavaScriptLearning = lazy(
  () => import("./jslearning/JavaScriptLearning")
);
const JSLearningOne = lazy(() => import("./jslearning/JSLearningOne"));
const ArrowFunctions = lazy(() => import("./jslearning/ArrowFunctions"));
const Destructuring = lazy(() => import("./jslearning/Destructuring"));
const SpreadOperator = lazy(() => import("./jslearning/SpreadOperator"));
const RestOperator = lazy(() => import("./jslearning/RestOperator"));
const JSClasses = lazy(() => import("./jslearning/JSClasses"));
const Prototypes = lazy(() => import("./jslearning/Prototypes"));
const Inheritance = lazy(() => import("./jslearning/Inheritance"));
const Closures = lazy(() => import("./jslearning/Closures"));
const ExecutionContext = lazy(() => import("./jslearning/ExecutionContext"));
const BindCallApply = lazy(() => import("./jslearning/BindCallApply"));
const Arrays = lazy(() => import("./jslearning/Arrays"));
const Maps = lazy(() => import("./jslearning/Maps"));
const Sets = lazy(() => import("./jslearning/Sets"));
const MapFilterReduce = lazy(() => import("./jslearning/MapFilterReduce"));
const Immutability = lazy(() => import("./jslearning/Immutability"));


export type AppRoute = {
  path: string; // absolute path for the central config (e.g. "/", "/about", "/js-learning/one", "*")
  name?: string; // optional, useful for nav/menu
  element?: React.ReactNode;
  children?: AppRoute[]; // reserved for future nested central config if needed
};

/**
 * Central route config (single source of truth).
 * Use absolute paths here — we'll derive the router children from this array,
 * so you don't have to duplicate routes in the router configuration.
 */
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
    path: "/js-learning",
    name: "JavaScript Learning",
    element: <JavaScriptLearning />,
  },
  {
    path: "/js-learning/one",
    name: "JavaScript Learning One",
    element: <JSLearningOne />,
  },
  {
    path: "/js-learning/arrow-functions",
    name: "Arrow Functions",
    element: <ArrowFunctions />,
  },
  {
    path: "/js-learning/destructuring",
    name: "Destructuring",
    element: <Destructuring />,
  },
  {
    path: "/js-learning/spread-operator",
    name: "Spread Operator",
    element: <SpreadOperator />,
  },
  {
    path: "/js-learning/rest-operator",
    name: "Rest Operator",
    element: <RestOperator />,
  },
  {
    path: "/js-learning/classes",
    name: "JavaScript Classes",
    element: <JSClasses />,
  },
  {
    path: "/js-learning/prototypes",
    name: "Prototypes",
    element: <Prototypes />,
  },
  {
    path: "/js-learning/inheritance",
    name: "Inheritance",
    element: <Inheritance />,
  },
  {
    path: "/js-learning/closures",
    name: "Closures",
    element: <Closures />,
  },
  {
    path: "/js-learning/execution-context",
    name: "Execution Context",
    element: <ExecutionContext />,
  },
  {
    path: "/js-learning/bind-call-apply",
    name: "Bind / Call / Apply",
    element: <BindCallApply />,
  },
  {
    path: "/js-learning/arrays",
    name: "Arrays",
    element: <Arrays />,
  },
  {
    path: "/js-learning/maps",
    name: "Maps",
    element: <Maps />,
  },
  {
    path: "/js-learning/sets",
    name: "Sets",
    element: <Sets />,
  },
  {
    path: "/js-learning/map-filter-reduce",
    name: "Map • Filter • Reduce",
    element: <MapFilterReduce />,
  },
  {
    path: "/js-learning/immutability",
    name: "Immutability",
    element: <Immutability />,
  },
];

/**
 * Helper: build children array for useRoutes from the central routesConfig.
 * - Converts "/" to an index route
 * - Converts absolute paths like "/about" -> "about" (relative child path)
 * - Keeps wildcard "*" as-is
 */
function buildChildrenFromConfig(routes: AppRoute[]) {
  const children: Array<Record<string, any>> = [];

  for (const r of routes) {
    if (r.path === "/") {
      // index route
      children.push({ index: true, element: r.element });
      continue;
    }

    if (r.path === "*") {
      children.push({ path: "*", element: r.element });
      continue;
    }

    // Convert absolute path -> relative child path:
    // "/about" -> "about", "/js-learning/one" -> "js-learning/one"
    const relative = r.path.replace(/^\//, "");
    children.push({ path: relative, element: r.element });
  }

  return children;
}

/**
 * Optional helper exported for building navs/menus from the same config.
 * Keeps only routes that have a name defined.
 */
export const navRoutes = routesConfig.filter((r) => Boolean(r.name));

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