import { createContext, useState } from 'react';
import DarkModeBtn from './DarkModeBtn';

export const ThemeContext = createContext()
export default function Darkmode() {
  const [theme, setTheme] = useState('dark'); // 기본 세팅 값을 다크로 둔다.
  const toggleTheme = ()=> {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }


  return (
    <>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
      {/* provider = Context 로 생성된 객체 안에 포함되는 컴포넌트들을 관리할 태그 */}
      <DarkModeBtn />
      
      </ThemeContext.Provider>
    </>
  )
}
