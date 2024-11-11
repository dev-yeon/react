import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { addBoard } from '../api/firebase';

export default function WritePage() {

  const state = useLocation().state;
  const email = state;
  console.log(email)
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const today = new Date();
  const date =  `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBoard(email, date,title, text);
    }catch (error) {
      console.error(error)
    }
  }
  return (


    <div className='container'>
      <h2>게시글 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <div className='writeBox'>
          <label htmlFor="boardTitle">제목 </label>
          <input 
            type='text' 
            id = 'boardTitle' 
            required 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)}/> 
        </div>
        <div className='writeBox'>
          <label htmlFor='boardText'>내용</label>
          <textarea 
            id="boardText" 
            required 
            value={text} 
            onChange={(e)=> setText(e.target.value)}
          />
        </div>
        <button type='submit' className='submitBtn'>작성하기</button>
      </form>
    </div>
  )


}