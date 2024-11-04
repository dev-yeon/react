/*
axios
node.js 나, 브라우저 에서 사용 할 수 있는 http기반의 클라이언트 라이브러리,
외부에 있는 api 와 비동기 통신을 해주는 라이브러리 

*/

import axios from "axios"; 

const API_KEY = '68656de4dd6555c818584efbf1a6df85'
const BASE_URL = 'https://api.themoviedb.org/3'

/**
 * 
 * 보통 API_KEY 같은 경우, 개인 고유번호이기 떄문에, 노출 되지 않아야 하지만, 현재 상태로는 
 * 서버에 올릴 경우 API_KEY가 그대로 노출 되기 때문에, 보통은 환경변수로 분리해서 작업하는 방향을 선택 
 * 
 * 환경변수에 들어가는것 : 대문자로 분리함 
 * 
 */

const instance = axios.create({
  // axios.create() = 새로운 axios 인스턴스를 생성해서, 외부 api 와 연결 
  // 변수를 해당 컴포넌트 내부에서 호출하게 되면, 연결된 api 와 연결이 시작됨. 

  baseURL : BASE_URL,
  params : {
    api_key : API_KEY,
    language : 'ko-KR' // 기본 통신 언어 설정 
  }
})
// 영화 목록을 호출 
// getMovies 를 외부에서 호출해야 하기 때문 
// export const getMovies = async(genreId) =>{
//   try {
//     const res = await instance.get(`discover/movie`, {
//       params : {
//         with_genres : genreId
//       }
//     });
//     return  res.data.results
//   } catch(error) {
//     console.error(error)
//   }

export const getMovies = async(type) =>{
  try {
    const res = await instance.get(`/movie/${type}`)
    return res.data.results
  }catch(error){
    console.error(error)
  }
}

// 메인 비디오 받아오기 
export const getMainVideos = async(movieId) => {
  //async = 비동기 함수로 선언된 요소에 await를 사용 할 수 있게 하는 메서드
  // await 비동기 작업이 완료 될 때 까지 코드의 실행을 중단하고 비동기 통신이 완료되면 그 결과값 반환
  // await는 비동기 함수에서만 사용할 수 있다. 반드시 async 가 정의된 함수안에서만 사용해야 한다. 
  // try- catch 비동기 요청에서 발생 할 수 있는 오류를 처리해주기 위해서 사용하는 구문 

  try {
    // try에서는 비동기 작업 코드가 들어간다. 
    // (api 호출과 관련된 코드가 들어가야 함. )
    const res = await instance.get(`movie/${movieId}/videos`);
    return res.data.results

  } catch(error) {
    // catch = api 호출이 실패 했을 경우에 대한 오류를 처리 
    // console 로 페이지를 강제로 이동 시키는 등 다른 행동이 가능하다 
    //
    console.log(error);
  }
}
// 장르가져오기
export const getGenre = async()=> {
  try {
    const res = await instance.get('/genre/movie/list');
    console.log(res);
    return res.data.genres;
  } catch (error){
    console.error(error)
  }
}

export const getMovieGenre = async(genreId) =>{
  try {
    const res = await instance.get(`discover/movie`, {
      params :{
        with_genres : genreId
      }
    })
    return res.data.results
  } catch(error){
    console.error(error)
  }
}
// 모달 정보 가져오기 
export const getModalDetail = async(movieId, type) =>{
  try {
    const res = await instance.get(`${type}/${movieId}`);
    return res.data 
  } catch(error) {
    console.error(error)
  }
}

export const getSearch = async(keyword)=>{
  try{
    const res = await instance.get(`search/multi?query=${keyword}`);
    // multi = 모든 장르( 영화, tv 등등 모두 포함)
    // query=${keyword} 검색어를 쿼리 파라메터로 전달 (사용자가 직접 작성한 검색어 )
    
    return res.data.results
  }  catch (error) {
    console.error(error);
    return[] // 오류 상태라면 빈 배열을 출력 
  } 
}