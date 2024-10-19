import logo from './logo.svg';
import './App.css';
/*
hook 
컴포넌트에서 상태(state)와 생명주기(lifecycle)의 기능을 사용 할 수 있게 하는 요소 
상태 : 컴포넌트의 내부에 있는 특정한 값의 상태 
생명주기 : 컴포넌트가 페이지에 마운트가 되고 언마운트가 되는 과정을 의미 한다.  
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
