import { Routes, Route, Outlet, Link } from "react-router-dom";
let simpleMessage = `Welcome to the Layout`

const Layout = () => (
    <div className="text-center my-5">
        <nav>
            <p>
            <Link to="/">Home</Link> | 
            <Link to="/dashboard">Dashboard</Link> |
            <Link to="/nothing-here">Nothing Here</Link> |
            <Link to="/about">About</Link>
            </p>
        </nav> 
        <hr></hr>
        <Outlet />       
        <hr></hr>
  </div>
);

export default Layout;