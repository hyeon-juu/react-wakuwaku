import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import styles from "../css/Outlet.module.css";

function Tv({ name, overview, poster_path, id }) {
  const { tvs } = useOutletContext();
  return (
    <div className={styles.container}>
      {tvs.map((tv) => (
        <div className={styles.tvsContainer}>
          <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} />
          <div>
            <Link to={`/tv/${tv.id}`}>
              {tv.name.length >= 10 ? tv.name.slice(0, 10) + "..." : tv.name}
            </Link>
            <div className={styles.posterBottomContainer}>
              <div className={styles.posterYear}>
                {tv.first_air_date.slice(0, 4)}
              </div>
              <div className={styles.posterIcon}>
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-star"></i>
                <div>{tv.vote_average}</div>
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

export default Tv;
