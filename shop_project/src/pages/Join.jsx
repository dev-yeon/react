import { useState } from 'react'



export default function Join(){

  const [userName, setUserName ] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [nameErr, setNameErr] =useState('');
  const [emailErr, setEmailErr] = useState('');
  const [psErr, setPsErr]=useState('');

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

  return (
    <div className='container'>
      <h2>회원가입</h2>
      <form>
        <div>
          <input 
          type='text' 
          placeholder='이름을 입력하세요.'/>
        </div>
      </form>
    </div>
  )

}