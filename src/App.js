import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Movie from "./routes/Movie";
import Tv from "./routes/Tv";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Tv />} />
        <Route path="tv" element={<Tv />} />
        <Route path="movie" element={<Movie />} />
        <Route path=":type/:id" element={<Detail />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
