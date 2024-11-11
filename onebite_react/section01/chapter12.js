// 1. 함수 표현식 
function funcA() {
  // console.log("funcA"); // 함수 선언문을 사용해 함수를 만듦 
}
let varA = funcA; 
varA();

let varB = function () { // 익명함수 
  // console.log("funcB");
};

varB();

// 함수 표현식으로 만들면 호이스팅이 되지 않음. 
// 콜백함수 등등에서 아주 유용하게 쓰일 수 있다. 

// 2. 화살표 함수 

// let varC =  () => {
//   return 1;
// }
// console.log(varC());


let varC = (value) => {value + 1}; 

console.log(varC(10));
