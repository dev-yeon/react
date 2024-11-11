
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {get, ref, getDatabase, set, remove, update} from "firebase/database";

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

// 브라우저를 닫으면 로그인이 유지 되지 않도록 설정 
setPersistence(auth , browserSessionPersistence);
/*
firebase의 기본 설정은 브라우저를 닫아도 세션에 로그인 정보를 저장해서
브라우저를 다시 실행하면 로그인이 되어있다. 
브라우저를 닫을때 로그아웃이 되도록 설정 하려면,
setPersistence 추가해서 setPersistence(auth , browserSessionPersistence); 
를 사용해서 브라우저가 닫힐때 로그인 정보가 없어 지도록 해줘야 한다. 


*/

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
      const filterProducts = allProducts.filter((product)=> product.category === category)
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

// 이메일 회원 가입
export async function joinEmail(email, password, name, ) {
  const auth = getAuth() // 저장할 사용자 인증 폼을 불러옴 
  try {
    // 이메일과 비밀번호로 사용자 생성
    const userData = await createUserWithEmailAndPassword(auth, email, password);
    //createUserWithEmailAndPassword 는 사용자 정보 중에서 이메일과 패스워드만  

    // 추가 사용자 정보 저장
    const user = userData.user;
    await updateProfile(user, {
      displayName: name
    });
    
    // 로그아웃
    await signOut(auth);

    return { success: true };
  } catch (error) {
    console.error("회원가입 중 오류가 발생했습니다:", error);
    return { success: false, error };
  }
}

//이메일 로그인 

export async function loginEmail(email, password) {
  try {
    const userData = await signInWithEmailAndPassword(auth, email,password)
    return userData.user; 
  } catch(error) {
    console.error(error);
  }
}


// 검색 
export async function SearchProducts(query) {

  try {
    const dbRef = ref(database,  `products`);
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
      const data = snapshot.val();
      const allProducts = Object.values(data);

      if(allProducts.length === 0 ){
        return []
      }
      // 제목을 검색할거임. 
      const matchProducts = allProducts.filter((product)=>{
        const itemTitle = product.title; 
        return itemTitle.includes(query);
      })
      return matchProducts
    } else {
      return []
    }
    } catch(error) {
      console.error(error)
  } 
}

// 데이터 베이스에 게시글 업로드 

export async function addBoard(user, date, title, text) {
  const id = uuid();
  const postData = {
    id, 
    user,
    date,
    title,
    text 
  }

  return set(ref(database, `/board/${id}`),postData)
  
}
//게시글 가져오기 
export async function getBoard() {
  return get(ref(database,`board`))
  .then((snapshot)=>{
    if(snapshot.exists()) {
      return Object.values(snapshot.val())
    }
    return []
  })
}

// 게시글에 댓글 저장
export async function addComments(boardId, user, text) {
  const id = uuid();
  
  // // 필요한 정보만 포함하는 객체 생성
  // const userForComment = {
  //   uid: user.uid,
  //   displayName: user.displayName,
  //   email: user.email,
  // };

  return set(ref(database, `/board/${boardId}/comments/${id}`), {
    id,
    user,
    // user: userForComment, // 필요한 정보만 저장
    text,
  });
}


// 게시글 댓글 불러오기 
export async function getComments(boardId) {
  return get(ref(database, `/board/${boardId}/comments`))
  .then((snapshot)=> {
    if(snapshot.exists()){
      return Object.values(snapshot.val())
    }
    return []
  })
  
}

//  리뷰 글 작성 
export async function  addReview(productId, user, text ,timestamp) {
  const reviewId = uuid()
  const reviewRef = ref(database,  `review/${productId}/${reviewId}`);
  try {
    await set(reviewRef, {
      id: reviewId,
      user: user,
      text: text,
      timestamp : timestamp
    }) 
    return reviewId
  } catch (error){
    console.error(error)
  }
}

//리뷰 글 불러오기 

export async function getReview(productId) {
  const reviewRef = ref(database, `review/${productId}`)

  try {
    const snapshot = await get(reviewRef);
    if(snapshot.exists()) {
      return Object.values(snapshot.val())
    } else {
      return []
    }
  } catch(error) {
    console.error(error)
  }
}

// 좋아요 추가 

export async function addLike(productId ,userId) {

  const likeRef = ref(database, `like/${productId}`)
  //const userRef = ref(database, `like/${productId}/user/${userId}`);
  try {
    const snapshot = await get(likeRef);
    let currentLikes = snapshot.exists() ? snapshot.val().count : 0 
    currentLikes +=1 
    await update(likeRef, {
      count : currentLikes,
      [`user/${userId}`] : true, 
    });
      } catch(eroror){
        console.error(eroror)
      }   
}
// 좋아요 취소하기 
export async function removeLike(productId, userId) {
  const likeRef = ref(database, `like/${productId}`)
  const userRef = ref(database, `like/${productId}/user/${userId}`)
  try {
      const snapshot = await get(likeRef);
      let currentLikes = snapshot.exists() ? snapshot.val().count : 0; 
      currentLikes = currentLikes > 0 ? currentLikes -1 : 0; 
      await update(likeRef, {
        count : currentLikes,
        [`user/${userId}`] : false, 
    });
    await remove(userRef);
      } catch(eroror){
        console.error(eroror)
      }   
}

// 사용자가 좋아요를 했는지 안했는지 여부 확인
export async function hasLike(productId, userId) {
  const userRef = ref(database , `like/${productId}/user/${userId}`)
  try {
    const snapshot = await get(userRef);
    return snapshot.exists();
  } catch(error) {
    console.error(error)
  }
}


// 좋아요 가져오기 

export async function getLike(productId) {
  const likeRef = ref(database, `like/${productId}`)
  try {
    const snapshot = await get(likeRef);
    if (snapshot.exists()){
      return snapshot.val()
    }else {
      return 0 
    }
  } catch(error) {
    console.error(error);
    return 0
  }
}

/// 좋아요가 좋은 상품만 출력 

export async function getAllProducts() {

  const productRef = ref(database , 'products')
  try {
    const snapshot = await get(productRef); 
    if(snapshot.exists()) {
      const products = snapshot.val();
      return Object.keys(products).map((key)=>({id:key , ...products[key]}))
    } else {
      return []
    }
  } catch(error) {
  console.error(error)
  return [] 
  }
}

//상품 삭제

export async function  deleteProduct(productId) {
  try {
    const productRef = ref(database, `products/${productId}`);
    await remove(productRef)
    return {success : true};

  } catch (error) {
    console.error('상품 삭제 오류가 생겼습니다.' , error)
    return {error} 
  }
  
}


// 상품 수정 

export async function updateProduct(productId) {
  try {
    const productRef = ref(database, `products/${productId}`)
    await update(productRef)
    return {success : true} 
  } catch(error) {
    console.error('상품수정 오류' , error)
    return {error}
  }
  
}

// 해당 id 의 상품을 가져오기, 
export async function getProductById(productId) {
  try { 
    const productRef = ref(database,  `products/${productId}`);
    const snapshot = await get(productRef)
    if (snapshot.exists()) {
      return snapshot.val()
    }else {
      throw new Error('해당 제품이 존재하지 않습니다. ')
    }
  } catch (error) {
    console.error('제품 가져오기 오류.',error);
    return null
  }
  
}