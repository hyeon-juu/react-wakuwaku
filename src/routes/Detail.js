import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";

function Detail({ tvs, movies }) {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  const getDetail = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=674d56103f13b338106d9e64d9646415&with_genres=16&language=ko-KR`
      )
    ).json();
    setData(json);
  };
  useEffect(() => {
    getDetail();
  }, [type, id]);

  return (
    <div>
      {data ? (
        <div className={styles.detailContainer}>
          <div className={styles.backdropContainer}>
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            />
            <div className={styles.backdropFade} />
          </div>
          <div className={styles.contentContainer}>
            <img
              className={styles.contentPoster}
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            />
            <div>
              <h1>{data?.title || data?.name}</h1>
              <div>{data.first_air_date}</div>
              <div>{data.vote_average}</div>
              <p>{data.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Detail;
