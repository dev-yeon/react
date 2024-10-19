import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { getMovieGenre, getMovies } from '../axios/axios';
import MainVideo from '../components/MainVideo';
import MovieSlider from '../components/MovieSlider';
import {useQuery} from "react-query";

export default function Main(){
  // const [movies, setMovies] = useState([]);
  // useEffect(()=>{
  //   const fetchMovies = async ()=> {
  //     const res = await getMovies('now_playing');
  //     if(res){
  //       setMovies(res)
  //     }
  //   }
  //   fetchMovies();
  // },[])
  //now playing
  const {
    data: nowPlaying,
    isLoading: isNowPlayingLoading,
    error: nowPlayingError
  }  = useQuery(['movies','nowPlaying'], ()=>getMovies('now_playing'),{
    staleTime: 5000
  })
  // 액션 장르 
  const {
    data : action,
    isLoading: isActionLoading,
    error: actionError
  } = useQuery(['movies','28'], ()=>getMovieGenre('28'),{
    staleTime: 5000
  })
  /*
  useQuery 
  서버에서 데이터를 가져오고, 캐싱하고, 업데이트 하게 해주는 라이브러리 
  로딩, 오류, 데이터 캐싱, 자동 갱싱을 지원한다. 

  query를 사용하는 모든 컴포넌트에 값을 전달해주기 위해서,  index 맨 상단에 쿼리를 래핑해주어야 함. 
  queryClientProvider 로 랩핑한다. 
  보통 최상위 요소 (index)에 래핑하는 것이 기본적으로 사용한다. 
  queryClientProvider 로 랩핑된 하위 컴포넌트들은 query 문을 전체적으로 공유 할 수 있게 된다. 

  */
  if (isActionLoading) return <div>로딩중입니다...</div>
  if (actionError) return <div>오류가 발생하였습니다.</div>
  if (isNowPlayingLoading) return <div>로딩중입니다...</div>
  if (nowPlayingError) return <div>오류가 발생하였습니다.</div>
  return(
    <>
      <MainVideo/>
      <MovieSlider movies = {nowPlaying.slice(1,11)} title='TOP 10 시리즈' rate ={true} type='nowPlaying'/>
      <MovieSlider movies = {action} title='액션 장르' type="action"/>
    </>
  )
}

const MovieList = styled.div`
    background: black;
    display: flex;
    flex-wrap: wrap;
    gap:20px
  
`

const MovieItem = styled.div`
  background: gray;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 10px;
  max-width: 400px;

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #fff
  }
  p {
    font-size: 20px;
  }

`