import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBoard, onUserState } from '../api/firebase';
import BoardListItem from '../components/BoardListItem';
import styled from 'styled-components';

export default function Qna(){
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(()=> {
    onUserState((user)=>{
      setUser(user);
    })
  }, [])
  const handleWrite = () => {
    navigate ( '/board/write',{state: {email : user.email}})
  }
  const {data : board,} = useQuery({
    queryKey : 'board',
    queryFn : getBoard
  })
  return (
    <div className='container'>
      <div className='boardTop'>
        <h2>QnA 게시판</h2>
        {user && user.isAdmin && 
          <button className='writeBtn' onClick={handleWrite}>작성하기</button>}
      </div>
      <ul className='boardList'>
        {board && board.map((el)=> (
          <BoardListItem key ={el.id} post = {el} />
        ))}
      </ul>
    </div>
  )

}

// 전체 컨테이너
const Container = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

// 상단 QnA 타이틀과 작성하기 버튼 정렬
const BoardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// 타이틀 스타일
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

// 작성하기 버튼 스타일
const WriteButton = styled.button`
  padding: 10px 20px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// 리스트 스타일
const BoardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// 리스트 아이템 개별 스타일
const ListItem = styled.li`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;