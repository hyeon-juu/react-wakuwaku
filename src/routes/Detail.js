import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useRef } from "react";

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

  // similar contents
  const listRef = useRef();

  const scrollLeft = () => {
    listRef.current.scrollBy({ left: -216, behavior: "smooth" });
  };

  const scrollRight = () => {
    listRef.current.scrollBy({ left: 216, behavior: "smooth" });
  };

  //font size
  const titleLength = data?.title?.length || 0;
  const nameLength = data?.name?.length || 0;
  const isLong = Math.max(titleLength, nameLength) > 14;

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
                <h1 className={isLong ? styles.smallText : styles.normalText}>
                  {data?.title || data?.name}
                </h1>
                <div className={styles.yearContainer}>
                  <div>
                    {type === "tv" ? data.first_air_date : data.release_date}
                  </div>
                  <div>·</div>
                  <i className="fa-solid fa-star"></i>
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
                      <button
                        onClick={() => setShowTrailer(false)}
                        className={styles.trailerButton}
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <div className={styles.trailerContainer}>
                      <div className={styles.noTrailer}>예고편이 없습니다</div>
                      <button
                        onClick={() => setShowTrailer(false)}
                        className={styles.trailerButton}
                      >
                        x
                      </button>
                    </div>
                  ))}
                {/* {showTrailer && (
                  
                )} */}

                <div className={styles.runtime}>
                  {type === "movie" ? (
                    <div className={styles.row}>
                      <span className={styles.timeAndGenres}>상영 시간</span>
                      <span>{formatRuntime(data.runtime)}</span>
                    </div>
                  ) : (
                    <div className={styles.row}>
                      <span className={styles.timeAndGenres}>
                        에피소드별 재생 시간
                      </span>
                      <span>
                        {formatRuntime(data.episode_run_time?.[0])} · 총
                        {data.number_of_episodes}화
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.row}>
                  <span className={styles.timeAndGenres}>장르</span>
                  <span>
                    {data.genres
                      .slice(0, 2)
                      .map((genre) => genre.name)
                      .join(", ")}
                  </span>
                </div>

                <p>{data.overview.slice(0, 100)}..</p>
              </div>

              {data.credits?.cast?.length > 0 && (
                <div className={styles.castContainer}>
                  <h1>성우</h1>
                  <div className={styles.castList}>
                    {data.credits?.cast?.slice(0, 4).map((person) => (
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
                        <div className={styles.castName}>
                          <div>{person.name}</div>
                          <div>{person.character}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/*=============================== similar contents */}

            <div className={styles.similarContainer}>
              <h2>비슷한 콘텐츠</h2>
              <div className={styles.similarSlide}>
                <button onClick={scrollLeft} className={styles.navBtn}>
                  ◀
                </button>

                <div className={styles.similarList} ref={listRef}>
                  {data.similar?.results?.map((item) => {
                    if (!item.backdrop_path) return null;
                    return (
                      <div key={item.id} className={styles.similarItem}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${item.backdrop_path}`}
                          alt={item.title || item.name}
                        />
                        <div>
                          {(item.title || item.name).length > 10
                            ? (item.title || item.name).slice(0, 10) + "..."
                            : item.title || item.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={scrollRight} className={styles.navBtn}>
                  ▶
                </button>
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
