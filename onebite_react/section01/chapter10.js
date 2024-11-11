for (let idx = 1; idx <= 10; idx++) {
  if (idx % 2 === 0) {
    continue;
  }
  console.log(idx);

  if (idx >= 5) {
    break;
  }
}


// for (초기식; 조건식; 증감식) {
//  console.log("반복")
// }

// 초기식- 반복문에서 쓰일 변수의 초기화 보통 count 변수
// 조건식 :  반복문이 언제까지 반복할건지 적는 식 
// 참 -> 반복, 거짓 -> 반복문 종료 