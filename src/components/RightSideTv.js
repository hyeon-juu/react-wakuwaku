import styles from "../css/RightSide.module.css";

function RightSideTv({ poptvs }) {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search" />
      </div>

      <div className={styles.popularContainer}>
        <h1 className={styles.title}>Popular Series</h1>

        {poptvs.slice(0, 3).map((poptv) => (
          <div key={poptv.id} className={styles.detail}>
            <img
              className={styles.sideImg}
              src={`https://image.tmdb.org/t/p/w500${poptv.poster_path}`}
            />
            <div className={styles.info}>
              <div>{poptv.name}</div>
              <div className={styles.vote}>
                <i class="fa-solid fa-star"></i>
                <div>{poptv.vote_average}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button>See More</button>

      <div className={styles.favoriteContainer}>
        <h1 className={styles.title}>Favorite</h1>

        {poptvs
          .filter((poptv) => poptv.name.includes("아카데미아"))
          .map((poptv) => (
            <div key={poptv.id} className={styles.detail}>
              <img
                className={styles.sideImg}
                src={`https://image.tmdb.org/t/p/w500${poptv.poster_path}`}
              />
              <div className={styles.info}>
                <div>{poptv.name}</div>
                <div className={styles.vote}>
                  <i class="fa-solid fa-star"></i>
                  <div>{poptv.vote_average}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button>See More</button>
    </div>
  );
}

export default RightSideTv;
