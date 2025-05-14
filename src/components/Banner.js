import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Banner({ movies }) {
  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {movies
          .filter((movie) => movie.vote_average >= 7.2)
          .map((movie) => (
            <SwiperSlide key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div>{movie.title}</div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
export default Banner;
