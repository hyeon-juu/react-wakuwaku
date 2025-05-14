import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Side from "../components/Side";
import styles from "../css/Home.module.css";
import Nav from "../components/Nav";
import Banner from "../components/Banner";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const [genres, setGenres] = useState([]);
  const getGenre = async () => {
    const json = await (
      await fetch(`
              https://api.themoviedb.org/3/genre/movie/list?api_key=674d56103f13b338106d9e64d9646415
              `)
    ).json();
    setGenres(json.genres);
  };

  const getMovies = async () => {
    const json = await (
      await fetch(`
        https://api.themoviedb.org/3/discover/movie?api_key=674d56103f13b338106d9e64d9646415&sort_by=popularity.desc
        `)
    ).json();
    setMovies(json.results);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getGenre();
  }, []);

  const genreSelect = (genreId) => {
    setSelectedGenreId(genreId);
  };
  const movieFilter = selectedGenreId
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenreId))
    : movies;

  const availableGenres = genres.filter((genre) =>
    movies.some((movie) => movie.genre_ids.includes(genre.id))
  );

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <Side genres={availableGenres} onChoose={genreSelect} />
          <div className={styles.main}>
            <Nav />
            <Banner movies={movies} />
            {movieFilter.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
