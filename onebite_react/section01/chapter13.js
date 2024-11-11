//1. 콜백 함수 

// function main(value) {
//   value(); // 전달된 함수를 호출
// }

// main(()=> {
//   console.log('I am sub');
// })

// 콜백 함수의 장점과 활용 예시

// 	1.	비동기 작업
// 콜백 함수는 데이터가 준비되었을 때, 이벤트가 발생했을 때 등 특정 시점에 원하는 작업을 수행하는 데 유용합니다. 예를 들어, 파일을 읽는 작업이 끝나면 그 데이터를 처리하는 함수를 호출할 때 사용됩니다.
// 	2.	동작 재사용성
// main 함수는 어떤 함수든 인수로 전달받아 실행할 수 있기 때문에, 다른 콜백 함수를 전달하면 다양한 동작을 수행할 수 있습니다.

// 예시로 본 콜백 함수

// 이 예시에서 sub은 main 함수가 호출되는 시점에서 실행할 함수를 지정하기 위해 콜백으로 사용되었습니다.

// 2. 콜백 함수의 활용
// function repeat(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(idx); 
//   }
// }
// function repeatDouble(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(idx * 2); 
//   }
// }
// repeat(5);
// repeatDouble(5);

function repeat(count, callback) {
  for (let idx=1; idx <= count; idx++) {
    callback(idx);
  }
}

repeat(5, function(idx) {
  console.log(idx);
})

repeat(5, function(idx) {
  console.log(idx * 2);
})
repeat(5, function(idx) {
  console.log(idx * 3);
})