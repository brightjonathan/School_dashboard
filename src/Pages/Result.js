import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Result.css';
import {auth, db } from '../Firebase-config'
import { collection, onSnapshot } from 'firebase/firestore';

const Result = ({isAuth}) => {

  const navigate = useNavigate();
  const [name, setname] = useState([]);

  //fetching the data using useEffect 
  useEffect(()=>{
    const getletter = onSnapshot(
      collection(db, 'BioData'),
      (snapshot)=>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id, ...doc.data()});
        });
        setname(list);
      }
    )
    return ()=>{
      getletter();
    }
  },[]);
  
  useEffect(()=>{
    if(!isAuth){
      navigate('/login')
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="settings">
    <div className="settings__wrapper">
      <h2 className="settings__title"> Academic result </h2>
       
     <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 0 lg:grid-cols-1 gap-x-6 gap-y-16 px-4 pt-10 sm:pt-5 text-black'>
        {name?.map((doc)=>{
          return(
            <div className="bg-gray-300 px-5 py-5 rounded-md" key={doc.id}>
              {isAuth && doc.User.id === auth.currentUser.uid ? (
                <>
                 <h3 className="pt-4 text-xl"> Review your result, {doc.surname.toUpperCase()} {doc.First_name.toUpperCase()} {doc.Other_name.toUpperCase()} </h3>
                 <button className='pt-2 font-mono font-semibold text-black cursor-pointer'>CLICK TO REVIEW </button>    
                </>
              ) : (null)}
            </div>
          )
        })}
        
      </div> 
     </div>
     </div> 
  )
}

export default Result

