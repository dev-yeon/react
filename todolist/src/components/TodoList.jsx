import styled,{css} from 'styled-components'

export default function TodoList({list, onToggleComplete, onDelete}){
  return (
    <List>
        <ListItem completed={list.completed}>
          <input 
            type='checkbox' 
            checked={list.completed}
            onChange={() => onToggleComplete(list.id)} // 클릭 시 상태 변경  
          />
          {list.name}
        </ListItem>
        <DeleteBtn onClick={()=>onDelete(list.id)}>X</DeleteBtn>
    </List>
  )
}

const List =  styled.div `
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-top: solid 1px #dddddd;
  background-color: rgba(0,0,0,0.1);
  transition: 300ms;
  &:hover {
    background-color:rgba(0,0,0,0.3);
  }
`

const ListItem = styled.span`
  flex:1;
  gap:6px;
  margin-right  : auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트 말줄임 표시 
  ${({completed})=>
  completed && 
  css`
    text-decoration: line-through;
    color: rgba(0,0,0,0.3);
  `
  }
`;
const DeleteBtn = styled.button`
  border: none;
  width: 20px;
  height: 20px;
  background: transparent;
  cursor: pointer;
  color:red;
  margin-left: auto;

`