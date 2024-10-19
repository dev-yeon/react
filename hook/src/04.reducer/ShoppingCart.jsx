import { useReducer } from 'react'
import { CartReducer, init } from './CartReducer'
export default function ShoppingCart(){
  const item = [
    {id :1, name: 'item1', price: 5000},
    {id :2, name: 'item2', price: 59000},
    {id :3, name: 'item3', price: 59000},
    {id :4, name: 'item4', price: 57000},
    {id :5, name: 'item5', price: 543000},
    {id :6, name: 'item6', price: 51000},
    {id :7, name: 'item7', price: 1000},
    {id :8, name: 'item8', price: 3000},
    {id :9, name: 'item9', price: 5000},
    {id :10, name: 'item10', price: 6000},

  ]
  const [state, dispatch] = useReducer(CartReducer,init);

  const addItemCart = (product) =>{
    dispatch ({type : 'add-item', pay: product});
  }

  const removeItemCart = (product)=>{
    dispatch ({type : 'remove-item', pay: product});
  }

  const clearCart =()=>{
    dispatch({type : 'clear-cart'});
  }

  return(
    <>
    <h1>아이템 리스트</h1>
    {item.map((el)=>(
      <li key ={el.id}>
        <p>{el.name}</p>
        <p>{el.price}</p>
        <button onClick={()=>addItemCart(el)}>장바구니 추가</button>
        <button onClick={()=>removeItemCart(el)}>장바구니 삭제</button>
      </li>
    ))}
    <h1>카트 리스트</h1>
    <ul>
      {state.items.map((el)=> (
        <li key={el.id}>
          <p>{el.name} : {el.price}</p>
        </li>
      ))}
    </ul>
    <p>total item : {state.totalItems}</p>
    <p>total price : {state.totalPrice}</p>
    <button onClick={clearCart}>장바구니 모두 비우기</button>
    </>
  )
}