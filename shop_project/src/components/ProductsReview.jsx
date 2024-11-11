import { useEffect, useState } from 'react';
import { addReview, getReview } from '../api/firebase';

export default function ProductsReview({productId}) {

  const [review, setReview] = useState([])
  const [newReview, setNewReview] =useState('');
  useEffect(()=> {
    getReview(productId).then((review)=> {
      setReview(review.sort((a,b)=> b.timestamp - a.timestamp))
    })
    .catch((error)=> {
      console.error(error)
    })
  },[productId])
  const handleReview = async () => {
    try {
      const user = 'user';
      const timestamp = Date.now();
      await addReview(productId, user, newReview, timestamp);
      setNewReview('');
      getReview(productId).then(setReview)
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>review</h3>
      <ul>
          {review  && review.reverse().map((el,idx)=> (
            <li key={el.id || idx}>{el.text}</li>
          ))}
      </ul>
        <input 
          type='text' 
          value={newReview} 
          onChange={(e)=>setNewReview(e.target.value)} 
        />
        <button onClick={handleReview}> 작성하기 </button>

    </div>
  )


}