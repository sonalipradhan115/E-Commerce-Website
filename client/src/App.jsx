import React, {useEffect } from 'react'
import {BrowserRouter, Routes,Route,useNavigate} from 'react-router-dom';
import {Login,Signup,Navbar,Home,HomeForm, Userdetail, PostDetails, UpdateForm, PasswordChange} from './components/index';
import './index.css';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("email"));
    if (!useremail) {
      navigate("/");
    }
  }, []);
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/HomeForm/:id' element={<HomeForm/>}/>
        <Route path='/UpdateForm/:id' element={<UpdateForm/>}/>
        <Route path='/userdetail' element={<Userdetail/>}/>
        <Route path='/postdetail/:id' element={<PostDetails/>}/>
        <Route path='/passwordChange' element={<PasswordChange/>}/>
      </Routes>
    </div>
  )
}

export default App