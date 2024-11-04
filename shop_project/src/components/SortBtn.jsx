import PropTypes from 'prop-types';

export default function SortBtn({ sortName, sortPrice }) {
  return (
    <>
      <button onClick={sortName}>이름순</button>
      <button onClick={sortPrice}>가격순</button>
    </>
  );
}

// propTypes 설정
SortBtn.propTypes = {  // 여기서 `propTypes`로 수정
  sortName: PropTypes.func.isRequired,
  sortPrice: PropTypes.func.isRequired,
};
//PropTypes 은 타입에 대한 검증 
//func = 함수형 타입이어야 하며 
//isRequired 반드시 전달 되어야 하는 값 
