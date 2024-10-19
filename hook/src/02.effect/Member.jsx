import { useState, useEffect } from 'react'

export default function Member (){
  const [item, setItem] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(()=>{
    // 비동기 방식을 데이터를 처리하는 메서드 
    /* 
    비동기 방식 
    - 작업을 즉시 완료하지 않고, 작업이 끝나는 것을 기다리지 않고, 다른 작업을 처리하는 방식 
    - 네트워크 요청 같이 시간이 오래 걸리는 작업에서 비동기 방식을 많이 채택 한다. 
    
    동기 방식 
    - 각 작업을 순서대로 처리하며, 하나의 작업이 완료 될때까지 다음 작업으로 넘어가지 않음.
    - 하나의 작업이 오래 걸린다면, 대기가 길어지는 단점
    - 코드가 흐름대로 작성되기 때문에 직관적 
    */
    fetch(`data/${check ? '' : 'no-'}member.json`)
      .then((res)=> res.json())
    // fetch = 비동기 방식으로 데이터를 호출하는 함수 
    // then() => fetch로 데이터를 성공적으로 가져왔을 때. 실행 되는 함수 
    // 호출에 성공하면 응답받은 파일을 .json() 함수를 통해 json 형식으로 파싱해줌 . 
    // public 폴더는 바로 접근 가능. 
    .then((data)=>{setItem(data)})
  },[check])


  const onCheckEvent =()=> {
    setCheck((prev)=>!prev)
  }
  return (
    <>
      <input type = "checkbox" onChange={onCheckEvent}/> 비회원체크
      <ul>
        {item.map((el)=>(
          <li key={el.id}>
            <p>{el.name}</p>
            <p>{el.price}</p>
          </li>
        ))}
      </ul>
    </>
  )
}