import styled from 'styled-components';



export default function Button({accent, children, onclick}){
  return (
    <>
      <Btn accent = {accent} onclick ={onclick}>
        {children}
      </Btn>
    </>
  )
}

const Btn = styled.button`
  background-color: ${(props)=> props.accent ? 'rgba(255,255,255, 0.7)' : 'rgba(100,100,100,0.8)'};
  color : ${(props)=>props.accent ? '#000' : '#fff'};
  padding: 12px 24px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 500;
  gap: 6px;
  cursor: pointer;
  &:hover {
    background-color : ${(props)=> props.accent ? 'rgba(255,255,255, 0.9)':'rgba(100,100,100,0.9)'}
  }

`