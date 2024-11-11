import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../api/firebase';
import UploadProduct from './UploadProduct';

export default function ProductEdit() {
  const { id } = useParams(); // URL에서 상품 ID를 받아오기
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
    });
  }, [id]);

  const handleSave = async (item) => {
    try {
      await updateProduct(id, item);
      alert("상품이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error(error);
      alert("상품 업데이트에 실패했습니다.");
    }
  };

  return (
    <>
      {product ? (
        <UploadProduct
          initialProduct={product}
          isEdit={true}
          onSave={handleSave}
        />
      ) : (
        <p>로딩 중...</p>
      )}
    </>
  );
}