import { useEffect, useState } from 'react';
import { getAllProducts, getLike } from '../api/firebase';
import DetailPageEvent from './DetailPageEvent';

export default function BestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(()=> {
    const fetchProducts = async() => {
      try {
            const allProducts = await getAllProducts();
                 // getLike를 사용해서 likeProducts를 사용할 경우, 하나의 아이템의 호출될 때까지
            //다른 아이템의 호출을 중단 (상품의 수가 많으면 지연시간이 오래걸림.
            // promise.all를 사용하면 동시 호출이 된다. 
            const likeProducts = await Promise.all(
              allProducts.map(async(product)=> {
                const likeData = await getLike(product.id);
                const likes = likeData.count || 0; // count 값이 없을 경우 기본값을 0으로 설정
                return { ...product, likes };
              })
            )
            // 좋아요 수 기준으로 정렬해서 상위 상품만 출력 
            const bestProducts = likeProducts
            .filter((product)=> product.likes > 0 )
            .sort((a,b)=> b.likes - a.likes) //좋아요 기준 내림차순
            .slice(0,5) 
            setProducts(bestProducts)
            } catch(error) {
              console.error(error)
            }
    };
    fetchProducts();
  },[]);

  return ( 
    <div className='container'>
    <h2>인기상품</h2>
    <ul>
      {products.map((el) => (
        <DetailPageEvent key={el.id} product={el} /> 
      ))}
    </ul>
  </div>
  )
}