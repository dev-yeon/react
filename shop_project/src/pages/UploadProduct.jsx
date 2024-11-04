import { useContext, useRef, useState} from 'react';

import { CategoryContext } from '../context/CategoryContext';
import styled from 'styled-components';
import { uploadImg } from '../api/imgUpload';
import { addProducts } from '../api/firebase';

export default function UploadProduct (){
  const [file, setFile] = useState(null) // 파일 업로드 
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const {categoryList} =useContext(CategoryContext);
  // console.log(categoryList)
  const fileRef = useRef();

  const colors = [
    '#ff0000', '#ff9500','#ffef00','#7dff00', '#00ffef',
    '#0034ff', '#ab00ff', 'ff00ca','#000000', '#ffffff'
  ]
  const [product, setProduct] = useState ({
    title:'',
    price:'',
    size: '', 
    category: '',
    colors:[],
    description: '',

  })// 모든 상품의 상태를 빈 문자열로 초기화 
  // 업로드 함수 
  const productInfoChange = (e)=> {
    const {name, value, files} = e.target;
    if(name === 'file' && files && files[0]){
      setFile(files[0])
    } else {
      setProduct((prev)=>({...prev,[name]:value}))
    }
  }
  // 컬러 지정 
  const colorPicker = (color)=> {
    setProduct((prev)=>({
      ...prev, colors : prev.colors.includes(color) ?
        prev.colors : [...prev.colors, color]
    }))
  }
  // 컬러 삭제 
  const removeColor = (colorRemove) => {
    setProduct((prev)=>
      ({...prev, colors : prev.colors.filter(color => color !== colorRemove)}))
  }
  // handleUpload 

  const handleUpload = async (e)=> {
    e.preventDefault();
    try {
      const url = await uploadImg(file);
      await addProducts(product,url)
      setSuccess('업로드가 완료 되었습니다.')
      setTimeout(()=> {
        setSuccess(null)
      },2000)
      setFile(null)
      setProduct({
        title:'',
        price:'',
        size:'',
        category:'',
        colors: [],
        description:'',
        

      }) 
      if(fileRef.current){
        fileRef.current.value = ''
      }
    } catch(error) {
      console.error(error)
      setError('업로드에 실패 했습니다.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Container>
      <h1>상품업로드</h1>
      <FormContainer>
        <div className='imgUploadWrap'>
          {file && (
            <img src ={URL.createObjectURL(file)}/>
          )}
          {/* <img src ={URL.createObjectURL(file)} /> */}
          {/* createObjectURL = url 주소를 string 형태로 변환 */}

        </div>
        <form onSubmit={handleUpload}>
          <input 
            type='file'
            name='file'
            accept='image/*'
            onChange={productInfoChange}
            ref = {fileRef}
          />
          {/*이미지 업로드 */} 
          <input 
            type='text' 
            name='title' 
            placeholder='상품명을 입력하세요.'
            value={product.title}
            onChange={productInfoChange}
          />
          {/* 상품 제목 */}

          <input 
            type='text' 
            name='price' 
            placeholder='상품가격을 입력하세요.'
            value={product.price}
            onChange={productInfoChange}
          />
          {/* 상품 가격 */}
          <select name='category' value={product.category} onChange={productInfoChange}>
            <option value=''>분류선택</option>
              {categoryList.map((el, idx)=>(
                  <option key={idx} value={el}>{el}</option>
                ))}
          </select>
          {/*카테고리 */}

          <input 
            type='text' 
            name="size" 
            placeholder='상품 옵션을 , 로 구분해서 입력하세요.'
            value={product.size}
            onChange={productInfoChange}
          />
          {/* 상품 사이즈 */}
          <ColorChipWrap>
                {colors.map((color, idx)=>(
                  <div className='colorChipItem' key={idx}
                    style={{backgroundColor : color}} 
                    onClick ={()=> colorPicker(color)}
                  />
                ))}
          </ColorChipWrap>

          <ColorSelect>
                {product.colors.map((color,idx)=>(
                  <div key={idx}
                  style={{backgroundColor:color}}
                  >
                    {color}
                    <button onClick={(e)=>{e.preventDefault(); removeColor(color)}}> x </button>
                  </div>
                ))}
          </ColorSelect>
              {/* 상품 색상 */}
          <input 
            type='text' 
            name = 'description' 
            placeholder='상품 설명을 입력 하세요.' 
            value={product.description}
            onChange={productInfoChange}
          />
               {/* 상품 설명 */}
          <button disabled={isLoading} >
            {isLoading ? '업로드 중' : '제품 등록하기'}
          </button>
          
          {success && (
            <p>{success}</p>
          )}
          {error && (
            <p>{error}</p>
          )}

        </form>
      </FormContainer>
    </Container>
  )
}

const Container = styled.div`
  
`

const FormContainer = styled.div`
  max-width: 1200px;
  padding: 30px 0px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  img {
    display: block;
    height: 100%;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    input{
      width: 100%;
      box-sizing: border-box;
      height: 50px;
      border-radius: 4px;
      border-color: rgba(0,0,0,0.2);
      padding: 6px 12px;
    }
  }
`

const ColorChipWrap = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .colorChipItem {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

const ColorSelect = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  div {
    width: 100px;
    height: 30px;
    color : #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`