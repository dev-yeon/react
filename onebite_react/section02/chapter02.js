
// function returnFalse(){
//   console.log("False 함수")
//   return false;
// }


// function returnTrue(){
//   console.log("True 함수")
//   return true;
// }

// // console.log(returnTrue() || returnFalse());

// console.log(returnFalse() && returnTrue());

// 단락 평가  활용 사례 
function printName(person) {
  const name = person && person.name;
  console.log(name || "person의 값이 없음");
}
printName(); // 단락평가에 의해 undefined 값이 뜸.
printName({name : "이경연"});// 단락평가에 의해 truthy 한 값이 전달 

