import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const TrendingLayout = ({ data }) => {
  return (
    <div className="trending my-10">
      <h1 className="text-xl font-bold mb-5 ml-5 tracking-widest  text-secondary my-2">
        TRENDING
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation
        breakpoints={{
          0: { slidesPerView: 3 },
          800: { slidesPerView: 4 },
          1320: { slidesPerView: 6 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="item flex flex-col items-center overflow-hidden px-2">
              <a
                href={`/${item.id}`}
                className="poster w-full h-0 pb-[150%] bg-gray-200 relative overflow-hidden"
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={item.poster}
                  alt={item.title}
                />
                <div className="rank p-2 font-extrabold absolute top-0 bg-white text-center text-black font-bold mb-2">
                  0{item.rank}
                </div>
              </a>
              {/* Title */}
              <h2
                title={item.title}
                className="title cursor-default  text-sm font-semibold text-center mt-2 truncate w-full"
              >
                {item.title}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingLayout;
