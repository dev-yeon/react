import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  

export default function Nav() {
  const {categoryList} = useContext(CategoryContext);

  return (
    <MainMenu>
      <ul>
        {categoryList.map((el,idx)=> (
          <li key={idx}>
            <Link to ={`/product/${el}`}>{el}</Link>
          </li>
        ))}
      </ul>
    </MainMenu>
  )
  
}
const MainMenu = styled.nav`
  
`