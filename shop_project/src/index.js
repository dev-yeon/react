import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom';
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
import Admin from './pages/Admin';
import ProductEdit from './pages/ProductEdit';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ProtectRouter = ({ checkAdmin, children }) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return null;
  }
  
  if (!user || (checkAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  
  return children;
};

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/cart', element: <MyCart /> },
      { path: '/join', element: <Join /> },
      { path: '/product/:category', element: <CategoryPages /> },
      { path: '/product/detail/:id', element: <ProductDetail /> },
      { path: '/search', element: <Search /> },
      { path: '/board/write', element: <WritePage /> },
      { path: '/board/qna', element: <Qna /> },
      { path: '/board/qna/:id', element: <QnaDetailPage /> },
      {path: '/admin/edit/:id', element:  <ProductEdit />},
      {path: 'admin/upload' ,element : <UploadProduct />},
      {path: '/admin', element:  <Admin />},
    ],
  },
]);

// React.StrictMode 제거
root.render(
  <RouterProvider router={routes} />
);

reportWebVitals();