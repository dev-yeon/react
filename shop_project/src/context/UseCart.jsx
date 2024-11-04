import { deleteCart, getCart, updateCart } from '../api/firebase';
import { useAuthContext } from "./AuthContext";
// import { useQueryClient } from "react-query"; // Import useQueryClient from react-query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Import useMutation
export default function UseCart(){
  const {uid} = useAuthContext();
  //usequeryClient = 리액트에서 데이터를 가져오고 업데이트 하는 라이브러리 
  const queryClient =  useQueryClient()

  // 장바구니 아이템의 경우 사용자가 아이템의 목록을 삭제하거나 수정할 수도 있기 때문에 
  // 업데이트 내역을 상시로 갱신 해 줄 수 있는 useQuery 로 받아와야 한다. 

  const cartInfo = useQuery({
    // cart의 데이터를 가져오는 비동기 쿼리 설정 
    queryKey : ['cart', uid || ''], // 쿼리를 식별해주는 키
    queryFn : () => getCart(uid),
    enabled : !!uid // 쿼리를 할성화 되어야 하는 조건 (!!) 
    /**
     * 
     * uid 대신 !!uid 로 하는 경우,
     * uid 가 없는 경우 null 이나 undefiend 를 출력한다. 
     * !!uid 를 사용하면 uid가 있는 경우(undefined, null, 빈 공백을 제외한 ...등등 수많은 경우를 제외하고 True, False로 , 나머지는 모두 False로 변환해서 상태 여부를 논리 값으로 정확하게 판단해주기 위함이다. )
     */
  })

  const addItemCart = useMutation({
    mutationFn : (product) => updateCart(uid, product),
    onSuccess : ()=>{
      queryClient.invalidateQueries(['cart', uid])
      //상태값을 최신으로갱신 (쿠키값을 무효화시켜 상품의 정보를 최신으로 업데이트 )

    }
  })//usemutationFn 장바구니에 상품을 추가하는 업데이트 작업

  const removeCart = useMutation({
    mutationFn : (id) => deleteCart(uid, id) ,
    onSuccess:() => {
      queryClient.invalidateQueries(['cart', uid])
    }
  })
  return { cartInfo, addItemCart, removeCart }
}
