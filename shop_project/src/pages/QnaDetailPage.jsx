import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addComments, getComments, onUserState } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';


export default function QnaDetailPage() {

  const state = useLocation().state;
  const {id, user,date, title, text} = state;
  const [loginUser, setLoginUser] = useState();
  const [commentsWrite,  setCommentsWrite] = useState();

  useEffect(()=> {
    onUserState((user)=> {
      setLoginUser(user) 
    })
  },[])
  // const handleComments = async (e) => {
  //   e.preventDefault();
  
  //   console.log("Login User:", loginUser);
  //   console.log("Comments:", comments);
  
  //   if (!loginUser) {
  //     console.error("User information is missing.");
  //     return;
  //   }
  
  //   if (!comments) {
  //     console.error("Comments information is missing.");
  //     return;
  //   }
  
  //   // loginUser에서 필요한 정보만 추출
  //   const userForComment = {
  //     uid: loginUser.uid,
  //     displayName: loginUser.displayName,
  //     email: loginUser.email,
  //   };
  
  //   try {
  //     await addComments(id, userForComment, comments); // 필요한 정보만 전달
  //     setComments(''); // 성공적으로 추가된 후 댓글 입력 필드를 초기화
  //   } catch (error) {
  //     console.error("Failed to add comment:", error);
  //   }
  // };

  const handleComments = async (e)=> {
    e.preventDefault();

    try {
      await addComments(id, loginUser.displayName, commentsWrite);
      setCommentsWrite('')
      refetch()
      
    } catch(error) {
      console.error(error)
    }
  }
  const {data: comments , refetch} = useQuery ({
    queryKey : [ `/board/${id}/comments`],
    queryFn : ()=> getComments(id)
  })

  return (
    <div className='container'>
      <div className='boardBox'>
        <strong>{title}</strong>
        <p>{text}</p>
        <p>{date}</p>
      </div>

      <div className='commentWrap'>
        <form onSubmit={handleComments}>
          {loginUser == null ? 
          <input type='text' placeholder='로그인 후 작성 할 수 있습니다.' disabled />
          :
          <input type='text' placeholder='댓글을 작성해주세요.' value={commentsWrite}
          onChange={(e)=> setCommentsWrite(e.target.value)}/>
        }
        <button type='submit'>작성하기</button>
        </form>
        <ul className='CommentList'>
          {comments && comments.map((el)=> (
            <li>{el.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )

}