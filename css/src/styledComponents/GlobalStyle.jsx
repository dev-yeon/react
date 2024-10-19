//스타일 컴포넌트로 전역스타일(reset) 설정하는 방법
/*
globalstyle 로 선언된 컴포넌트는 한번만 사용이 되어야 하기 때문에
최상위 구조에서 한번만 선언한다. 대체적으로 index.jsx 파일을 기준으로 한다. 
*/

import { createGlobalStyle } from 'styled-components';
/*
GlobalStyle 로 선언된 컴포넌트는 한번만 사용이 되어야 하기 때문에
최상위 구조에서 한번만 선언한다. 대체적으로 index.jsx 파일을 기준으로 한다. 
createGlobalStyle  사용시 전역 스타일을 너무 많이 선언해버리면 오버라이딩 문제가 생긴다. 
오버라이딩 (프로그래밍에서 상속 관계에 있는 클래스들 사이에서 발생하며, 다른 클래스 로부터 
값을 상속 받았을 때, 상속받은 매서드를 자신의 환경에 맞게 재정의 하는 행위)

css 스타일에서는 스타일을 다른 스타일로 덮어 씌워지는 행위를 말함 
*/
const GlobalStyle = createGlobalStyle`
  /* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
   margin: 0;
   padding: 0;
   border: 0;
   font-size: 100%;
   /* font: inherit; */
   vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
   display: block;
}
body {
   line-height: 1;
}
ol, ul {
   list-style: none;
}
blockquote, q {
   quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
   content: '';
   content: none;
}
table {
   border-collapse: collapse;
   border-spacing: 0;
}
a{
   text-decoration: none;
}

img{
   display: block;
   width: 100%;
}
`

export default GlobalStyle 
// 외부에서 컴포넌트를 참조하기 때문에 ,
