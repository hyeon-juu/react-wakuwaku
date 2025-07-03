import PropTypes, { symbol } from "prop-types";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import styles from "../css/Outlet.module.css";
import MovieBanner from "../components/MovieBanner";

function Movie({ name, overview, poster_path, id }) {
  const { movies } = useOutletContext();
  //일본어 제목
  const isJapanese = (text) =>
    /[\u3040-\u30FF\u31F0-\u31FF\uFF66-\uFF9D]/.test(text);

  return (
    <div className={styles.bigMovieContainer}>
      <MovieBanner movies={movies} />
      <div className={styles.container}>
        {movies.map((movie) => (
          <div className={styles.tvsContainer} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className={styles.posterImg}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Link>
            <div>
              <Link to={`/movie/${movie.id}`} className={styles.posterName}>
                {isJapanese(movie.title)
                  ? movie.title.slice(0, 8) +
                    (movie.title.length > 8 ? "..." : "")
                  : movie.title.slice(0, 10) +
                    (movie.title.length > 10 ? "..." : "")}
              </Link>

              <div className={styles.posterBottomContainer}>
                <div className={styles.posterYear}>
                  {movie.release_date.slice(0, 4)}
                </div>
                <div className={styles.posterIcon}>
                  <i class="fa-solid fa-star"></i>
                  <div>{movie.vote_average}</div>
                  <i class="fa-solid fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tv.propTypes = {
//   name: PropTypes.string.isRequired,
//   overview: PropTypes.string.isRequired,
//   poster_path: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };

export default Movie;
