/*
  테일윈드 사용법
  워드 프레스 처럼 별도의 css 파일을 작성해서 관리하지 않고, 적용할 css 가 적용된 클래스명을 찾아서 적용하는 방식 

  단점 

  사용법
  yarn add -D pakage = 패키지 설치 D는 Dev Dependenci의 약자 
  tailwind.config.js 에서 content :   content: ["./src/** /*.{js,jsx,ts,tsx}"], 수정
  글로벌 css 나 최상위 css 파일에 
@tailwind base;
@tailwind components;
@tailwind utilities; 
선언
base 
- 기본 스타일을 포함 (reset 과 같은 기능 )
components 
- 테일윈드에서 제공하는 컴포넌트나 클래스 기반의 스타일을 적용할 수 있게 하는 파일 
utilities 
클래스가 포함된 css 를 불러와서 적용 할 수 있게 해주는 파일 

tailwindcss 홈페이지의 get start부분에 다 있다. 

클래스 생성
tailwind.config.js > theme 안에 작성하는데,
주의 할 점은 theme 안에 바로 작성하게되면, 기본적으로 제공하는 css들이 적용되지가 않는다. 
extends 안에서 작성 을 해야한다.
*/

export default function TailWind(){
  return(
    <>
      <div className="flex bg-gray-50">
        <div className="basis-48 bg-lime-100 text-3xl text-myColor-100 p-72">box</div>
      </div>
    </>
  )
}