import { useEffect, useState } from 'react';
import { getProducts } from '../api/firebase';
import Products from './Products';


export default function AllProduct() {
  const [product, setProduct] = useState([]);

  useEffect(()=> {
    const fetchProducts = async() => {
      try {
        const products = await getProducts();
        setProduct(products);
      } catch(error) {
        console.error(error)
      }
    }
    fetchProducts()
  },[])
  return (
    // <>
    //   {product && product.map(el => (
    //     <div key= {el.id}>
    //         <img src ={el.img} />
    //         <p>{el.title}</p>
    //     </div>
    //   ))}
    // </>
    <div className='container'>
      <Products products={product}>  
      </Products>
    </div>
  )
}