/*
styled-components   
yarn add styled-components 
npm install styled-components 

설치형 라이브러리로 스크립트 코드 안에서 css를 작성 할 수 있게 해주는 라이브러리 
기본적으로 컴포넌트 방식으로 스타일을 관리한다. 

스타일과 로직을 한 파일에서 관리하는 특징이 있다. 

컴포넌트 명을 작성 할 때, 소문자로 작성하면 태그로 인식하게 된다. 
반드시 대문자로 작성 할 것 

스크립트 문법도 같이 사용 할 수 있다. if나 &&값 

*/ 
import styled, { css , keyframes} from 'styled-components';
export default function StyledCom(){
  return (
    <Container className="container">
      {/* 컴포넌트 명과 클래스명은 서로 다르게 작용하기 때문에, 각각 적용 가능 */}
      <ButtonItem fontColor={'green'} sub={true}>클릭1</ButtonItem>
      <ButtonItem fontColor={'blue'}>클릭2</ButtonItem>
      <ButtonItem fontColor={'red'}>클릭3</ButtonItem>

      <Box bgColor={'aqua'}>box</Box>
      <Circle bgColor={'pink'}></Circle>

    </Container>
  )
}

const Container = styled.section`
  display: flex;
  max-width: 1200px;
  background: lightgray;
  padding: 24px;
  margin: 0 auto;
`
const ButtonItem = styled(({fontColor, ...props})=><button{...props}/>)`
/*
styled(({fontColor, ...props})=><button{...props}/>)
스타일 컴포넌트에서 제공하는 기능
컴포넌트에 전달된 props 를 필터링해서. 필터링 된 props 만 실제 html 요소에 전달하기 위해 사용 
*/
  background: lightpink;
  width: 200px;
  height: 50px;
  border: solid 1px black;
  cursor: pointer;
  opacity: 0.5;
  color: ${(color) => color.fontColor};
  /*
  스타일 컴포넌트에는 컴포넌트에 전달된 props 를 스타일 정의에 직접적으로 전달 할 수 있다. 
  '$ {}' 구문은 자바스크립트 표현식에서 문자열 리터럴 안에 값을 넣어서 문자열에 포함 . 
  (props)=> color.fontColor 는 현재 컴포넌트에 전달된 props 객체에서 답을 전달받아 
  style에 적용하는 방식
  */
  transition: 500ms;
  ${(props)=> props.sub && css`background: cyan`};
  // css를 조건무로 넘겨줄
  &:hover {
    opacity: 1;
    /* & 는 현재 요소 자신을 참조 한다는 뜻
    //  &:hover 의 뜻은 해당 요소의 hover 상태를 의미 
    */
  }
`
const Box = styled(({bgColor, ...props })=><div{...props}/>)`
  width: 500px;
  height: 500px;
  background: ${(props)=> props.bgColor};
`

const CircleAni = keyframes`
  25% {
    background: lightcyan;
  }
  50% {
    background: lightsalmon;
  }
  75% {
    background: lightblue;
  }
  100% {
    background: lightyellow;
  }
`

// 애니메이션 기능은 keyframes를 추가로 import 해서 사용해야 하며,
// 기본 사용법은 일반 css 의 애니메이션과 동일하다. 

const Circle = styled(Box)`
// 이전에 만들어진 컴포넌트를참조할때에는 styled.태그명이 아닌. styled(컴포넌트명) 으로 변경
  border-radius: 100%;
  animation: ${CircleAni} 5000ms infinite;
`