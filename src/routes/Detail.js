import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";

function Detail({ tvs, movies }) {
  const { type, id } = useParams();
  const [data, setData] = useState(null);

  const getDetail = async () => {
    const krRes = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=674d56103f13b338106d9e64d9646415&language=ko-KR&append_to_response=credits,similar`
    );
    const krData = await krRes.json();

    //트레일러 가져오기 위함!
    const enRes = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=674d56103f13b338106d9e64d9646415&language=en-US&append_to_response=videos`
    );
    const enData = await enRes.json();

    krData.videos = enData.videos;

    setData(krData);
  };

  useEffect(() => {
    getDetail();
  }, [type, id]);

  const formatRuntime = (minutes) => {
    if (!minutes || isNaN(minutes)) return "정보 없음";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}시간 ` : ""}${mins}분`;
  };

  const [showTrailer, setShowTrailer] = useState(false);

  const trailer =
    data?.videos?.results?.find(
      (video) =>
        video.site === "YouTube" &&
        ["Trailer", "Teaser", "Clip"].includes(video.type)
    ) || null;

  return (
    <div>
      {data ? (
        <div className={styles.detailPage}>
          <div className={styles.detailContainer}>
            <div className={styles.backdropContainer}>
              <img
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              />
              <div className={styles.backdropFade} />
            </div>

            <div className={styles.detailContent}>
              <div>
                <img
                  className={styles.contentPoster}
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                />
              </div>
              <div className={styles.middleContent}>
                <h1>{data?.title || data?.name}</h1>
                <div className={styles.yearContainer}>
                  <div>{data.first_air_date}</div>
                  <div>·</div>
                  <i class="fa-solid fa-star"></i>
                  <div>{data.vote_average}</div>
                </div>

                <div className={styles.buttonContainer}>
                  <button onClick={() => setShowTrailer(true)}>
                    Watch trailer
                    <i class="fa-solid fa-play"></i>
                  </button>
                  <button>
                    <i class="fa-regular fa-bookmark"></i>
                  </button>
                  <button>
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                  </button>
                </div>
                {/* ============================ trailer */}
                {showTrailer &&
                  (trailer ? (
                    <div className={styles.trailerContainer}>
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={trailer.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div>예고편이 없습니다</div>
                  ))}
                {showTrailer && (
                  <button onClick={() => setShowTrailer(false)}>닫기</button>
                )}

                <p>{data.overview}..</p>
                <div className={styles.runtime}>
                  {type === "movie"
                    ? `러닝타임: ${formatRuntime(data.runtime)}`
                    : `회당 러닝타임: ${formatRuntime(
                        data.episode_run_time?.[0]
                      )} · 총 ${data.number_of_episodes}화`}
                </div>
                <div>{data.genres.map((genre) => genre.name).join(", ")}</div>
              </div>

              <div className={styles.castContainer}>
                <div className={styles.castContainer}>
                  <h2>성우</h2>
                  <div className={styles.castList}>
                    {data.credits?.cast?.slice(0, 3).map((person) => (
                      <div
                        key={person.cast_id || person.id}
                        className={styles.castItem}
                      >
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : "https://via.placeholder.com/185x278?text=No+Image"
                          }
                          alt={person.name}
                        />
                        <div>{person.name}</div>
                        <div className={styles.character}>
                          ({person.character})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*=============================== similar contents */}
          <div>
            <div className={styles.similarContainer}>
              <h2>비슷한 콘텐츠</h2>
              <div className={styles.similarList}>
                {data.similar?.results?.slice(0, 4).map((item) => (
                  <div key={item.id} className={styles.similarItem}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                      alt={item.title || item.name}
                    />
                    <div>{item.title || item.name}</div>
                  </div>
                ))}
              </div>
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
