import styled from 'styled-components'
import DetailPageEvent from './DetailPageEvent'


export default function Products ({products}){
  return (

    <ProductList>
      {products && products.map((product)=> (
        <li key={product.id}>
          <DetailPageEvent product={product}/>
        </li>
      ))}
    </ProductList>
  )
}
const ProductList  = styled.ul`
  display: flex;
  gap: 20px 5%;
  flex-wrap: wrap;
  li {
    flex-shrink: 0;
    width: 30%;
  }
`