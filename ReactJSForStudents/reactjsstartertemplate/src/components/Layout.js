import { Outlet, Link } from "react-router-dom";
import GitHubFooter from "./GitHubFooter";

const Layout = () => (
  <div className="text-center my-5">
    <nav>
      <p className="lead">
        <Link to="/">Home</Link> |
        <Link to="/nothing-here">Nothing Here</Link> |
      </p>
    </nav>
    <hr></hr>
    <Outlet />
    <hr></hr>
    <GitHubFooter />
  </div>
);

export default Layout;
