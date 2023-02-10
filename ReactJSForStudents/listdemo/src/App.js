import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ListSimple from "./components/ListSimple";
import ListSimple2 from "./components/ListSimple2";
import ListBatman1 from "./components/ListBatman1";
import ListBatman2 from "./components/ListBatman2";
import ListMovies from "./components/ListMovies";
import NoMatch from "./components/NoMatch";
import MovieDetailsPage from "./components/MovieDetailsPage";

function App() {
  return (
    <div className="App">
      <hr></hr>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/listsimple" element={<ListSimple />} />
          <Route path="/listsimple2" element={<ListSimple2 />} />
          <Route path="/listbatman1" element={<ListBatman1 />} />
          <Route path="/listbatman2" element={<ListBatman2 />} />
          <Route path="/listmovies" element={<ListMovies />} />
          <Route path="/listmovies/:movieid" element={<MovieDetailsPage/>} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {/* <FooterContact /> */}
      {/* <Ameesha /> */}
    </div>
  );
}

export default App;
