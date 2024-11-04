import { useEffect, useState } from 'react'
import { SearchProducts } from '../api/firebase'
import styled from 'styled-components';
import DetailPageEvent from '../components/DetailPageEvent';


export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(()=> {
    const fetchProducts = async () => {
      if(query.trim() === '') {
        setResults([])
      } else {
        try {
          const txt = await SearchProducts(query);
          setResults(txt)
        } catch (error){
          console.error(error)
        }
      }
    }
    fetchProducts()
  },[query])
  
  const handleSearchEvent = (e) =>{
    e.preventDefault();
    setQuery(e.target.value.toLowerCase())// 입력한 값을 소문자로 변환
  }
  
  return (
    <div className='container'>
      <input type='text'  value={query} onChange={handleSearchEvent}/>
        <ul className="productList">
            {results.map((el)=> (
              <li>
                <DetailPageEvent key = {el.id} product={el} />
              </li>
            ))}
        </ul> 
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0; /* 배경색 추가 */
  min-height: 100vh; /* 화면 전체 높이 */
  position: relative;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 2px solid #4285f4; /* 더 두꺼운 테두리 */
  border-radius: 5px;
  font-size: 16px;
  background-color: #f9f9f9; /* 연한 회색 배경 */
  color: #333;
  z-index: 10;

  &:focus {
    outline: none;
    border-color: #357ae8; /* 포커스 시 테두리 색상 */
  }
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
`;

const ProductItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
  background-color: #fff; /* 각 항목의 배경을 흰색으로 */
`;