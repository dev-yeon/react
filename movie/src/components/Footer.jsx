
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import styled from 'styled-components';
export default function Footer(){

  return (
    <FooterContainer>
      <SocialList>
        <li><a href="#" target="_blank"><FaFacebook /></a></li>
        <li><a href="#" target="_blank"><FaInstagram /></a></li>
        <li><a href="#" target="_blank"><FaTwitter /></a></li>
        <li><a href="#" target="_blank"><FaYoutube /></a></li>
      </SocialList>
    
      <FooterLinks>
        <li><a href="#" target="_blank">화면 해설</a></li>
        <li><a href="#" target="_blank">고객 센터</a></li>
        <li><a href="#" target="_blank">기프트 카드</a></li>
        <li><a href="#" target="_blank">미디어 센터</a></li>
        <li><a href="#" target="_blank">투자 정보(IR)</a></li>
        <li><a href="#" target="_blank">입사 정보</a></li>
        <li><a href="#" target="_blank">이용 약관</a></li>
        <li><a href="#" target="_blank">개인 정보</a></li>
        <li><a href="#" target="_blank">법적 고지</a></li>
        <li><a href="#" target="_blank">쿠키 설정</a></li>
        <li><a href="#" target="_blank">회사 정보</a></li>
        <li><a href="#" target="_blank">문의 하기</a></li>
      </FooterLinks>

        <ServiceBtn>
          <button>
          서비스 코드
          </button>
        </ServiceBtn>
      <FooterInfo>
        <p>넷플릭스 서비시스코리아 유한회사 통신판매업신고 : 제2018-서울종로-11111 전화번호 : 00-111-1111 (수신자부담)</p>
        <p> 대표 : 홍길동 </p>
        <p> 이메일 주소 : abc@abc.com </p>
        <p> 주소 : 대한민국 서울특별시 강남 </p>
        <p> 사업자 등록번호 : 111-11-11111 </p>
        <p> 클라우드 호스팅 : aaa </p>
        <p><a href="#" target="_blank">공정거래위원회 웹사이트</a></p>
      </FooterInfo>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  max-width: 980px;
  width: 100%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #000;
`

const SocialList = styled.ul`
  display: flex;
  font-size: 20px;
  gap: 20px;
  a {
    color: #fff;
    font-size: 20px;

  }
`
const FooterLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 0px; 
  li {
      width: 25%;
    a{
      color: rgba(255,255,255,0.6);
      display: block;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`
const ServiceBtn = styled.div`
  button {
    padding: 12px 24px;
    color : #fff;
    border: solid 1px #fff;
    display: inline-block;
}
`
const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    color : rgba(255,255,255,0.6);
    font-size: 12px;
    a{
      color : rgba(255,255,255,0.6);
      &:hover {
        text-decoration: underline;
      }
    }
    
  }
`