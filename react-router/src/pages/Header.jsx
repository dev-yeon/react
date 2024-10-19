import { Link } from 'react-router-dom';
export default function Header(){
  return (
    <>
      <h1>Header</h1>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/products'>Product</Link></li>
          <li><Link to='/itemList'>ItemList</Link></li>
          <li><Link to='/login'>로그인</Link></li>
        </ul>
        <a href='https://www.naver.com'>네이버</a>
        {/* 리액트에서도 a태그를 사용 할 수 있지만, 외부링크를 참조할 때에만 사용한다.  */}
      </nav>
    </>
  )
}