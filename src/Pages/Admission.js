import {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import AcceptanceLetter from '../InnerProfilePage/AcceptanceLetter';
import AdmissionLetter from '../InnerProfilePage/AdmissionLetter';
import '../Styles/Admission.css';

const Admission = ({isAuth}) => {

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
        <h2 className="settings__title"> Admission Status </h2> 

        <div className="settings__top">
          <button className='setting__btn active__btn' onClick={() => setactive('FirstCard')}>Admission Letter </button>
          <button className="setting__btn active__btn" onClick={() => setactive('SecondCard')}>Acceptance letter</button>
        </div>

       <div>
        {active === 'FirstCard' && <AdmissionLetter isAuth={isAuth} /> }   
        {active === 'SecondCard' && <AcceptanceLetter isAuth={isAuth} /> }  
       </div>
      

    </div>
    </div>    
  )
}

export default Admission


