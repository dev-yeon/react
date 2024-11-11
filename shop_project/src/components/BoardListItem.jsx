import { useNavigate } from 'react-router-dom'


export default function BoardListItem({post}) {
  const navigate = useNavigate();
  const handleDetail = () =>{
    navigate(`/board/qna/${post.id}` , {
    state : {
      id : post.id,
      user : post.user,
      date : post.date,
      title: post.title,
      text: post.text
      }
    })
  }
  return (
    <li onClick={handleDetail}>
      <p>{post.title}</p>
      <p>{post.date}</p>
    </li>
  )

}