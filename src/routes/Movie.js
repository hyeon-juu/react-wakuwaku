import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import styles from "../css/Outlet.module.css";

function Movie({ name, overview, poster_path, id }) {
  const { movies } = useOutletContext();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <div className={styles.tvsContainer} key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          </Link>
          <div>
            <Link to={`/movie/${movie.id}`} className={styles.posterName}>
              {movie.title.length >= 10
                ? movie.title.slice(0, 10) + "..."
                : movie.title}
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
  );
}

// Tv.propTypes = {
//   name: PropTypes.string.isRequired,
//   overview: PropTypes.string.isRequired,
//   poster_path: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };

export default Movie;
