import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import "swiper/css/swiper.css";
import Swiper from "swiper";

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        // 是否自动播放
        loop: true,
        // 自动播放的设置
        autoplay: {
          delay: 3000,
          // 滑动之后是否继续播放
          disableOnInteraction: false,
        },
        // 启用分页导航
        pagination: { el: '.swiper-pagination' },
      });
      // 更新自动轮播图
      setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="slider-container">
      <div className="before"></div>
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);