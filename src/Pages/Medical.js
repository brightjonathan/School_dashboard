import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import MedicalDetails from '../InnerProfilePage/MedicalDetails';
import MedicalForm from '../InnerProfilePage/MedicalForm';
import '../Styles/Medical.css';


const Medical = ({ isAuth }) => {

  const navigate = useNavigate();
  const [active, setactive] = useState('FirstCard'); 

  
  useEffect(()=>{
    if(!isAuth){
      navigate('/login') 
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [isAuth]); 

  return (
    <div className="settings"> 
      <div className="settings__wrapper"> 
        <h2 className="settings__title"> Medical Details </h2> 

        <div className="settings__top"> 
          <button className='setting__btn active__btn' onClick={() => setactive('FirstCard')}> Medical Form </button>
          <button className="setting__btn active__btn" onClick={() => setactive('SecondCard')}>Medical details </button>
        </div>

        <div> 
          { active === 'FirstCard' && <MedicalForm/> } 
          { active ===  'SecondCard' && <MedicalDetails isAuth={isAuth} /> }  
        </div>   
        
        </div>
    </div>    
  )
}

export default Medical;


