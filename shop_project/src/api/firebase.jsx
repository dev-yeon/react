
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {get, ref, getDatabase, set, remove} from "firebase/database";
import {v4 as uuid} from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL : process.env.REACT_APP_FIREBASE_DB_URL
}
/*
process.env = 환경변수 node.js 에 전역 객체 
환경변수 : 실행중인 프로세스에 사용 할 수 있고, 애플리케이션을 구현하는 키- 값으로
이루어진 변수 
외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩 하지 않고, 설정, 
개인정보 같은 민감한 정보 들을 매개변수로 분리해서 관리하는 용도로 사용 .

process = 현재 node.js 의 프로세스의 전역객체로 실행중인 프로세스에 접근해서 정보를
얻어옴 
.env = process 에서 사용 할 수 있는 모든 환경변수를 포함하는 객체 (기본 환경 파일)
*/
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()
const database = getDatabase(app)


// 구글 로그인 자동 로그인 방지 
provider.setCustomParameters({
  prompt : 'select_account'
})
// 구글 로그인 
export async function googleLogin() {
  try {
    const res = await signInWithPopup(auth, provider)
    const user = res.user;
    console.log(user);
    return user;
  } catch(error){
    console.error(error);
  }
}
// 구글 로그 아웃
export async function googleLogOut() {
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error)
  }
}
// 리로드 시에도 로그인 상태 유지 
// export function onUserState(callback) {
//   onAuthStateChanged(auth, (user)=> {
//     const updateUser = user;
//     callback(updateUser); 
//   })
// }
export function onUserState(callback) {
  onAuthStateChanged(auth, async(user) =>{
    if(user){
      try {
        const updateUser = await adminUser(user);
        callback(updateUser)
      }catch(error) {
        console.error(error);
      }
    }
  })
}
//onAuthStateChanged  : 사용자 인증 상태에 변화를 체크하는 훅 


// 관리자 계정 추가 
async function adminUser(user) {

  try {
    const snapshot = await get(ref(database,`admin`))
    if(snapshot.exists()) {
      // snapshot.exists () = snapshot 안에 데이터가 있음을 의미 
      const admins = snapshot.val() // admin 안에 있는 데이터 들을 검색 
      const isAdmin = admins.includes(user.email);
      if (isAdmin) {
        console.log(`관리자 로그인: ${user.email}`);
      }
      // 검색된 admins  에 현재 로그인한 사용자의 이메일이 일치하는 이메일이 있는 지 확인 
      return {...user, isAdmin}
    }
    return user
  } catch(error) {
    console.error(error)
  }
}

export function formatCurrency (item) {
  const number = parseInt(item);
  return number.toLocaleString('ko-KR');
  /*
  ko-KR 한국
  en-US 미국
  ja-JP 일본
  zh-CN 중국
  1,234,456 .. 
  1 234 456
  1.234

  */
}
export async function addProducts(product, img) {
  //uuid 는 식별자를 만들어주는 라이브러리 
  // 숫자와 영문으로 조합된 식별자 코드를 부여하여, 고유값으로 사용하는 라이브러리 
  /* 
  데이터 베이스에 데이터를 저장할때  원시 형태의 값으로 유지시켜서 저장하고, 출력할때에는 
  변환해주는 과정을 넣어주는 것이 일반적이고 가장 안전한 방법으로 보고 있다. 
  우선적으로 변환을 해서 저장을 하게 되면, 지역이 바뀌는 경우 재변환이 필요한 경우가 생긴다. 
  때문에 원시형태로 저장 후 필요할 때마다 방법으로 변환하는 것이 재사용성과 유연성에 더 알맞다. 

  */
  const id = uuid()
  return set(ref(database, `products/${id}`),{
      ...product,
      img,
      id,
  })
}
// database 에 있는 상품들 가져오기 
export async function getProducts() {
  const snapshot = await get(ref(database, 'products'));
  if (snapshot.exists()) {
    return Object.values(snapshot.val())
  } else {
    return []
  }
}
// 카테고리 별로 상품 가져오기 
export async function getCategoryProduct (category) {
  return get(ref(database, 'products')).then((snapshot)=> {
    if (snapshot.exists()){
      const allProducts = Object.values(snapshot.val());
      const filterProducts = allProducts.
        filter((product)=> product.category === category)
      return filterProducts
    }
    return []
  })
}
// 장바구니 목록 가져오기 
export async function getCart(userId) {
  try {
    const snapshot =  await(get(ref(database, `cart/${userId}`)));
    if(snapshot.exists()){
      const item = snapshot.val();
      return Object.values(item)
    } else {
      return []
    }
  }catch (error){
    console.error(error)
  }
}
// 장바구니 업데이트 
export async function updateCart(userId, product) {
  try {
    const cartRef = ref(database, `cart/${userId}/${product.id}`);
    //cart/${userId}/${product.id} 경로로,database 에 생성
    await set(cartRef, product)
    // 경로로 저장 
  } catch (error){
    console.error(error);
  }
}
// 장바구니 목록 삭제하기 

export async function deleteCart(userId, productId) {
  return remove(ref(database, `cart/${userId}/${productId}`))
}