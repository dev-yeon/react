import logo from './logo.svg';
import './App.css';
/*
  리액트 파일 정리 
  node.js 
  - 패키징 관리 매니저 프로그램 (이걸 깔면 npm이라는 기본 명령어를 쓸수 있음)
  yarn 
  - 페이스 북에서 만든 패키징 매니저 (nodejs를 조금 더 보완)
  - 설치 속도가 npm보다 빨라요 
  - 오프라인 지원 (한번 설치 했던 패키지를 캐시로 남김 -> 캐시에 남아있는 패키지는 재설치할때 온라인여부를 판단하지 X, 오프라인에서도 설치 할 수 있게 해줌. )
  - 보안성 우수 
  - cli 사용성이 좋다 (커맨드 명령어가 간결함.)


  ssr과 csr  (서버가 작동되는 방식 )
  - ssr (server side rendering)
    - 전통적으로 만들어지는 페이지를 의미 
    - 서버에서 페이지를 전달 받아서 바로 랜더링 하는 방식 (완성된 페이지)
    - html, css, script 가 모두 구현된 상태의 페이지가 사용자에게 전달되는 방식 
    - 초기 로딩속도가 빠르고 seo (검색엔진) 에서도 유리하다.
    - 초기 속도가 빠르지만 업데이트 되면서 랜더링 되는 경우에 모든 페이지를 새로 랜더링 되므로, 속도가 느려지거나
      과부하의 원인이 될 수 있다. 
    - 스크립트의 사용 빈도가 동적인 효과를 효과를 구현이 끝.
    
    - csr (client side rendering)

    - vue 나 react로 만들어지는 spa 방식의 페이지를 의미 
    - 초기 랜더링 속도는 느리지만, (한번에 모든 정보를 받아와야 해서.) 업데이트 될 때에는 필요한 부분만 랜더링이 되기 때문에 과부하의 염려가 적고 속도가 빠르다. 
    - seo에서 는 다소 불리한 위치 


    -ssr과 csr을 같이 사용하는 방식 
    nextjs () - react를 기반으로 하는 프레임 워크 
    (리액트 개발을 좀 더 편하게 )

    리액트 - 자바 스크립트 기반 ui 제작 라이브러리
    리액트는 오직 Ui 만 구성을 목적으로 만들어진 툴이기 때문에, 상태관리나 라우팅 같은 개발 요소들은 다른 
    라이브러리를 설치해서 사용해야 한다. 
    다만, 사용자가 프로젝트에 맞게 필요한 요소들만 선택해서 사용할 수 있기 때문에, 관리면에서는 장점을 가지고 있다.


    뷰 - 자바 스크립트 기반 ui 제작 프레임 워크 
    ui를 구성하는데 필요한 거의 모든 기능을 내상하고 있기 때문에, 따로 추가적인 라이브러리의 설치가 필요하지 X
    다만, 문법이 정해져 있어서  초기 허들이 존재 

    리액트에서 변경되는 점
    문법 - jsx 문법 (javascript xml 문법 )
    확장형 스크립트 문법 -html 과 비슷한 문법으로 사용해서 난이도가 낮은 편 
    일반 스크립트 문법이 아니기 때문에 babel로 변환하는 작업

    Jsx 문법 규칙 
    1. 컴포넌트 (js, jsx 문서) 안에 있는 여러개의 요소들은 반드시 하나의 부모태그만 있어야 한다. 
    react에서 가상의 dom이 컴포넌트를 감지할때, 하나의 태그만 인식하도록 되어 있기 때문 
    보통 div로 감싸는게 일반적인데. 깔끔한 코드를 원한다면, < > </ > (태그명이 없는 태그, frangment)처럼 감쌀 수도 있다. 

    2. 자바 스크립트 표현식을 사용 할 수 있다. 
    3. if 문을 직접적으로 사용 할 수 있다. (삼항 연산자나 and조건문을 더 많이 사용 && )
    4. class 대신 className 으로 사용 
    5. 싱글 태그로 무조건 닫혀 있어야 한다. 
    <input> = X
    <input /> = O 

    6. 인라인 스타일 기법을 사용
    - 인라인 스타일을 적용 할 때에는 className을 사용 할 수 없고, 객체 형태로 전달해야 한다. 
    key값에서는 '-'를 사용 할 수 없기 때문에, 카멜 기법으로 변환
    font-size = fontSize 

    7. 태그를 직접적으로 선택하지 말 것 ( 선택자를 지정하는 것을 남발하지 말 것 )
    
    8. css 적용 방법 
    - class 에 css를 적용 할 때에는 보통 css 문서를 따로 만들어서 import 후에 적용 
    - 인라인 방식으로 적용 할 때에는 style ={{속성: 값}} 으로 작성
    - 오브젝트로 전달
    - 기타 모듈을 사용하는 방법 (scss, styled-component, tailwind)

    9. 컴포넌트 파일명은 반드시 대문자로 시작 할 것 ((약속))

    네이밍 규칙 
    - 모든 네이밍은 카멜 기법을 기준 
    - 디렉터리 폴더명은 소문자 
    - 파일명은 대문자 
    - 컴포넌트 파일은 대문자로 시작, 그 외에는 소문자로 시작
    - 의미론적인 네이밍 (이름이 길어져도 상관 없음)
*/ 

function user(userState) {
  if(userState === 'admin'){
    return <p>admin</p>

  }else if( userState === 'user'){
    return <p>user</p>
  }else {
    return <p>guest</p>
  }
}
function App() {
  const textstyle ={
    width:'200px', height:'200px', backgroundColor:'purple'
  }
  const name = '이경연'
  const userState = 'admin'
  return (
    <>
      <p style={{width:'100px', height:'100px', backgroundColor:'pink'}}>리액트 스타일 기초</p>
      <p style={textstyle}>리액트 스타일 기초2</p>
      <p style={textstyle}>{name}</p>{/*변수 불러오기*/}
      {name ==='park' ? <p>yes</p> : <p>no</p>}{/*삼항연산자로 조건에 따라 다른 텍스트 출력*/}
      {name ==='이경연' && <p>{name}</p>}{/*조건문으로 텍스트 출력*/}
      {/*주석은 {}로 감싸서 작성 */}
      {user(userState)}{/*if문은 직접적으로 작성 할 수 없으므로, 함수로 if문을 작성 후 출력 */}
      {userState ==='admin' ? (
        <p>admin State</p>
      ) : userState ==='user' ? (
      <p>userState</p>
    ): (
      <p>guestState</p>
    )}
    {/*연속 삼항연산자의 경우, 내부에서 작성 할 수 있다는 장점이 있지만 코드가 복잡해지고, 관리가 어려워지는
    단점 때문에, 함수로 따로 관리하는 편 */ }
    <div className = 'box'>class는 자바스크립트 약속어이기 때문에, 구분을 위해className 으로 변경 </div>
    </>
  );
}

export default App;
