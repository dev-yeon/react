import UseCart from '../context/UseCart'


export default function CartItem({product,index}){
  const {addItemCart, removeCart} = UseCart()

  const handleItemAdd = () => {
    addItemCart.mutate({...product, quantity : product.quantity + 1})
  }
  const handleItemMinus = () => {
    if(product.quantity < 2 ){
      alert('상품갯수는 1 보다 더 작을 수 없습니다.')
      return
    }
    addItemCart.mutate({...product, quantity : product.quantity - 1})
  }
  const handleItemDelete = ()=> {
    removeCart.mutate(product.id)

  }
  return (
    <li>
      <p>{index}</p>
      <img src={product.img} alt = {product.title}/>
      <p>{product.title}</p>
      <p>{product.size}</p>
      <p>{product.price}</p>
      <div className="quantityWrap">
        <p>수량 : {product.quantity}</p>
          <button onClick={handleItemAdd}>+</button>
          <button onClick={handleItemMinus}>-</button>
      </div>
      <button onClick={()=>handleItemDelete(product.id)}>삭제</button>

    </li>
  )
}