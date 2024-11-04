import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import instance, { getGenre, getSearch } from '../axios/axios'
import MovieCard from '../components/MovieCard';
import { getGenresNames, getRating } from '../utils/movieHelpers';
import styled from 'styled-components';

export default function SearchResult(){
  const imgVariants = {
    initial: {
      opacity: 1,
      scale: 1,
      zIndex: 1,
    }, 
    hover: {
      opacity: 1,
      scale: 1.5,
      zIndex: 99, 
      transition: { 
        duration: 0.9
      }
    }
  };
  const infoVariants = {
    initial : {
      opacity : 1,
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
  };
  const navigate = useNavigate();
  const location = useLocation();
  // const {hoverId, setHoverId} = useState(null)
  // const {movieId}
  const queryParams = new URLSearchParams(location.search);
  
  const keyword = location.state.keyword || queryParams.get('keyword'); // 안전한 keyword 참조
  const [genres,setGenres] = useState({}); // 빈 객체로 초기화
  useEffect(()=> {
    const fetchGenres = async()=> {
      const genreData = await getGenre();
      const genreMap = genreData.reduce((acc,genre)=>{
        acc[genre.id] =genre.name;
        return acc
      },{})
      setGenres(genreMap);
    }
    fetchGenres()
  },[])
  const getGenresNames = (genreId) =>{
    if (!genreId || genreId.length === 0) return ''; // genreIds가 없을 경우 빈 문자열 반환
    return genreId.map(id => genres[id] || 'Unknown').join(', '); // 장르가 없으면 'Unknown'
    // return genreId.map(id=>genres[id].join(','))
    
  } 
  const getRating = (adult) => {
    return adult ? '청소년 불가' : '전체 관람 가능'
  }

  const {isLoading, error, data} =useQuery(['search', keyword], ()=> getSearch(keyword));
  return (
    <>
      {(!data || data.length === 0 ) && <h2 className='resultText'>검색 결과가 없습니다.</h2>}
      { data && (
        <ResultContainer className = 'on'>
          <div className='searchWrapper'>
            <h3> {keyword} 로 검색한 결과 입니다. </h3>
            <div className='searchList'>
              {data.map ((movie, idx)=> (
                <MovieCard
                  key ={movie.id}
                  movie = {movie}
                  id = {idx}
                  rate ={movie.rate}
                  navigate = {navigate}
                  type = {movie.type}
                  // setHoverId = {setHoverId}
                  imgVariants={infoVariants}
                  infoVariants = {infoVariants}
                  getGenresNames = {getGenresNames}
                  getRating = {getRating}
                  movieLength = {movie.length}

                >
                  
                </MovieCard>
              ))}
            </div>
          </div>
        </ResultContainer>
      )

      }
    </>
  )
}

const ResultContainer = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  padding: 20px;
  padding-top: 200px;
  box-sizing: border-box;
  .resultText{
    color: #fff;
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 100px;
  }
  .searchList{
    max-width: 70%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    gap: 40px 0px; 
    > div {
      width: 30%;
    }
  }

`
