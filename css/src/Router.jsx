export default function Router(){
  /**
  react-router-dom
  리액트에서 클라이언트 측에서 라우팅을 처리하기 위한 라이브러리 
  spa에서 url을 사용해서 여러 페이지처럼 보이게 하고, 페이지 간에 탐색을 가능하게 한다. 
  각 페이지를 실제로 다른 html 파일이 아닌 하나의 html 파일 내에서 스크립트로 url방식에 따라 랜더링이 되는 방식
  
  라우터 안에서 사용하는 컴포넌트 
  Browser Router : 브라우저 주소를 변경하고, url 을 관리하는 역할의 컴포넌트
  BrowserRouter 는 앱을 감싸고, 그 안에서 라우팅이 이루어진다.

  Routes / Route 
  Routes 는 여러개의 Route를 감싸는 요소 .
  Route 는 각 경로와 매칭되는 컴포넌트로  이동 시켜주는 컴포넌트  (이를태면 a태그 같은.. 그러나 a태그와 작동방식이 다르다. )
  (외부링크는 a 태그를 쓸수 있다. 내부의링크는 라우터를 쓰면 좋다. )
  Link 브라우저와 a 태그와 같은기능을 하며, 클릭하면 페이지 spa 동작을 유지하면서, 페이지간 탐색을 하게 해준다. 
  Link 와 a 태그의 차이점은
  랜더링 방식의 차이 
  a태그는 페이지 전체를 다시 로드하는 방식을 사용하기 때문에 spa의 리액트와는 맞지 않는다. 

  yarn add react-router-dom
  
  */

}