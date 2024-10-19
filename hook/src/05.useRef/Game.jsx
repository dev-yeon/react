import { useEffect,useRef, useState } from 'react'
import gameImg from '../game.png';

export default function Game(){
  /*

  가위 바위 보 게임
  조건 : 내 점수와 pc의 점수를 비교 
  0점은 비기기 
  1점이 된 상대는 승리
  -1이 된 상대는 패배  

  점수 차이로 승 패 무를 결정 
  점수 차이가 0 인 경우 무승부 
  점수차리가 2점이거나 -1인 경우 플레이어의 승리 
  반대의 경우 PC가 승리 
  */

  const scoreSetting = {
    가위: 1,
    바위: 0,
    보: -1
  } // 점수 기준 정하기 

  const gamePo = {
    바위 :  '-100px',
    가위 :  '-450px',
    보: '-820px'
  }
  const [result, setResult] = useState('') // 결과값 (승리, 비기기, 패배)
  const [score, setScore] = useState(0) // 기본 함수
  const [imgPo, setImgPo] = useState(gamePo.바위);
  const [isPlay, setIsPlay] = useState(false) //게임 진행 여부

  const intervalRef = useRef();


  useEffect (()=> {
    intervalRef.current = setInterval(changeHand, 50);

    return () =>{
      clearInterval(intervalRef.current)
    }
  }, [imgPo])

  const changeHand = ()=>{
    if(imgPo === gamePo.바위){
      setImgPo(gamePo.가위)
    } else if (imgPo === gamePo.가위){
      setImgPo(gamePo.보)
    }  else if (imgPo === gamePo.보){
      setImgPo(gamePo.바위)
    }
  }
  /*
  imgPo = 현재 손동작의 위치 
  gamePo = 가위 바위 보 각각의 이미지가 표시될 위치 값 
  */

  const handleClick = (choice) =>{
    if(isPlay){
      return; // 게임이 진행중이라면 즉시 종료 
    }
    setIsPlay(true)
    clearInterval(intervalRef.current)

    const myScore = scoreSetting[choice]; // 플레이어 점수 
    const pcScore = scoreSetting[getChoicePC(imgPo)]
    // console.log(pcScore);

    const diffScore = myScore - pcScore;

    if(diffScore === 0 ){
      setResult('비겼습니다. 다시 한번 더! ')
    } else if ([-1, 2].includes(diffScore)) {
      setResult('이겼습니다. 축하합니다.')
      setScore((prev)=> prev +1);
    } else {
      setResult('아쉽습니다. 졌습니다. ')
      setScore((prev)=> prev -1);
    }
    // 게임이 끝난 후 일정 시간 이후 다시 게임이 시작되려면 

    setTimeout(()=>{
      intervalRef.current = setInterval(changeHand,50);
      setIsPlay(false);
    },3000)
  }
  const getChoicePC = (imgPo) =>{
    return Object.keys(gamePo).find((key)=>gamePo[key] === imgPo)
  }

  return (
    <>
      <div className="handleImg"
        style={{width: '400px',
        height: '570px',
        background: `url(${gameImg}) ${imgPo} 0`}}>
        </div>
        <button onClick={() => handleClick('가위')}>가위</button>
        <button onClick={() => handleClick('바위')}>바위</button>
        <button onClick={() => handleClick('보')}>보</button>

        <h1>{result}</h1>
        <h2>{score}</h2>
    </>
  )
}