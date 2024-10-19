import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import State from './state/State';
import State02 from './state/State02';
import Effect from './02.effect/Effect';
import EffectEx from './02.effect/EffectEx';
import Member from './02.effect/Member';
import Event from './03.event/Event';
import Reducer from './04.reducer/Reducer';
import ShoppingCart from './04.reducer/ShoppingCart';
import Ref from './05.useRef/Ref';
import Game from './05.useRef/Game';
import Darkmode from './06.context/Darkmode';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <State/> */}
    {/* <State02/> */}
    {/* <Effect/> */}
    {/* <EffectEx/> */}
    {/* <Member/> */}
    {/* <Event/> */}
    {/* <Reducer/> */}
    {/* <ShoppingCart/> */}
    {/* <Ref/> */}
    {/* <Game/> */}
    <Darkmode/>
    </React.StrictMode>
);
// cd "/Users/yeon/Library/Mobile Documents/com~apple~CloudDocs/react/hook"
// yarn start
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
