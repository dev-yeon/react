import Button from '../components/Button';
import Button02 from '../components/Button02';
import './common.css'; // 외부에서 작성한 css 파일을 import 에서 작성하는 방식 
//리셋 css 같은 파일은 최상위 컴포넌트에 연결해주면 된다. (index.jsx에 보통 연결)

export default function BasicCss(){
  const text ={
    color: 'pink',
    fontSize:'30px'
  }
  return (
    <div className='container'>
      <h1 className='title'>리액트 기본 css 작성 방식 </h1>
      <p style={{fontSize:'40px', backgroundColor:'coral'}}>
        태그에 직접 작성하는 인라인 스타일 방식 
      </p>
      <p style={text}>변수로 선언해서, 객체로 전달하는 방식 </p>
      <Button/>
      <Button02/>
    </div>
  )
}
/*
인라인 스타일의 장단점. 
장점 :  하나의 파일에서 관리할 수 있다. 
단점 : 코드가 복잡해질 수록, 가독성이 엄청 떨어진다. 
인라인 스타일에서는 :  :hover , :focus 미디어 쿼리 와 같은 가상요소를 사용 할 수 없다. 
css 파일을 따로 작성해야 하기 때문에 불편하다. 

module.css
클래스 네임을 고유한 이름으로 변경시켜서, classname의 중첩으로 충돌이 일어나지 않게 만들어서 
관리하는 것이 목적
*/