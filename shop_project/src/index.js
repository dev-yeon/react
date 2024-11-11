import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import UploadProduct from './pages/UploadProduct';
import { useAuthContext } from './context/AuthContext';
import CategoryPages from './pages/CategoryPages';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import Join from './pages/Join';
import Search from './pages/Search';
import WritePage from './pages/WritePage';
import Qna from './pages/Qna';
import QnaDetailPage from './pages/QnaDetailPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ProtectRouter = ({checkAdmin, children}) => {
  const {user, isLoading} = useAuthContext();
  // 이전 페이지로 보내기 
  const location = useLocation(); // 현재 경로 정보를 가져옴 
  const navigate = useNavigate();
  console.log(checkAdmin)

  if(isLoading) {
    return null
  } 
  if (!user || (checkAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />
    // return <Navigate to ='/' replace/>
    // return (
    //   <Navigate to ="/" replace state={{from : location }} />
    // )
    // navigate('/', {replace: true, state :{from:location}})
    // return null
  }
  return children
} // protectRouter
const routes =  createBrowserRouter([
  {
    path: '/',
    element : <App/>,
    errorElement : <NotFound/>,
    children :[
      {path : '/login', element: <Login /> },
      {path: '/cart', element: <MyCart/>},
      {path: '/join', element: <Join />},
      {path : '/product/:category', element:<CategoryPages />},
      {path : '/product/detail/:id', element: <ProductDetail />}, 
      {path: '/search', element: <Search />},
      {path: '/board/write', element: <WritePage />},
      {path: '/board/qna', element : <Qna />},
      {path: '/board/qna/:id' , element : <QnaDetailPage />},
      {
        path : '/product/upload', 
        element: 
          <ProtectRouter checkAdmin>
            <UploadProduct/> 
          </ProtectRouter>
      },
    ]
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
