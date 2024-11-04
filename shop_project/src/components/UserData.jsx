import styled from 'styled-components'

export default function UserData({user}){
  return (

    <UserInfo>
      <img src={user.photoURL} alt = {user.displayName}/>
      <span>{user.displayName}</span>
    </UserInfo>

  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  img {
    width: 36px;
    height: auto;
    border-radius: 100%;
  }
  span {
    font-size: 16px;
  }
`