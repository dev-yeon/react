import {Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css'
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade'

const sliderWrap = {
  width: '500px',
  height: '600px'
}

export default function CategorySlider({ imgs }){
  return (
    <Swiper
      style={sliderWrap}
      slidesPerView={1}
      loop={true}
      autoplay = {{delay:2000}}
      speed = {3000}
      modules={[Autoplay, EffectFade]}
      effect={'fade'}
      
      >
        {imgs.map((img,idx)=>(
          <SwiperSlide key ={idx}>
            <img src={img} alt={`slide-${idx}`} style={{ width: '100%', height: '100%' }} /> {/* alt 추가 */}
          </SwiperSlide>
        ))}

    </Swiper>
  )

}