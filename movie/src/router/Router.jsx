import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Main from '../pages/Main';

export default function Router(){
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement : <NotFound/>, // 일치하는 경로가 없을 때, 출력할 컴포넌트 
      children : [ // 자식경로 설정  
        { index: true, element: <Main/>}, // main 컴포넌트를 index 페이지로 설정
        {path: '/main/:category/:movieId' , element : <Main/>}
      ]
    }
  ])

  return <RouterProvider router={router}/> 
}