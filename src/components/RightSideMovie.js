import styles from "../css/RightSide";

function RightSideMovie({ id, name, poster_path, vote_average }) {
  return (
    <div>
      <div className={styles.popularContainer}>
        <h1>Popular Movies</h1>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
        <div>{name}</div>
        <div>{vote_average}</div>
      </div>
      <div className={styles.favoriteContianer}></div>
    </div>
  );
}

export default RightSideMovie;
