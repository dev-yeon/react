import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function Navigation(){
  return (
    <Nav>
      <ul>
        <li><Link to='/'>홈</Link></li>
        <li><Link to='/'>시리즈</Link></li>
        <li><Link to='/'>영화</Link></li>
        <li><Link to='/'>NEW! 요즘 대세 콘텐츠</Link></li>
        <li><Link to='/'>내가 찜한 리스트</Link></li>
        <li><Link to='/'>언어별로 찾아보기</Link></li>
      </ul>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    gap: 30px;
    align-items: center;
    li {
      a{
        color: rgba(255,255,255,1);
        transition: 300ms;
        font-size: 14px;
        &:hover{
          color :rgba(255,255,255,0.4)
        }
      }
    }
  }
`