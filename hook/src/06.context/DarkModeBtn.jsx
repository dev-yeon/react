import { useContext } from 'react';
import { ThemeContext } from './Darkmode';
import ChildContainer02 from './ChildContainer02';

export default function DarkModeBtn(){
  const {theme, toggleTheme} = useContext(ThemeContext)
  console.log(theme);
  const darkMode = {
    backgroundColor : theme === 'light' ? 'white' : 'black',
    color :theme === 'light' ? 'black' : 'white'
  }
  return (
    <div style={darkMode}>
      <h1>컬러모드</h1>
      <button onClick={toggleTheme} style={{background : theme === 'light'? 'black': 'white', color: 'gray'}}
      >
        {theme === 'light' ? 'dark로 변경' : 'light로 변경' }

      </button>
      <ChildContainer02/>
    </div>
  )
}