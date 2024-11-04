import { useState } from 'react'
import DetailPageEvent from './DetailPageEvent'



export default function CategoryProductList({category, product}) {
  // const [products, setProducts] = useState(product)

  return (
    <div className='container'>
      <h2>{category}</h2>

      <ul className='productList'>
        {product.map((el)=>(
          <li key = {el.id}>
            <DetailPageEvent product={el} />
          </li>
        ))}

      </ul>
    </div>
  )

}