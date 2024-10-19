import { useState } from 'react'
import styled from 'styled-components'


export default function TodoForm({onAddList}){
  const [text, setText] = useState('')
  const handleSubmit = (e) =>{
    e.preventDefault(); // 기본이벤트 방지 
    // 폼이 제출 될 때 브라우저는 페이지를 새로 고침하는 이벤트 속성이 있다. 그것을 막는 것. 
    // onAddList(text);
    if (text.trim()){
      onAddList(text);
      setText('')
    }
  }
  return (

    <Form onSubmit={handleSubmit}>
      <Input type='text' placeholder="리스트를 추가하세요."
        value={text}
        onChange={(e)=> setText(e.target.value)}
        />
        <Button type='submit'>Add</Button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  padding: 12px 0px;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 12px;
  border: none;
`
const Button = styled.button`
  padding: 8px;
  background-color: #d57eeb;
  border:none;
  color:#fff;
  border-radius: 6px;
  cursor: pointer;
`