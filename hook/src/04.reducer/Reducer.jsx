/* 
useReducer
상태 관리 hook
useState의 대체 hook  
useState의 경우 복잡한 상태 로직에서는 유용하지만
복잡한 로직에서 상태관리를 할 경우 현재 상태가 이전상태에 대한 의존도가 더 커지기 때문에
구조가 복잡해질 수록 useReducer가 더 좋다. 

주로 reducer에서는 switch문을 자주 사용한다. 
여러가지 액션의 유형을 간단하게 처리 할 수 있기 때문에 가독성 면에서 if문보다 switch의 사용도가 
높은 편 
*/

import { useReducer, useState } from 'react';

export default function Reducer(){
  // 카운트 관리 useState버전 
  const [count, setCount] = useState(0);
  const countPlus = (e) =>{
    setCount((prev) => prev+1)
  }
  const countMinus = (e) =>{
    setCount((prev) => prev-1)
  }

  // reducer버젼! 
  const init = {countNum : 0 }
  // 초기값을 설정 할 때, 객체로 설정 한다. 객체로 설정하기 때문에,  여러가지 값을 한번에 관리 할 수 있다. 
  /*
  reducer 함수 :  상태 업데이트를 어떻게 할건지 정의
  state 매개변수 :  현재 상태를 나타냄
  action 매개변수 : 상태를 변경 할 때 사용되는 액션 객체 (switch 문에서 action은 case로 구분.)
  */

  //state는 현재값을 받아오는 매개변수가 된다. 
  const reducerFn = (state, action) =>{
    // switch 문에서는 액션의 타입에 따라 상태를 처리 
    switch(action.type) {
      case 'countNumPlus' : 
        return {countNum : state.countNum + 1}; //state.countNum 가 prev가 된다. 
      
      case 'countNumMinus':
        return {countNum : state.countNum - 1};

      default :
        return state
    }
  }
  const [state, dispatch] = useReducer(reducerFn, init);
  //useReducer 는 reducerFn 함수와 초기상태값 (init) 을 인자로 받아서 상태와 dispatch 함수를 반환 
  //state: 현재 상태 값 
  //dispatch : 상태 업데이트 요청을 보내는 함수 (action을 전달해서 reducerFn을 호출)
  

  return (

    <>
      <h1>{count}</h1>
      <button onClick = {countPlus}>+</button>
      <button onClick = {countMinus}>-</button>

      <h1>{state.countNum}</h1> 
      {/*상태값에 접근할 때에는 countNum이 아니라. state.countNum 으로 접근*/ }
      <button onClick={()=>dispatch({type:'countNumPlus'})}>+</button>
      <button onClick={()=>dispatch({type:'countNumMinus'})}>-</button>
    </>
  )

}