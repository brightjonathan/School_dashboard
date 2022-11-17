import { useState, useEffect } from 'react';
import "./SideBar.css";
import { NavLink, useNavigate, Link} from "react-router-dom";
import navLinks from '../../Assests/Dummy-data/NarLink';
import {RiLogoutCircleLine} from 'react-icons/ri';
import {BiLogInCircle} from 'react-icons/bi';
import {GrCatalogOption} from 'react-icons/gr';
import {auth} from '../../Firebase-config';
import {signOut} from 'firebase/auth';

const SideBar = () => {

  
  const navigate = useNavigate();
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

  //sign out functionality...
  const logOut = () =>{
    if (window.confirm('ARE YOU SURE YOU WANT TO LOG OUT FROM YOUR ACCOUNT ?')){
      signOut(auth).then(()=>{
      localStorage.clear()
      setuser(null);
      setisAuth(false)
      navigate('/login')
    })
    }
  };

  return (
    <div className="sidebar">
    <div className="sidebar__top">
      <h2>
        <span> <GrCatalogOption className='w-5 h-5'/> </span> {" "}
        Obio Primary School
      </h2>
    </div>

    <div className="sidebar__content">
      <div className="menu">
        <ul className="nav__list">
          {navLinks.map((item, index) => (
            <li className="nav__item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav__active nav__link" : "nav__link"
                }
              >
                <span>{item.icon}</span>

                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

       {!isAuth ? (
        <div className="sidebar__bottom">
        <Link to='/login'> <span><BiLogInCircle className='w-5 h-5'  /> Log In </span> </Link>
      </div>
       ) : 
       (
      <div className="sidebar__bottom">
      <span onClick={logOut}><RiLogoutCircleLine className='w-5 h-5' /> Log Out </span>
    </div>
       )}


    </div>
  </div>
  )
}

export default SideBar
