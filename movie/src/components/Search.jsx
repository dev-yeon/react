
import styled from 'styled-components';
import { FiSearch, FiX } from "react-icons/fi";
import {motion} from "framer-motion";
import { useEffect, useRef,useState } from 'react';
// framer-motion 
/*
react 에서 사용하는 애니메이션 생성 라이브러리
리액트에 특성상 생명주기를 기반으로 하는 컴포넌트를 불러오는 방식이기 때문에,
애니메이션이 연결될때, 일반적으로 사용하는 css 속성을 기반으로 컨트롤 하게 해 줌. 

사용하는 속성
initial : 초기값
animate :  컴포넌트가 동적인 상태를 통해서 최종적으로 변경될 속성 값 
*/

export default function Search(){
  const [searchOpen, setSearchOpen] = useState(false);
  const [clearBtn, setClearBtn]= useState(false);
  const [keyword, setKeyword]= useState('');
  const [visible, setVisible]= useState(false);
  const searchRef = useRef()
  const inputRef = useRef()
  useEffect(()=>{
    const handleClickOutSide = (event) =>{
      if(searchRef.current && !searchRef.current.contains(event.target) && !keyword){
        setVisible(false);
        setSearchOpen(false)
        //searchRef.current && !searchRef.current.contains(e.target)  
        // 사용자가 searchRef 가 참조하는 요소 외부를 클릭했는지 확인, 
        //!keyword 검색창에 keyword 값이 있는지 확인
        // 위 조건이 모두 만족이 되면 setVisible(false)
      }

    }
          
    document.addEventListener('mousedown', handleClickOutSide)
    return ()=> {
      document.removeEventListener('mousedown', handleClickOutSide)
    }

  }, [keyword])

  /*
  
  mousedown과 click 이벤트 차이
  mousedown은 마우스 버튼이 눌리는 순간을 이벤트로 발생
  click은 마우스 버튼을 눌렀다가 떼는 순간 

  엔터를 치는 시점 
  mousedown 상태에서 엔터를 입력하면 click 이벤트가 발생하기 전에 엔터를 친것으로 인식하므로 
  mousedown 이벤트는 발생했지만, 폼 제출은 안하게 됨
  click 상태는, 엔터를 입력 하게 되면, 이미 click 이벤트가 발생 후 엔터키를 눌렀으므로, 
  폼 제출이 된걸로 인식 

  이벤트 우선순위에 의해서 행동이 결정된 부분 
  클릭 이벤트는 mousedown 과 mouseup 모두 완료 된 후 발생을 하게 됨. 
  다음 이벤트 동작이 가능 . 
  mousedown만 했을 경우 다음 이벤트를 진행하지 못함. 
  
  e.preventDefault 추가하면 될듯. 

  */
  
  const handleClickEvent =()=>{
    setSearchOpen((open)=>!open) 
    setTimeout(()=>{
      if(inputRef.current){
        inputRef.current.focus()
      }
    }, 300)
    }
  const hadleInputChange = (e) =>{
    const value = e.target.value
    setKeyword(value);
    setClearBtn(value !== '')
    //value !== '' 
    // 인풋창의 값이 비어있지 않다면, value !== '', true로 설정해서 ClearBtn 활성
  }

  const handleClearEvent = (e)=>{
    e.preventDefault();
    setClearBtn(false);
    setKeyword('');
  }
  
  return (

    <SearchForm visible={`${searchOpen}` } ref={searchRef}>
      <motion.div
        initial = {{width: 50}}
        animate =  {{width: searchOpen ? 300 :  50,
          borderColor : `rgba(255,255,255,${searchOpen ? '1': '0'}})`,
          transition : { duration: 0.5 }
        }}
        
      >

        <button type="button" className='search-btn' onClick={handleClickEvent}>
          <FiSearch />
        </button>
        <motion.input type='text'
          initial = {{width:0}}
          animate = {{width : searchOpen ?  250 : 0}}
          transition={{duration : 0.3}}
          placeholder='검색어를 입력하세요.'
          value={keyword}
          onChange={hadleInputChange}
          // onKeyDown={hadleInputKeyDown}
        />
        {clearBtn && (
          <button className='clear-btn' onClick={handleClearEvent}>
            <FiX />
          </button>
        )}

        
      </motion.div>
    </SearchForm>

  )
}

const SearchForm = styled.form`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  
  div {
    border : 1px solid transparent;
    padding: 2px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
  }
  .search-btn {
    color:#fff;
    font-size: 24px;
    display: flex;
    align-items: center;

  }
  input[type="text"] {
    padding: 5px;
    color:#fff;
  }

  .clear-btn {
    color: #fff;
    font-size: 24px;
    display: flex;
    align-items: center;
  }
  
`