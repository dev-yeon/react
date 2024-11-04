import styled from 'styled-components'
import { googleLogin, loginEmail } from '../api/firebase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom';  
export default function Login(){

  const navigate = useNavigate()
  const [email, setEmail] =useState('');
  const [password , setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  

  
  const handleGoogleLogin = async()=>{
    const user = await googleLogin()
    navigate('/')

  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg('')
    try {
      const user = await loginEmail(email, password)
      if (user){
        navigate('/')
      } else {
        setErrMsg('이메일이나 비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='container'>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <input 
          type='email' 
          placeholder='이메일을 입력하세요.'
          value={email}
          onChange={(e) =>setEmail(e.target.value) }

        />
        <input 
          type='password'
          placeholder='비밀번호를 입력하세요.'
          value = {password}
          onChange={ (e) =>setPassword(e.target.value)}
        />
          <button type='submit'>로그인</button>
         
      </form>
      <GoogleBtn onClick={handleGoogleLogin}> 구글 로그인 </GoogleBtn>
      {errMsg && <span className='errorText'>{errMsg}</span>}
      <Link to = '/join'>회원가입</Link>

      

    </div>
  )
}

const GoogleBtn = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;