import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from './Main';

export default function Home(){
  return (
    <>
      <Header/>
      {/* <Main/> */}
      <Outlet/>
      <Footer/>
    </>
  )
}