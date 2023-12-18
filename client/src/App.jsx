import Layout from './components/Layout.jsx'
import {Routes, Route} from 'react-router-dom'
import Main from './pages/Main/Main.jsx'
import CompaniesPage from './pages/CompaniesPage/CompaniesPage.jsx'
import CompanyDetailPage from './pages/CompanyDetailPage/CompanyDetailPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'
import SingupPage from './pages/SingupPage/SingupPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import CreateCompany from './pages/CreateCompany/CreateCompany.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect,} from 'react'
import {  logout,checkIsAuth } from './reduxHelper/features/auth/authSlice.js'
import './App.css'
import axios from 'axios';
import { loginUser } from './reduxHelper/features/auth/authSlice.js'

function App() { 
 // const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const getToken = () => {
    return window.localStorage.getItem('token');
  };
  const check = async()=>{
   
    try{
      const token = getToken()
      if(token){
        const response = await axios.get('http://localhost:3000/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.data){
          console.log(response.data);
          dispatch(loginUser(response.data))
          dispatch(checkIsAuth(true));
        }else{
          dispatch(logout)
        }
      }

    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    check()
}, [dispatch])

//console.log(state.auth.token);
  return (
<Layout>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='companies' element={<CompaniesPage/>}/>
      <Route path='companies/:id' element={<CompanyDetailPage/>}/>
      <Route path='profile' element={<ProfilePage/>}/>
      <Route path='new' element={<CreateCompany/>}/>
      <Route path='singup' element={<SingupPage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='/' element={<Main/>}/>
     
    </Routes>
    </Layout>
  )

}

export default App
