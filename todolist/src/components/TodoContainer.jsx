import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default function TodoContainer(){

  // 리스트를 빈 목록으로 초기화 
  const [list, setList] = useState([]) // 리스트는 여러개를 받아오기 때문에, 빈 배열로 초기화를 해주면 된다.
  const [filter, setFilter] = useState('All');
  const [filterList, setFilterList] =useState(list) 

  useEffect(()=> {
    listFilter();

  }, [list, filter])
  // 리스트 추가 함수
  const addList = (listName)=>{
    const newList = {id: Date.now(), name : listName, completed: false};
    setList([...list, newList ]) // 위에서 받아온 요소에 따라서 계속 리스트를 만들어주는 역할 
    // console.log(newList);
  }
   // 완료 여부 토글 함수
  const toggleComplete = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }
    // 리스트 항목 삭제 함수
  const listFilter = () => {
    switch(filter){
      case 'Active': 
        setFilterList(list.filter((item)=> !item.completed));
        break;
      case 'Complited': 
        setFilterList(list.filter((item)=> item.completed));
        break;
      default:
        setFilterList(list)
    }
  };
  const handleFilterChange = (newFilter)=>{
    setFilter(newFilter);
  }
  const listCountText = () => {
    const count = filterList.length; 
    return  count === 1 ? '1 item':`${count} items.` 
  }

  const handleDelete = (id) => {
    setList(list.filter((el)=> el.id !== id))
  }

  return (
    <Container>
      <Header>
        <Title>TodoList</Title>
          <DateText>{new Date().toDateString()}</DateText>
          <Datalist>
            <ListCount>{listCountText()}</ListCount>
            <Filters>
              {['All', 'Active','Completed'].map((type)=>(
                <FilterBtn 
                  key = {type} 
                  active={filter === type}
                  onClick={()=>handleFilterChange(type)}
                >
                  {type}
                </FilterBtn>
              ))}
            </Filters>
          </Datalist>
      </Header>
      <ListContainer>
        {filterList.length === 0 ? (
          <p>TodoList가 없습니다.</p>
        ): (
          list.map((el)=>(
            <TodoList 
              key ={el.id} 
              list = {el}
              onToggleComplete={toggleComplete}
              />
          ))
        )}
      </ListContainer>
      <TodoForm onAddList ={addList}/>
    </Container> //container 
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 20px;
  padding: 24px;
  box-sizing: border-box; /* 수정된 부분 */
  box-shadow: 0px 20px 60px rgba(0,0,0,0.5);
`

const Header = styled.header `
  /* text-align: center; */
`

const Title = styled.h1 `
  font-size: 24px;
  font-weight: bold;
`
const DateText = styled.p `
  font-size: 14px;
  color:rgba(0,0,0,0.6);
`

const ListContainer = styled.div `
  max-height: 60vh;
  overflow: auto;
  p{
    text-align: center;
  }
`
const Datalist = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Filters = styled.div `
  display: flex;
  justify-content: space-around;
`

const FilterBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${ ({active})=> (active ? '#FFF': '#000')};
  background-color: ${({active})=> (active ? '#000' : 'transparent')};
  padding: 6px 12px;
  border-radius:12px;
  font-size: 14px;
  &:hover {
    background-color: #000;
    color: #fff
  }
`
const ListCount = styled.p`
  font-size: 16px;
  color: #666;
`