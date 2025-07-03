import styles from "../css/Banner.module.css";
import { useState } from "react";

function MovieBanner({ movies }) {
  const bannerPosterNames = [
    "센과 치히로의 행방불명",
    "너의 이름은",
    "이웃집 토토로",
    "그대들은 어떻게 살 것인가",
  ];
  const bannerData = movies
    .filter((data) => bannerPosterNames.includes(data.title || data.name))
    .map((data) => ({
      id: data.id,
      title: data.title || data.name,
      img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    }));
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((i) => (i + 1) % bannerData.length);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + bannerData.length) % bannerData.length);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContainer}>
        <img
          className={styles.bannerImg}
          src={bannerData[index].img}
          alt="banner img"
        />
        <div className={styles.bannerTitle}>{bannerData[index].title}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.watchButton}>Watch</button>
          <button className={styles.plusButton}>+</button>
        </div>
        {/* banenr button */}

        <button
          className={`${styles.bannerButton} ${styles.leftButton}`}
          onClick={prev}
        >
          ◀
        </button>
        <button
          className={`${styles.bannerButton} ${styles.rightButton}`}
          onClick={next}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
export default MovieBanner;
