import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BasicCss from './basicCss/BasicCss';
import StyledCom from './styledComponents/StyledCom';
import GlobalStyle from './styledComponents/GlobalStyle';
import Scss from './scss/Scss';
import TailWind from './tailwind/TailWind';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GlobalStyle/>
  {/* <App /> */}
  {/* <BasicCss/> */}
  {/* <StyledCom/> */}
  {/* <Scss/> */}
  <TailWind/> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
