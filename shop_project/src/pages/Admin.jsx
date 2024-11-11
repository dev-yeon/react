import { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../api/firebase'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect (()=> {
    getProducts().then(setProducts)
    //전체 상품 가져오기 

  },[])

  //상품 삭제 
  const handleProductDelete = async (id) => {
    const confirmDelete = window.confirm("상품을 삭제하시겠습니까? (삭제된 데이터는 복구 되지 않습니다.)");
    if (confirmDelete) {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id)); // 삭제 후 상태 업데이트
    }
  };

  // const handleProductDelete = (id) => {
  //   const confirmDelete = window.confirm("상품을 삭제하시겠습니까? (삭제된 데이터는 복구 되지 않습니다.)");
  //   if (confirmDelete) {
  //     deleteProduct(id).then(()=> {
  //       setProducts(products.filter(product => product.id !== id))
  //     }).catch ((error)=>{
  //       console.error(error)
  //     })
  //   } //약간 옛날코드 
  // }
  /*
  비동기 처리시 async / await의 사용과 then 을 사용 할 때의 차이점 
  async / await : 비동기 코드를 간단하고, 읽기 쉽게 하면서, 오류처리에 대한 문법을 강제 함으로써 
  직관적으로 오류 처리를 할수 있게 함. 




  */

  const handleProductEdit = (id) => {
    navigate(`/admin/edit/${id}`)
  }
  return (
    <>
      <div className='container'>
        <h2>상품 관리</h2>
        <div className='adminList'>
          <ul>
            {products.map(el => (
              <li key= {el.id}>
                  {el.title}
                  <button onClick={()=> handleProductDelete(el.id)}>삭제</button>
                  <button onClick={()=> handleProductEdit(el.id)}>수정</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}