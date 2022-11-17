import {useState, useEffect} from 'react'; 
import '../Styles/Dashboard.css';
import SingleCard from '../Components/Reuseable/SingleCard';
import {AiOutlineUser} from 'react-icons/ai';
import {VscFeedback} from 'react-icons/vsc';
import {Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SchoolStatics from '../Chart/SchoolStatics';
import SingleCardProfile from '../Components/Reuseable/SingleCardProfile';
import DashboardMedicalDetail from '../InnerProfilePage/DashboardMedicalDetail';
import DashbaordAcademicData from '../InnerProfilePage/DashbaordAcademicData';
import DashboardBioData from '../InnerProfilePage/DashboardBioData';

const tripObj = {
  title: "Home work",
  totalNumber: 30,
  icon: <AiOutlineUser className='w-9 h-9' />,
};

const clientObj = {
  title: "Studying Hours",
  totalNumber: 30,
  icon: <AiOutlineUser className='w-9 h-9' />,
}; 

const distanceObj = {
  title: "FeedBack",
  totalNumber: 25,
  icon: <VscFeedback className='w-9 h-9' />, 
};

const Dashboard = ({isAuth}) => {
  
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);


  return (
    <div className="dashboard">
    <div className="dashboard__wrapper">

    <div className="dashboard__cards">
          <SingleCardProfile isAuth={isAuth} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
    </div>

    <div className="statics">

          <div>
            <h3 className="text-2xl text-white"> Student Calender </h3>
            <Calendar onChange={onChange} value={value} /> 
          </div>

          <div className="stats">
            <h3 className="stats__title">School Statistics </h3>
            <SchoolStatics />
          </div>
        </div>
    
        <DashboardMedicalDetail isAuth={isAuth} />   
        <DashbaordAcademicData isAuth={isAuth} />    
        <DashboardBioData isAuth={isAuth} />         

    </div>
    </div>
  )
}

export default Dashboard;

