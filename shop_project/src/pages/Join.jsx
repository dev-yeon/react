import { useState } from 'react'
import { joinEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';



export default function Join(){

  const [userName, setUserName ] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [nameErr, setNameErr] =useState('');
  const [emailErr, setEmailErr] = useState('');
  const [psErr, setPsErr]=useState('');

  const navigate = useNavigate();
  // 이름 유효성 검사 
  const validatorName = (userName) =>{
    if(!userName) {
      setNameErr('이름을 입력해주세요.')
      return false
    }// 이름을 생략하거나 공백으로 넣은 경우 
    if(userName.length <=2 || userName > 10){
      setNameErr('이름은 2글자 이상, 10글자 이하로 해주세요. ')
      return false
    }
    if(!/^[A-Za-z가-힣\s'-]+$/.test(userName)){
      setNameErr('유효하지 않은 문자가 포함 되어 있습니다.')
      return false
    }
    return true
    /*
     정규 표현식 
     ^ 는 문자열의 시작, &은 문자열의 끝 
     A-Za-z : 영어 대소문자 허용 
     가-힣 : 한글을 허용 
     \s :중간의 공백문자 허용
     '- :따옴표와 하이튼 허용 (큰 따옴표, 작은 따옴표 포함 )

    */
  }

  const handleJoinEvent = async (e) => {
    e.preventDefault();
    setPsErr('');
    setNameErr('');
    setEmailErr('');
  
    if (!validatorName(userName)) {
      return;
    } 
    // if (userPassword.length < 6) {
    //   setPsErr('비밀번호는 6 글자 이상이어야 합니다.');
    //   return;
    // }
    // try {
    //   const result = await joinEmail(userEmail, userPassword, userName); // result 변수에 할당
    //   if (result.error) {
    //     if (result.error.code === 'auth/email-already-in-use') {
    //         setEmailErr('이미 사용 중인 이메일입니다.');
    //     }
    //     return;
    //   } else {
    //     navigate('/login');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      const result = await joinEmail(userEmail, userPassword, userName) 
      console.log(result);
      if (result){
        navigate('/login')
      }
    }catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            setEmailErr('이미 사용 중인 이메일입니다.');
        }
      else if( error.code === 'auth/weak-password') {
        setPsErr('이메일이 너무 약합니다. ')
      }else {
        console.log(error);
      }
    }
  };

  return (
    <div className='container'>
      <h2>회원가입</h2>
      <form onSubmit={handleJoinEvent} noValidate>
        {/* noValidate 인풋 요소가 가지고 있는 기본 유효성 검사 제거  */}
        <div>
          <input 
          type='text' 
          placeholder='이름을 입력하세요.'
          value={userName}
          onChange={(e)=> setUserName(e.target.value)}
          />
          {nameErr && <span className='errorText'>{nameErr}</span>}
        </div>
        <div>
          <input 
            type='email' 
            placeholder='이메일을 입력 하세요.'
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)} 
            /> 
            {emailErr && <span className='errorText'>{emailErr}</span>}
        </div>

        <div>
          <input 
            type='password' 
            placeholder='비밀번호를 입력 하세요.'
            value={userPassword} 
            onChange={(e) => setUserPassword(e.target.value)}
          />
          {psErr && <span className='errorText'>{psErr}</span>}
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )

}