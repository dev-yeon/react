/* 리액트에서 이벤트 처리 방법
  1. 이벤트의 이름은 카멜 기법으로 작성하면 된다. 
  onclick = X
  onClick = O 

  2. 이벤트 전달 
  이벤트 핸들러로 이벤트를 전달 할 때에는 함수 형태로 전달하거나, 즉시 실행으로 한다. 
  함수 명으로 호출 시, ()는 생략 
  onClick = {event()} 대신 onClick = {event} 로 전달한다.

  3. 기본 이벤트 제거 
  리액트에서 요소의 기본 이벤트를 막기 위해 return false 를 사용 할 수 없다. 
  반드시 기본 이벤트를 막을 때에는 event.preventDefault() 만 사용 한다. 

  이벤트 종류 
  - 클릭이벤트
    onClick 
  
  - 폼 이벤트 
    onChange : 입력 요소 안에서 값이 변경 될 때. input, textarea, checkbox 
    onSubmit : 사용자가 폼 안에 있는 내용을 서버에 전달하는 이벤트  

  -포커스 이벤트
    onFocus : 요소에 포커스가 들어왔을때 
    onBlur : 요소에 포커스가 아웃 되었을 때. 
  
  - 마우스 이벤트 
    onMouseMove : 요소 내에서 마우스가 움직이는 이벤트 
    onMouseEnter : over 이벤트
    onMouseLeave : out 이벤트 

  - 키보드 이벤트
    onKeyDown : 키를 누를 때 발생
    onKeyUp : 키를 눌렀다가 뗄 때 발생
    onKeyPress : 키를 누르고 있는 상태 
  */
import {useState} from "react"

export default function Event(){
  const [inputValue,setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState('마우스의 영역 밖으로 나갔습니다!');

  const [keyDownValue, setKeyDownValue] = useState("");
  const [keyUPValue, setKeyUpValue] = useState("");
  const [keyPressValue, setKeyPressValue] = useState("");

  
  //폼 이벤트 
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue)
  }
  // 제출 이벤트 
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(`제출 내용 : ${inputValue}`);
  }
  // 포커스 이벤트 
  const handleFocus = (e)=>{
    setIsFocus(true)
    console.log(isFocus)
  }

  // 포커스 아웃 
  const handleBlur = (e) =>{
    setIsFocus(false)
    console.log(isFocus)
  }
  // 마우스 이벤트
  const handleMouseMove = (e) => {
    console.log(`${e.clientX}, ${e.clientY}`)
  }

  const handleMouseEnter = (e)=> {
    setText('마우스가 영역 안으로 들어왔습니다.')
  }

  const handleMouseLeave = (e) => {
    setText('마우스가 영역 밖으로 나갔습니다.')
  }
  // 키보드 이벤트
  const handleKeyDown = (e) => {
    setKeyDownValue(`%{e.key}`)
    console.log(` ${e.key} 를 눌렀습니다. `)
  }

  const handleKeyUp = (e) => {
    setKeyUpValue(`%{e.key}`)
    console.log(` ${e.key} 를 뗐습니다. `)
  }

  const handleKeyPress = (e) => {
    setKeyPressValue(`%{e.key}`)
    console.log(` ${e.key} 를 누르고 있습니다..`)
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text'
          value ={inputValue}
          onChange= {handleChange}
          onFocus = {handleFocus}
          onBlur = {handleBlur}
          onKeyDown = {handleKeyDown}
          onKeyUp = {handleKeyUp}
          onKeyPress = {handleKeyPress} //비권장 이벤트 타입( 최신 브라우저에서는 비권장 ) 
          /*
          특정 브라우저에서는 잘못 작동할수 있어서 사용 잘 안하는 편이다. 
          */ 
          />
        <input type='submit' value='제출' />
      </form>
      {isFocus && <p>포커스 이벤트가 실행되었씁니다.</p> }
      <div  style={{padding: '200px', background:'gray'}}>마우스 영역</div>
      <div onMouseEnter = {handleMouseEnter}
            onMouseLeave = {handleMouseLeave}
            style = {{width :'300px', height : '200px', border: 'solid 1px black'}}
            >
              {text}
            </div>
    </>
  )
}