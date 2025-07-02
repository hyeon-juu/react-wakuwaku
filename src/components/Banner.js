import styles from "../css/Banner.module.css";
import { useState } from "react";

function Banner({ movies, tvs }) {
  const combined = [...movies, ...tvs];
  const sortedByPopularity = combined
    .filter((item) => item.popularity !== undefined)
    .sort((a, b) => b.popularity - a.popularity);
  const bannerData = sortedByPopularity.slice(0, 6).map((data) => ({
    id: data.id,
    title: data.title || data.name,
    img: `https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
  }));
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((i) => (i + 1) % bannerData.length);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + bannerData.length) % bannerData.length);
  };
  return (
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
  );
}
export default Banner;
