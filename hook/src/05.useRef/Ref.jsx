/*
  useref 
  1. dom 요소에 직접적으로 접근하기 위한 목적의 hook
    (리액트는 가급적 dom에 직접적으로 접근하는 것을 금지하지만, 필요할 때엔 ref로 접근하는 것을 허용)
    ex) 입력 필드에 포커스를 주거나, 멀티미디어 요소를 제어하는 역할에 주로 ref를 많이 사용.

    2. 상태값 처럼 유지할 필요가 있는 값이 있지만, 그 값이 변경 되어도 리랜더링을 유발하지 않아야 하는 경우 
    - ex ) 랜더링 주기와 상관 없이 지속적으로 유지 해야 할 데이터 (타이머, 카운터)

*/

import { useEffect, useRef, useState } from 'react'


export default function Ref(){
  //case 01 객체에 직접적으로 접근 
  const ref =  useRef() //선택할 값을 넣기 전에 빈 값으로 초기화 작업 
  console.log(ref)

  useEffect (()=>{
    ref.current.focus() // 선택된 객체에 focus() 주기
    console.log(ref);
    console.log('랜더링 실행');
  }); 

  //case02 상태값 관리
  //useState 버전
  const[num, setNum] = useState(0);
  
  const handleCount = () => {
    setNum(()=>{
      setNum(prevNum => prevNum + 1); // num을 1 증가시킴
    })
  }
  const numRef = useRef(0)
  console.log('랜더링 실행');

  const handleCountRef = ()=>{
    numRef.current +=1
    console.log(`${numRef.current}`);
    // 화면의 값은 리랜더링을 통해서만 변경되기 때문에 ref 라이브로 값이 변경되는 것은 확인 할 수 없다.
  }

  return (
    <>
    <input ref={ref} />
    {/* 초기화 된 ref를 연결할 객체에 ref라는 속성을 주고 초기화된 ref의 변수를 입력*/ }
    <p>{num}</p>
    <button onClick={handleCount}>1더하기</button>

    <p>{numRef.current}</p>
    <button onClick={handleCountRef}>1더하기(ref) </button>
    </>
  )
}

// import { useEffect, useRef, useState } from 'react';

// export default function Ref() {
//   const ref = useRef();
//   const [num, setNum] = useState(0); // useState를 컴포넌트 최상위에 위치시킴
//   const numRef = useRef(0);

//   useEffect(() => {
//     ref.current.focus();
//     console.log(ref);
//     console.log('랜더링 실행');
//   }, []); // 빈 배열을 넣어 첫 번째 렌더링 시에만 실행되도록 함

//   const handleCount = () => {
//     setNum(prevNum => prevNum + 1); // num을 1 증가시킴
//   };

//   const handleCountRef = () => {
//     numRef.current += 1;
//     console.log(`${numRef.current}`);
//     // 화면의 값은 리렌더링을 통해서만 변경되기 때문에 ref 라이브로 값이 변경되는 것은 확인할 수 없다.
//   };

//   return (
//     <>
//       <input ref={ref} />
//       {/* 초기화 된 ref를 연결할 객체에 ref라는 속성을 주고 초기화된 ref의 변수를 입력*/}
//       <p>{num}</p>
//       <button onClick={handleCount}>1 더하기</button>

//       <p>{numRef.current}</p>
//       <button onClick={handleCountRef}>1 더하기 (ref)</button>
//     </>
//   );
// }