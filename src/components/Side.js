import PropTypes from "prop-types";
import styles from "../css/Side.module.css";

function Side({ genres, onChoose }) {
  return (
    <div>
      <div>THEATER</div>
      <ul className={styles.lists}>
        <li onClick={() => onChoose(null)}>All</li>
        {genres.map((genre) => (
          <li key={genre.id} onClick={() => onChoose(genre.id)}>
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

Side.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default Side;
