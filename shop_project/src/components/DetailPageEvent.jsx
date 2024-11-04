import styled from 'styled-components'
import { formatCurrency } from '../api/firebase'
import { useNavigate } from 'react-router-dom'


export default function DetailPageEvent ({product}) {
  const colorItem = product.colors
  const navigate = useNavigate();
  const handleDetailEvent = ()=> {
    navigate(`/product/detail/${product.id}`, {
      state : {
        title: product.title,
        id: product.id,
        img: product.img,
        price: product.price,
        size: product.size,
        colors: product.colors,
        description: product.description
      }
    })
  }
  return (
    <DetailItem onClick={handleDetailEvent}>
      <img src = {product.img}/>
      <div className='textWrap'>
        <h3>{product.title}</h3>
        <div className='itemFlex'>
          <p className='itemPrice'>{formatCurrency(product.price)} 원 </p>
          <p className='itemSize'>{product.size}</p>
        </div>
        <div className='itemColor'>
          {colorItem && colorItem.map((color, idx)=> (
            <div key={idx} style={{backgroundColor : color}} />
          ))}
        </div>
      </div>
    </DetailItem>
  )

}

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .textWrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 {
      font-size: 20px;
      font-weight: bold;
      transition: 500ms;
      color: rgba(0,0,0,0.5);
      &:hover {
        color: rgba(0,0,0,1);
      }
    }
  }
  .itemFlex {
    display: flex;
    justify-content: space-between;
  }
  .itemColor {
    display: flex;
    height: 20px;
    gap: 2px;
    div {
      width: 20px;
      height: 20px;
    }
  }
`