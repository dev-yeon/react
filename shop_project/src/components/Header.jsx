import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled from 'styled-components'
import UserData from './UserData';
import { googleLogOut, onUserState } from '../api/firebase';
import Nav from './Nav';

export default function Header (){
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate('/login')
  }
  const handleLogOut = ()=>{
    googleLogOut().then(setUser);
  }
  useEffect(()=>{
    onUserState((user)=>{
      setUser(user)
    })
  },[])
  return (
    <HeaderContainer>
      <h1>
        <Link to ='/'>logo</Link>
      </h1>
      <Nav />
      <div className='rightMenu'>
          {user && user.isAdmin && 
            <Link to ='/product/upload'>업로드</Link>}
          {user ? (
            <>
              <UserData user={user}/>
              <button className='logoutBtn' onClick={handleLogOut}>logout</button>
            </>
          ) : (
            <button className="loginBtn" onClick={handleLogin}>login</button>
          )}
          <Link to = '/cart'>장바구니</Link>
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  gap: 24px;
  border-bottom: solid 1px rgba(0,0,0,0.3);
  .rightMenu {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
`
