import { useEffect, useState } from "react";
import LeftSide from "../components/LeftSide";
import styles from "../css/Home.module.css";
import Nav from "../components/Nav";
// import Banner from "../components/TvBanner";
import RightSideTv from "../components/RightSideTv";
import { Outlet } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [poptvs, setPoptvs] = useState([]);

  useEffect(() => {
    const fetchAllAPI = async () => {
      const [moviesApi, tvsApi, poptvsApi] = await Promise.all([
        fetch(`
          https://api.themoviedb.org/3/discover/movie?api_key=674d56103f13b338106d9e64d9646415&with_genres=16&with_original_language=ja&language=ko-KR&sort_by=popularity.desc&page=1
          `).then((res) => res.json()),
        fetch(`
            https://api.themoviedb.org/3/discover/tv?api_key=674d56103f13b338106d9e64d9646415&with_genres=16&with_original_language=ja&language=ko-KR&sort_by=first_air_date.desc&vote_count.gte=100
            `).then((res) => res.json()),
        fetch(`
              https://api.themoviedb.org/3/discover/tv?api_key=674d56103f13b338106d9e64d9646415&with_genres=16&with_original_language=ja&language=ko-KR&sort_by=vote_average.desc&vote_count.gte=100
              `).then((res) => res.json()),
      ]);
      setMovies(moviesApi.results);
      setTvs(tvsApi.results);
      setPoptvs(poptvsApi.results);
      setLoading(false);
    };
    fetchAllAPI();
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <LeftSide />
          <div className={styles.center}>
            <Nav />
            {/* <Banner movies={movies} tvs={tvs} /> */}
            <Outlet context={{ movies, tvs, poptvs }} />
          </div>
          <RightSideTv poptvs={poptvs} />
        </div>
      )}
    </div>
  );
}

export default Home;
