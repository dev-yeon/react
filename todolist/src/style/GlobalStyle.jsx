

import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`


  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: "Jua", sans-serif;
  font-weight: 400;
  font-style: normal;
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%); 
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
export default GlobalStyle;