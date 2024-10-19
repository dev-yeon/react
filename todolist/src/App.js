import logo from './logo.svg';
import './App.css';
import GlobalStyle from './style/GlobalStyle';
import TodoContainer from './components/TodoContainer';

/*
todolist 
- 상태 업데이트 기능이 들어간다. 
(
목록을 입력하면, 목록 리스트에 추가되는 기능이 있다. 
체크를 하게 되면 완료된 리스트로 분류를 하게 됨. 
삭제 기능도 들어가게 됨. 

useState, useEffect 의 기능 

)

*/
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    <GlobalStyle/>
    <TodoContainer/>
    </>
  );
}

export default App;
