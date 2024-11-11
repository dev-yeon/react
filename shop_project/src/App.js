import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import GlobalStyle from './style/GlobalStyle';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import Admin from './pages/Admin';
import ProductEdit from './pages/ProductEdit';
const queryClient = new QueryClient();
function App() {
  return (
   <>
   <QueryClientProvider  client = {queryClient}>
    <AuthContextProvider>
      <GlobalStyle/>
      <Header />
      <Routes >
        <Route path ='/' element ={<Home/>} />
      </Routes>
      <Outlet/>
    </AuthContextProvider>
    </QueryClientProvider>
   </>
  );
}

export default App;
