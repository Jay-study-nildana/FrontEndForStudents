import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./MainLayout";

// Lazy page imports (code-splitting)
// const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

//F1 Stuff

import F1ViewWithFileData from "./F1FileData/F1ViewWithFileData";
import F1ViewWithService from "./F1ServiceData/F1ViewWithService";
import LandingPageMain from "./LandingPage/LandingPageMain";

//auth stuff

import Login from "./AuthComponents/Login";
import UserProfile from "./AuthComponents/UserProfile";
import Register from "./AuthComponents/Register";
import RoleCheck from "./AuthComponents/RoleCheck";

//file things

import FilesHQ from "./FileComponents/FilesHQ";

//admin panel
import AdminPanel from "./AdminComponents/AdminPanel";
import UserDetails from "./AdminComponents/UserDetails";

//POST CRUD thing - ContOne

import PostDetails from "./POSTCrudComponents/PostDetails";
import POSTCRUDHQ from "./POSTCrudComponents/POSTCRUDHQ";
import PostsPublicView from "./POSTCrudComponents/PostsPublicView";

//POST CRUD thing - ContOne

import POSTCRUDContTwoHQ from "./POSTContTwoComponents/POSTCRUDContTwoHQ";
import PostDetailsContTwo from "./POSTContTwoComponents/PostDetails";
import PostsContoneTwoPublic from "./POSTContTwoComponents/PostsContoneTwoPublic";

// new homepage

import HomePageNestJSFive from "./components/HomePageNestJSFive";


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
    element: <HomePageNestJSFive />,
  },
    {
    path: "/f1-homepage",
    name: "Home - F1",
    element: <LandingPageMain />,
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
    path: "/f1",
    name: "F1 View",
    element: <F1ViewWithFileData />,
  },
  {
    path: "/f1-service",
    name: "F1 View with Service",
    element: <F1ViewWithService />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/profile",
    name: "User Profile",
    element: <UserProfile />,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
  },
  {
    path: "/role-check",
    name: "Role Check",
    element: <RoleCheck />,
  },
  {
    path: "/files-hq",
    name: "Files HQ",
    element: <FilesHQ />,
  },
  {
    path: "/admin",
    name: "Admin Panel",
    element: <AdminPanel />,
  },
  {
    path: "/admin/users/:id",
    name: "User Details",
    element: <UserDetails />,
  },
  {
    path: "/posts",
    name: "POST CRUD HQ",
    element: <POSTCRUDHQ />,
  },
  {
    path: "/posts/:id",
    name: "Post Details",
    element: <PostDetails />,
  },
  {
    path: "/posts/public",
    name: "Posts Public View",
    element: <PostsPublicView />,
  },
  {
    path: "/posts-cont-two",
    name: "POST CRUD Cont Two HQ",
    element: <POSTCRUDContTwoHQ />,
  },
  {
    path: "/posts-cont-two/:id",
    name: "Post Details Cont Two",
    element: <PostDetailsContTwo />,
  },
    {
    path: "/posts-cont-two-public",
    name: "Posts Contone Two Public",
    element: <PostsContoneTwoPublic />,
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

    const relative = r.path.startsWith("/")
      ? r.path.replace(/^\//, "")
      : r.path;
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
