import { Outlet, Link } from "react-router-dom";
import GitHubFooter from "./GitHubFooter";

const Layout = () => (
  <div className="text-center my-5">
    <nav>
      <p className="lead">
        <Link to="/">Home</Link> |
        <Link to="/listsimple">List Simple</Link> |
        <Link to="/listsimple2">List Simple 2</Link> |
        <Link to="/listbatman1">List Batman 1</Link> |
        <Link to="/listbatman2">List Batman 2</Link> |
        <Link to="/listmovies">List Movies</Link> |
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
