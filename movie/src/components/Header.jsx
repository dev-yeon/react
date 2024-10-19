import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiNetflixFill } from "react-icons/ri";
import Navigation from './Navigation';
import Search from './Search';

export default function Header(){
  return(
    <HeaderContainer>
      <Logo>
        <Link to = '/'>
          <RiNetflixFill />
        </Link>
      </Logo>
      <Navigation/>
      <HeaderRight>
        <Search/>
      </HeaderRight>
    </HeaderContainer>
  )
}

const HeaderContainer =  styled.header`
  position: fixed;
  top:0;
  left: 0;
  display: flex;
  padding: 12px 36px;
  box-sizing: border-box ;
  background: black;
  width: 100%;
  z-index: 99;
  gap:60px;
`
const Logo = styled.h1`
  a{
    // link 태그는 html 에서 컴파일링될 때에는 a태그로 인식함 
    display: flex;
    align-items: center;
    font-size: 30px;
    color: red;
  }
`

const HeaderRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`