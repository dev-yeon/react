import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getProductById, getProducts } from '../api/firebase';
import UploadProduct from './UploadProduct';


export default function ProductEdit () {
  const {id} = useParams() // url 에 있는 상품 id 를 받아오기 
  // console.log(id);
  const [product , setProduct] = useState(null);

  useEffect(()=> {
    getProductById(id).then((data)=>{ 
      setProduct(data)
    })

  },[id])
  console.log(product)
  // const [formData, setFormData] = useState({
  //   title:'',
  //   price : '',
  //   size: '',
  //   category : '',
  //   description: '',
  //   colors: []
  // })

  // useEffect (()=>{ 
  //   getProducts(id).then(data => {
  //     setProduct(data)
  //     setFormData ({
  //       title: data.title || '',
  //       price : data.price || '',
  //       size: data.size || '',
  //       category : data.category || '',
  //       description: data.description || '',
  //       colors: data.colors || []
  //     })
  //   })
  //   //fetchProduct(); // useEffect 내에서 비동기 함수 호출
  // }, [id]); // 의존성 배열에 id 추가하여 id 변경 시만 실행
  // console.log(formData);
  // const handleChange = (e) => {
  //   const {name, value} = e.target; 
  //   setFormData(prev => ({...prev ,[name] : value}))
  // }
  // console.log(formData)
  return (
    // product && (
    //   <UploadProduct initialProduct ={product} isEdit = {true} onSave ={handleSave}/>
    // )
    // <div className='container'>
    //   <h1>상품수정 페이지</h1>
    //   <form>
    //     <input 
    //       type='text'
    //       name= 'title'
    //       value={formData.title}
    //       onChange={handleChange}
    //       placeholder='상품이름을 입력 하세요.' 
    //     />
    //   </form>
    // </div>
  <></>
  )
}