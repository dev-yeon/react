import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { formatCurrency, updateCart } from '../api/firebase';
import { useState } from 'react';
import { getAuth } from "firebase/auth";
import UseCart from '../context/UseCart';


export default function ProductDetail() {
  const auth = getAuth();
  const user = auth.currentUser;
  const {addItemCart} = UseCart()
  const state = useLocation().state;  /// 어떤 로케이션 안의 스테이트를 전달 
  
  const {id, img, price, size, colors, description, title  } = state;
  
  const setSize = size.split(',').map((opt) => opt.trim());
  const [selected, setSelected] = useState(setSize && setSize[0]);

  const[success, setSuccess] =useState(null) // 장바구니에 

  const selectOpt = (e) =>{
    setSelected(e.target.value)
  }
  // const handleCart = () => {
    
  //   const product = {id , img, title, price, size : selected, quantity : 1}
  //   addItemCart.mutate(product, {
  //     onSuccess : () => {
  //       setSuccess('장바구니에 아이템이 추가 되었습니다.')

  //     }
  //   })
    
  // }
  const handleCart = () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = user.uid;  // 로그인한 사용자의 uid
    console.log(userId);
    const product = {
      id,
      img,
      title,
      price,
      size: selected,
      quantity: 1
    };

    // updateCart 함수 직접 호출하여 userId와 product 전달
    updateCart(userId, product)
      .then(() => {
        setSuccess('장바구니에 아이템이 추가 되었습니다.');
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
    
  }; 
  return (
    <>
      <div className='container'>
        <DetailPage>
          <div className='detailImg'>
            <img src={img} alt={title} className="img" /> 
          </div>
          <div className='detailText'>
            <h3>{title}</h3>
            <p className='price'> 가격 <span>{formatCurrency(price)} 원 </span></p>
            <p className='description'>   {description}  </p>
            <div className='detailOpt'>  
              {/* 리액트에서는 laber에 for 대신에 html for을 사용한다.  */}
              <label className='labelText' htmlFor='sizeSelect'>옵션</label>
              <select id= 'sizeSelect' onChange={selectOpt} >
                {setSize && setSize.map ((opt,idx)=>(
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className='detailBtns'>
            <button className='cartBtn' onClick={() => handleCart() }>장바구니</button>
            <button className='buyBtn'>구매하기</button>
          </div>
            { success && <p>{success}</p>}
          </div>
        
        </DetailPage>

      </div>
    </>
  )
}

const DetailPage = styled.div`
  width: 100%;
  display: flex;
  gap: 60px;
  .detailImg {
    min-width: 400px;
    .img {
      width: 100%;
      object-fit: cover;
      display: block;
    }
  }  
  .detailText {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    h3 {
      font-size: 40px;
      font-weight: normal;
      border-bottom: solid 1px rgba(0,0,0,0.2);
      padding-bottom: 20px;

    }
    .price {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .detailBtns {
      display: flex;
      gap:12px;
      margin-top: auto;
    }
    .detailBtns button{
      padding:  12px 24px; 
    }
  }
`