import {useState} from "react"
export default function State(){
  const [name, setName] = useState('홍길동')
  console.log(name)
  console.log(setName)
  return(
    <>
    <p>{name}</p>
    <button onClick={()=>setName('lee')}>이름 변경</button>
    </>
  )
}