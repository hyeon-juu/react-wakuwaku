import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Movie from "./routes/Movie";
import Tv from "./routes/Tv";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Tv />} />
          <Route path="tv" element={<Tv />} />
          <Route path="/tv/:id" element={<Detail />}></Route>
          <Route path="movie" element={<Movie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
