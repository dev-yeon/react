import { createContext, useContext, useEffect, useState } from 'react';
import { googleLogin, googleLogOut, onUserState } from '../api/firebase';

const AuthContext = createContext();
// context 컴포넌트 간에 어떠한 값을 공유 할 수 있게 해주는 hook,
// 변수에 새로운 context 를 초기화 
// createContext() = 컨텍스트를 사용하기 위해서 생성 

export   function AuthContextProvider({children}){
  const [user, setUser] = useState();
  const [unSubScribe, setUnSubScribe] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=> {
    /**
      페이지를 새로 고침하는 경우 페이지에서 사용자의 정보가 넘어오기 전에 사용자 
      인증을 끝내기 때문에, protectRouter로 인해 에러가 나오는 경우가 생김,
      사용자 정보를 모두 받아오기 전까지 protectRouter을 실행하지 못하게 
      지연하는 방법으로 접근 

     */

      const storeUser = sessionStorage.getItem(user);
      // sessionStorage = 웹 브라우저에서 제공하는 저장소 페이지가 유지되는 동안 데이터를 저장하는 용도 
      // 현재 열린 창을 닫으면 데이터는 삭제된다. (휘발성)
      // 쿠키같은 경우 정보를 일부 남기나, 이건 다 삭제를 한다. 임시 데이터를 저장하는 경우에 사용 한다. 
      // 다크모드 같은 경우는 세션 스토리지가 아닌 로컬스토리지에 저장해서 유지 
      if (storeUser){
        setUser(JSON.parse(storeUser))
        // JSON.parse 는 Json.stringfy 로 저장된 데이터를 자바스크립트 객체로 변환 
        // 
      }
      // 로그인, 로그아웃을 관리하는 함수 
      // const userChange = (newUser) =>{
      //   setUser(newUser) 
      //   setIsLoading(false);

      //   if(newUser){
      //       sessionStorage.setItem('user', JSON.stringify(newUser));
      //     //로그인 한 경우
      //     // 로그인을 했기 때문에 새로 들어온 정보를 user에 저장 
      //   } else {
      //     // 로그 아웃 한 경우 
      //     sessionStorage.removeItem('user')
      //     // 로그아웃을 했기 때문에, 기존의 user에 있던 모든 정보를 삭제 
      //   } 
      //   const unSubScribeFunc = onUserState(userChange)
      //   setUnSubScribe(()=>unSubScribeFunc);
      //   return ()=> {
      //     if(unSubScribeFunc) {
      //       unSubScribeFunc()
      //     }
      //   }
      //   // 
      // }

      const unSubScribeFunc =  onUserState((newUser)=> {
        setUser(newUser)
        setIsLoading(false)

        if(newUser){
          sessionStorage.setItem('user', JSON.stringify(newUser))
        } else {
          sessionStorage.removeItem('user')
        }
      })

      return () => {
        if(unSubScribeFunc) {
          unSubScribeFunc();
        }
      }

  },[]) //useEffect

  return (
    <AuthContext.Provider value = {{user, googleLogin, googleLogOut, isLoading, uid:user && user.uid}}>
      {children}
    </AuthContext.Provider>
    // provider 래핑되어있는 하위에 있는 모든 컴포넌트에게 authContext에 접근 할 수 있도록 해서 
    // 데이터를 공유 할 수 있게 하는 역할 
    
  );
}

export function useAuthContext() {
  return useContext(AuthContext)
}
// 위의 함수들을 단순화 시켜서 다른 곳에서 참조 할 수 있도록 context를 export 

/*
 newuser 의 로그인 상태를 감지하는 코드는 onUserState가 감지한다.
 onUserState는 사용자가 로그인 하거나, 로그아웃 할 때마다 실행되는 함수이기 때문에, 
 매번 로그인 상태가 바뀔때마다 userChange 를 호출해서 newUser의 값을 update 하는 방식이다. 
*/