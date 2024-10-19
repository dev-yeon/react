import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// useNavigate = 강제적으로 라우팅을 하게 해주는 훅 
// 이벤트 이후나 조건부에서 특정 path로 이동 시킬때 사용한다. 
// ex)  로그인이 성공하면 메인 페이지로 이동 
// ex) 회원 가입 후 로그인 페이지로 이동 
export default function Login(){
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  

  const handleLogin = () => {
    if(userName === 'pjh'){
      setMessage('');
      navigate('/')
    } else {
      setMessage('이름이 틀렸습니다.');
    }
  }
  return(
    <>
    <h1>로그인 페이지</h1>
    <input type='text'
      value={userName}
      onChange={(e) => setUserName(e.target.value)}/>
    
    <button onClick={handleLogin}>로그인</button>
    {}
    {message && <p style={{color :'red'}}>{message}</p>}
    </>
  )
}