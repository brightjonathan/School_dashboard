import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Details from '../InnerProfilePage/Details';
import Profile from '../InnerProfilePage/Profile';
import '../Styles/profile_setting.css';

const Profile_setting = ({isAuth}) => {

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
        <h2 className="settings__title"> Settings </h2>

        <div className="settings__top">
          <button className='setting__btn active__btn' onClick={() => setactive('FirstCard')}>Academic data</button>
          <button className="setting__btn active__btn" onClick={() => setactive('SecondCard')}>Bio data</button>
        </div>

        <div>
          { active === 'FirstCard' && <Details /> }    
          { active ===  'SecondCard' && <Profile /> }  
        </div>
        
        </div>
    </div>    
  )
}

export default Profile_setting


