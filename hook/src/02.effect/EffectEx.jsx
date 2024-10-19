
/*
useState와 useEffect를 이용해서 카운트 다운을 만들기. 
1. useState 의 초기 값을 설정하고, useEffect 로 값을 차감 
2. useState의 값이 0 이 되면, 텍스트를 화면에 출력하고 카운트 다운이 멈추도록 설정 
*/ 
import React,  { useState, useEffect } from 'react';
export default function EffectEx(){

  const [count, setCount] = useState(5);

  useEffect(()=> {
    if(count > 0){
      //setInterval: 일정한 시간 간격(여기서는 1초마다)으로 특정 코드를 실행
      //timer: setInterval이 반환하는 값을 timer에 저장하여 나중에 타이머를 멈추기 위해 사용
      const timer = setInterval(()=>{
        // 이전 상태 값을 가져와서 1씩 감소 , 
        setCount((prevCount) => prevCount - 1);
      },1000); // 1초마다 실행 
      return () => clearInterval(timer);
    }
  } ,[count]);

  return (
    <div>
      {count > 0 ? (
        <h1> Countdown : {count} </h1>
      ) : (
      <h1> Countdown 종료 </h1>
      )}
    </div>
  )
}