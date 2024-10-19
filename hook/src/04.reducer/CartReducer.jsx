//CartReducer.jsx
export const init = {
  items : [], //카트에 담긴 상품 목록들 
  totalItems: 0, // 카트에 담긴 총 상품의 갯수 
  totalPrice: 0, // 카트에 담긴 상품들의 총 금액 
}

function findItemIndex (el,idx){
  return el.findIndex((item)=> item.id === idx)
  // 비교했을때 맞으면 

}

export function CartReducer(state, action){
  switch (action.type) {
    case 'add-item' : {
      const currentIndex = findItemIndex(state.items, action.pay.id);
      if(currentIndex >= 0 ){
        // 새 상품이 아니고 기존에 있던게 추가 된 경우. 금액만 증가 시켜 주어야 함. 
        const updateItems = state.items.map((item,idx) => 
          idx === currentIndex ? {...item, quantity : item.quantity + 1 } : item)
        return {
          ...state,
          items : updateItems,
          totalPrice : state.totalPrice + action.pay.price 
        }
      } else {
        // 새 상품일 경우 카트에 추가 
        return {
          state, 
          items: [...state.items, {...action.pay, quantity:1}],
          totalItems : state.totalItems + 1 ,
          totalPrice : state.totalPrice + action.pay.price 
          }
        }
      }
      case 'remove-item': {
        const currentIndex  = findItemIndex(state.items, action.pay.id)
        if(currentIndex === -1) return state
        const removeIndex = state.items[currentIndex]

        if(removeIndex.quantity > 1 ) {
            const updateItems = state.items.map((el, idx)=> 
            idx === currentIndex ? {...el, quantity: el.quantity -1} : el)
            return  {
              ...state, 
              items: updateItems,
              totalPrice : state.totalPrice - removeIndex.price
            }
        } else {
          const updateItems = state.items.filter((_, idx) => idx !== currentIndex )
          // _의 뜻 =  매개변수임.
          /*
          변수의 위치 때문에 사용하지는 않지만, 참조해야 할 때 암묵적으로 사용 하는 변수명 
          현재 코드에서는 아이템의 값은 참조할 필요는 없고 index의 값만 참조하는 것이
          목적이지만, 첫번째 매개변수는 반드시 값을 참조해야 하기 때문에 _로 매개변수를 설정하는 것 
          (_ 로 된 매개변수는 무시하는 코드 )
          */
          return {
            ...state,
            items: updateItems,
            totalItems: state.totalItems -1,
            totalPrice : state.totalPrice - removeIndex.price 
          }
        }   
      }   

      case 'clear-cart' :
        return {
          ...state,
          items: [],
          totalItems : 0,
          totalPrice : 0
        }
      default :
      return state
  }
}