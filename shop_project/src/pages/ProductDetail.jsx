import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { addLike, addlike, formatCurrency, getLike, hasLike, removeLike, updateCart } from '../api/firebase';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import UseCart from '../context/UseCart';
import ProductsReview from '../components/ProductsReview';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function ProductDetail() {
  const auth = getAuth();
  const user = auth.currentUser;
  const {addItemCart} = UseCart()
  const state = useLocation().state;  /// 어떤 로케이션 안의 스테이트를 전달 
  
  const {id, img, price, size, colors, description, title  } = state;
  
  const setSize = size.split(',').map((opt) => opt.trim());
  const [selected, setSelected] = useState(setSize && setSize[0]);

  const [success, setSuccess] = useState(null) // 장바구니에 아이템 전송여부 
  
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(()=> {
     // 초기 좋아요 개수 가져오기
    getLike(id).then((likeData)=>{
      if(likeData && likeData.count !== undefined){
      setLikes(likeData.count)
    }
    }) 
    .catch((error)=>{
      console.error(error)
    });
    if (user) {
      hasLike(id, user.uid)
        .then((liked) => setLiked(liked))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, user]);

  const selectOpt = (e) =>{
    setSelected(e.target.value)
  }
 
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
    
  } 
  const handleLike = async() => {
    try  {
      if(liked) {
        // 좋아요를 눌렀다면, 좋아요 취소 
        await removeLike(id, user.uid)
        setLikes((prev)=> prev -1) 
        setLiked(false);
      }else {
        await addLike(id, user.uid)
        setLikes((prev)=> prev +1 )
        setLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
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
            <button className='likeBtn' onClick={handleLike}>
              {liked ? <FaHeart /> : <CiHeart /> }
              <span>{likes} like</span>
               </button>
          </div>
            { success && <p>{success}</p>}
          </div>
        
        </DetailPage>

      </div>
      <ProductsReview productId={id} />
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