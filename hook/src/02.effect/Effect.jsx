  /*
  useEffect()
  페이지가 랜더링 될 때 특정 작업을 실행하는 hook.
  페이지가 랜더링 된다는 의미
  - 컴포넌트가 처음 나타났을 때 (마운트)
  - 컴포넌트가 사라졌을 때 (언마운트)
  - 값이 업데이트 되어서 리랜더링 되는 경우 (start)

  - useEffect (()=> {
      실행되는 코드 값 
      return () => { 리턴 실행 코드 }
      },  특정 배열 값 )
  - useEffect (()=> {
      실행되는 코드 값 
      return () => { 리턴 실행 코드 }
      },  특정 배열 값 )
        - useEffect (()=> {
      실행되는 코드 값 
      return () => { 리턴 실행 코드 }
      },  [] )
      effect 의 구동 방식은 특정한 값이 변경 (마운트, 언마운트, 리랜더링)되면 값을 담아서 
      변경해주는 방식 , 배열에 특정 값을 넣게 되면 그 값이 변경될 때에만 작동 

      배열 값을 생략 하는 경우 =  모든 값이 변경 될 때마다 실행 (기본값)
      특정한 값을 넣는 경우 [값] -  해당하는 값이 바뀔 때에만 실행 
      빈 배열[]만 넣는 경우 =  최초 마운트 시에만 실행 . 

      return 문은 필수는 아니며 선택적 구문 
      - 효과가 재실행되기 전이나 마운트가 해제하려고 할 때 실행되도록 하는 구문 
      - 이벤트 제거, cleartimeOut

      함수와 hook의 차이 
      
      함수 
      - 리액트에서는 두가지 함수 존재
      - 함수형 컴포넌트 , 일반 자바스크립트 함수 

      함수형 컴포넌트 
      - Ui를 정의하는 자바 스크립트 함수 
      - ui를 랜더링 하거나, 데이터를 처리하고 특정 작업을 수행 

      hook 같은 경우에..
      - 함수형 컴포넌트에서 상태 (state), 생명주기(컴포넌트가 생성되서 사라지기 까지의 일련의 과정, 라이프 사이클)에 관여한다. 컴포넌트의 상태관리, 생명주기 관리, 기타 효과 관리,
      리액트에서만 사용 


  */

import { useEffect, useState } from 'react';

export default function Effect(){
    const [num, setNum] = useState(2)
    const [count, setCount]= useState(10)
    const [timeCount, setTimeCount] = useState(0)
    // [초기값, 업데이트 함수]
    // useState() 를 설정할 때 const 대신 let은 권장하지 않는 타입.
    // 상태관리의 변수의 재할당 방식에 대한 차이 때문에 권장하지 않음. 
    //const 상수는 변수에 값을 한번 할당하면 재할당이 안된다. 
    // 리액트에서 useState로 선언된 상태 변수는 재할당을 할 필요가 없다. 
    // let으

    const numCalc=()=>{
      setNum (num * 2)
    }
    const countCalc =()=>{
      setCount(count +1)
    }
    useEffect (()=>{
      console.log(num)
      console.log(count)
    },[count])
    useEffect(()=>{
      const timer = setInterval(()=>{
        /*
        //setTimeCount(timeCount+1) 
        는 실행되는 시점의 timeCount 값에 의존한다.
        userEffect에 []을 넣어 마운트가 실행되는 순간만 실행을 했기 때문에, 항상 초기값만 참조하려고 한다. 
        항상 초기값을 참조하기 때문에,0을 기준으로 하게 된다. 
        
        setTimeCount((prev) => prev + 1);
        setTimeCount 에 prev를 인자로 전달한다. 이 함수는 현재
        TimeCount 의 값을 파라미터로 받아오고 있는 상태의 값을 기반으로 다음 상태의 값을 계산한다. 
        setTimeCount 는 최신 timecount의 상태값을 받아와 이를 기반으로 상태를 업데이트 하는 방식
        리액트에서는 상태 업데이트를 할 때 비동기적인 작업이나. 타임아웃과 같은 작업을 할 때에는 최신의 값을 반영 할 수 있도록 함수형 업데이트로 하는 것이 안전하다 
        */ 
        
        // setTimeCount((prev)=>prev+1);

        return()=>{
          clearInterval(timer)
        }
        // effect 의 조건을 최초 마운트로 해도 setInterval은 언마운트나 리랜더링 시에도 계속 실행되고 있기 때문에, 예상치 않은 값이 업데이트가 실행되거나, 성능 저하의 원인이 될 수 있다. 

        // 컴포넌트가 언마운트 될 때나 useEffect가 재 실행 될 때, 기존의 비동기 작업이나 실행요소들을 중지 시켜야 한다. 
      },[])
    })
      return (
        <>
        <p>{num}</p>
        <p>{count}</p>
        {/* <p>{timeCount}</p> */}
        <button onClick={numCalc}>클릭!</button>
        <button onClick={countCalc}> 클릭! </button>
        </>
      )
}