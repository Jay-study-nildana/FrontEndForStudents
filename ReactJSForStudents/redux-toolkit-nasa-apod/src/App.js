import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";
import ReduxTextBox from "./components/ReduxTextBox";
import ReduxNASAAPOD from "./components/ReduxNASAAPOD";

function App() {
  return (
    <div className="App">
      <hr></hr>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
          <Route path="redux-textbox" element={<ReduxTextBox />} />
          <Route path="redux-nasaapod" element={<ReduxNASAAPOD />} />
        </Route>
      </Routes>
      {/* <FooterContact /> */}
      {/* <Ameesha /> */}
    </div>
  );
}

export default App;
