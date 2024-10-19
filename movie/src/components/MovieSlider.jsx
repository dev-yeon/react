import { useEffect, useState } from 'react'
import { getGenre } from '../axios/axios'
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation } from "swiper/modules"
import styled from 'styled-components'

// 스와이퍼 사용시에 css도 같이 가져와야 함.
import 'swiper/css';
import 'swiper/css/navigation';
import MovieCard from './MovieCard'
// 페이지 네이션이나 버튼 같은것들 쓸때는 버튼등등 임포트 해야 함. 

export default function MovieSlider({movies, title, rate, type}){
  const [genres, setGenres] = useState({})
  const [hoverId, setHoverId] = useState(null)

  const imgVariants = {
    initial : {
      scale :1,
      zIndex: 1,

    },
    hover :{
      scale: 1.2,
      zIndex: 99,

      transition : {
        duration: 0.5
      }
    }
  }
  const infoVariants = {
    initial : {
      opacity : 0,
      scale: 1,
      zIndex: 1 ,
    }, 
    hover : {
      opacity :1,
      scale: 1.5,
      zIndex : 99, 
      transition:{ 
        duration: 0.9
      }
    }
  }
  useEffect(()=>{
    const fetchGenres = async  () =>{
      const genreData = await getGenre();
      const genreMap = genreData.reduce((acc,genre)=> {
        acc[genre.id] = genre.name
        return acc;
      }, {})
      setGenres(genreMap)
    }
    fetchGenres();
  },[])
  const getGenresNames = (genreId) =>{
    return genreId.map(id => genres[id]).join(', ')
  }
  // 관람 등급 표시 
  const getRating = (adult) => {
    return adult ? '청소년 불가': '전체이용가'
  }
  return (
    <MovieSliderItem>
      <h2 className ="movieTitle">{title}</h2>
      <Swiper modules={[Navigation]}
      spaceBetween={40}
      slidesPerView={6}
      navigation
      
      >
        {movies.map((movie, id)=>(
          <SwiperSlide key ={movie.id}>
            <MovieCard
            movie={movie}
            id={id}
            type = {type}
            rate={rate}
            hoverId = {hoverId}
            setHoverId = {setHoverId}
            imgVariants = {imgVariants}
            infoVariants = {infoVariants}
            getGenresNames ={getGenresNames}
            getRating = {getRating}
            movieLength = {movies.length}
            >

            </MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>

    </MovieSliderItem>
  )
}

const MovieSliderItem = styled.div`
  padding: 40px 60px;
  box-sizing: border-box;
  
  .movieTitle {
    font-size: 40px;
    color: #fff;
    position: relative;
    margin-bottom: 24px;
  }

  .swiper {
    overflow: visible;
  }
`