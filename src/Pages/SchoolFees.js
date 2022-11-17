import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/SchoolFees.css';

const SchoolFees = ({isAuth}) => {

  const navigate = useNavigate();

  
  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="settings">
    <div className="settings__wrapper">
      
      <h2 className="settings__title"> School Fee </h2> 
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 0 lg:grid-cols-2 gap-x-6 gap-y-16 px-4 pt-10 sm:pt-5 text-black'>

      <div className="bg-gray-300 px-5 py-5 rounded-md">
          <h3 className="pt-4 text-xl text-black pb-2"> Kindergarten </h3>
          <div className="grid grid-cols-2 gap-4">    
          <div className="mb-6 font-mono">
            <label className='font-bold text-black'> Fees </label> 
            <h1>Tuition</h1> 
            <h1>school Uniform</h1>
            <h1>sport</h1>
            <h1>Lesson</h1>
            <h1>Health</h1>
            <h1>Vacation</h1>
          </div>
    
          <div className="mb-6 font-mono">
            <label className='font-bold text-black'> amount </label>
            <h1> &#x20A6; 20,000</h1>
            <h1> &#x20A6; 10,000</h1>
            <h1> &#x20A6; 5,000</h1>
            <h1> &#x20A6; 15,000</h1>
            <h1> &#x20A6; 5,000</h1>
            <h1> &#x20A6; 10,000</h1>
          </div>
          </div>

          <button className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'>CLICK TO PAY </button>
            
      </div>

      <div className="bg-gray-300 px-5 py-5 rounded-md">
          <h3 className="pt-4 text-xl text-black pb-2"> Primary School </h3>
          <div className="grid grid-cols-2 gap-4">    
          <div className="mb-6 font-mono">
            <label className='font-bold text-black'> Fees </label>
            <h1>Tuition</h1>
            <h1>school Uniform</h1>
            <h1>sport</h1>
            <h1>Lesson</h1>
            <h1>Health</h1>
            <h1>Vacation</h1>
          </div>
    
          <div className="mb-6 font-mono">
            <label className='font-bold text-black'>amount</label>
            <h1> &#x20A6; 30,000</h1>
            <h1> &#x20A6; 15,000</h1>
            <h1> &#x20A6; 5,000</h1>
            <h1> &#x20A6; 15,000</h1>
            <h1> &#x20A6; 5,000</h1>
            <h1> &#x20A6; 10,000</h1>
          </div>
          </div>
          <button className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'> CLICK TO PAY </button>
      </div>
        </div>


    </div>
    </div>
  )
}

export default SchoolFees


