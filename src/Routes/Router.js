import {useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {auth} from '../Firebase-config';
import "react-toastify/dist/ReactToastify.css";
import Dashboard from '../Pages/Dashboard';
import Admission from '../Pages/Admission';
import SchoolFees from '../Pages/SchoolFees';
import Result from '../Pages/Result';
import Medical from '../Pages/Medical';
import Profile_setting from '../Pages/Profile_setting';
import SignUp from '../Pages/SignUp';
import LogIn from '../Pages/LogIn';


const Router = () => {


  const [user, setuser] = useState(null);
  const [isAuth , setisAuth] = useState(localStorage.getItem('isAuthorized'));

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=> { 
      if(authUser){
        setuser(authUser); 
      }else{ 
        setuser(null);
      }
    })
  },[user]) 
  

  return (
    <div>
      <ToastContainer position='top-right'/> 
      <Routes>
      <Route path="/" element={<Navigate to="/dashboard" element={<Dashboard isAuth={isAuth} />} />} />
      <Route path="/dashboard" element={<Dashboard isAuth={isAuth} />} />
      <Route path="/admissions" element={<Admission isAuth={isAuth} />} />
      <Route path="/school-fees" element={<SchoolFees isAuth={isAuth} />} />
      <Route path="/result" element={<Result isAuth={isAuth} />} /> 
      <Route path='/medical' element={ <Medical isAuth={isAuth} /> } /> 
      <Route path='/profile-setting' element={ <Profile_setting isAuth={isAuth} /> } />
      <Route path='/signUp' element={<SignUp setisAuth={setisAuth} />} /> 
      <Route path='/login' element={ <LogIn setisAuth={setisAuth} setuser={setuser} /> } />
    </Routes>

    </div>
  )
}

export default Router



