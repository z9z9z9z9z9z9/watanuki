import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaAngleRight,
  FaCalendarDay,
  FaCirclePlay,
  FaClock,
  FaClosedCaptioning,
  FaMicrophone,
} from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./hero.css";

const HeroBanner = ({ slides }) => {
  return (
    <Swiper
      grabCursor={true}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2500 }}
      pagination={{ clickable: true }}
      className="slider h-[40vh]  md:h-[70vh] xl:h-[calc(100vh-100px)]"
    >
      {slides.map((item) => (
        <SwiperSlide
          key={item.id}
          className="relative h-full overflow-hidden bg-lightBg"
        >
          <div className=" content w-full h-full absolute">
            <div className="opacity-layer opacity-[.7] absolute left-0 md:left-[30%] top-0 right-0 bottom-0 overflow-hidden">
              <img
                className="absolute bg-cover object-cover w-full h-full"
                loading="lazy"
                alt={item.title}
                src={item.poster}
              />
            </div>
            <div className="info ml-2 md:ml-12 min-w-32  md:max-w-2xl absolute bottom-10">
              <div className="text-secondary text-base font-semibold mb-2">
                #{item.rank} Spotlight
              </div>
              <div
                title={item.title}
                className=" title text-lg md:text-2xl xl:text-5xl font-bold mb-6 line-clamp-2"
              >
                {item.title}
              </div>
              <div className="text-base text-white mb-3 gap-5 hidden md:flex">
                <div className="item">
                  <FaCirclePlay />
                  <span>{item.type}</span>
                </div>
                <div className="item">
                  <FaClock />
                  <span>{item.duration}</span>
                </div>
                <div className="item">
                  <FaCalendarDay />
                  <span>{item.aired}</span>
                </div>
                <div className="item bg-primary text-sm font-bold px-1 rounded-sm">
                  <span className="">{item.quality}</span>
                </div>
                <div className="item">
                  <div className="flex gap-1">
                    <div className="item bg-[#b0e3af] font-bold text-sm px-1 text-black rounded-sm rounded-tr-none rounded-br-none">
                      <FaClosedCaptioning />
                      <span>{item.episodes.sub}</span>
                    </div>

                    <div className="item bg-[#b9e7ff] px-1 text-sm font-bold text-black">
                      <FaMicrophone />
                      <span>{item.episodes.dub}</span>
                    </div>

                    <div className="item px-1 rounded-sm rounded-tl-none rounded-bl-none font-bold text-sm bg-[#3e3e46]">
                      {item.episodes.eps}
                    </div>
                  </div>
                </div>
              </div>
              <div className="synopsis">{item.synopsis}</div>
              <div className="desi-buttons text-sm md:text-base mt-5 flex gap-2">
                <a
                  href={`/watch/${item.id}`}
                  className="bg-primary rounded-3xl px-4 py-1 flex justify-center items-center gap-2"
                >
                  <FaCirclePlay />
                  <span>Watch Now</span>
                </a>
                <a
                  href={`/${item.id}`}
                  className="bg-[#3e3e46] rounded-3xl  px-4 py-1 flex justify-center items-center gap-2"
                >
                  <span>Detail</span>
                  <FaAngleRight />
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroBanner;
