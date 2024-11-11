
// 함수 
function getArea(width, height) {
  // width, height = 매개변수 
  // let width =  10;
  // let height = 20;
  function another() { // 중첩 함수 
    console.log('another');
  }
  another();
  let area = width * height;
  return area; 
  //반환 값 ( 함수 호출의 결과 값 )
}

let area1 = getArea(10, 20);
console.log(area1);

let area2 = getArea(30, 20);
console.log(area2);

getArea(120,200);
// 10, 20은 인수 

// 함수의 호출보다 선언을 위에 놓아도 정상적으로 실행
// 호이스팅 -> 끌어올리다 라는 뜻 
// 선언문을 호출문보다 아래 두어도 ㄱㅊ하다! 