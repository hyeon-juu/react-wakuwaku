import styles from "../css/Banner.module.css";
import { useState } from "react";

function Banner({ movies, tvs }) {
  const combined = [...movies, ...tvs];
  // const sortedByPopularity = combined
  //   .filter((item) => item.popularity !== undefined)
  //   .sort((a, b) => b.popularity - a.popularity);
  const bannerPosterNames = [
    "장송의 프리렌",
    "약사의 혼잣말",
    "일곱 개의 대죄",
    "단다단",
    "사카모토 데이즈",
    "드래곤볼 다이마",
  ];
  const bannerData = combined
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
export default Banner;
