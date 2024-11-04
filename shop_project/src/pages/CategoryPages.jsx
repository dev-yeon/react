import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryProduct } from '../api/firebase';
import CategoryProductList from '../components/CategoryProductList';
import CategorySlider from '../components/CategorySlider';


export default function CategoryPages() {
  const {category} = useParams()
  const [product, setProduct] = useState([]);
  const [randomImages, setRandomImages] = useState([]);

  useEffect (()=> {
    getCategoryProduct(category)
    .then((product)=>{setProduct(product)})
    .catch((error)=> {
      console.error(error)
    })
  },[category])
  
  useEffect(()=> {
    if( product.length > 0 ) {
      const randomImg = [...product].sort(()=> 0.5 - Math.random())
      console.log(randomImg)
      // 배열을 랜덤하게 섞어주는 정렬 값 
      // sort 매서드는 배열의 요소를 정렬하기 위해서 비교함수를 비교받음. 
      // 이 비교 함수에서는 배열에서 두 요소 a, b를 비교해서 양수, 음수, 0을 반환 
      // 음수 : (a<b ) a가 b 보다 앞에 위치하게 됨 
      // 양수 : (a>b) b가 a 보다 앞에 위치
      // 0 : 위치를 변경하지 않음. 
      const selectImg = randomImg.slice(0,3).map((el)=>el.img)
      setRandomImages(selectImg)
      console.log(randomImages)
    }
  },[product])
  
  return (
      <>
        <CategorySlider imgs={randomImages} />
        <CategoryProductList category={category} product={product} />
      </>
  )
}