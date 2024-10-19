import { useState } from 'react';
import ChildState from './component/ChildState';


export default function State02(){
  const [name, setName] = useState('park');
  return (
    <>
    <ChildState name={name}/>
    <button onClick={()=>setName('kim')}>클릭!</button>
    </>
  )
}