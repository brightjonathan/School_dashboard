import {useEffect, useState } from 'react';
import { auth, db } from '../Firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const DashbaordAcademicData = ( { isAuth } ) => {

    const [academicData, setacademicData] = useState([]);

    
  //fetching the data using useEffect 
  useEffect(()=> {
    const getmedicalform = onSnapshot(
     collection(db, 'AcademicData'),
     (snapshot)=>{
       let list = []
       snapshot.docs.forEach((doc)=>{
         list.push({id: doc.id, ...doc.data()});
       });
       setacademicData(list);
     }
    )
    return ()=>{
     getmedicalform()
    }
 },[]);

  return (
    <div className="details__form mt-4">
      <div className="bg-gray-300 px-5 py-5 rounded-md">
          <h3 className="pt-4 text-xl text-black pb-2"> ACADEMIC DETAILS</h3>
          <div className="grid grid-cols-1 gap-4">
             
          {/* Looping through the data and display them in the broswer */}
          {academicData?.map((doc)=>{
            return(
              <div key={doc.id}>
              {isAuth && doc.User.id === auth.currentUser.uid ? (
                <div className="mb-6 font-mono">
                <h1> ID: {doc.User.id} </h1>
                <h1> Login name: {doc.User.name} </h1>
                <h1> Email:  {doc.User.email} </h1>
                <h1> <span className='font-bold text-black '> SURNAME : </span>  {doc.surname} </h1>
                <h1> <span className='font-bold text-black '> FIRSTNAME :</span> {doc.First_Name} </h1>
                <h1> <span className='font-bold text-black '> OTHER NAME : </span>  {doc.Other_Name} </h1>
                <h1> <span className='font-bold text-black '> PERMANENT ADDRESS </span> {doc.Permanent_Address} </h1>
                <h1> <span className='font-bold text-black '> GENDER :</span> {doc.Gender} </h1>
                <h1> <span className='font-bold text-black '> PREVIOUS SCHOOL :</span> {doc.Previous_school} </h1>
                <h1> <span className='font-bold text-black '> SCHOOL :</span> {doc.School} </h1>
                <h1> <span className='font-bold text-black '> LEVEL :</span> { doc.Level } </h1>
                <h1> <span className='font-bold text-black '> SCHOOL CLUB:</span> {doc.School_club}  </h1>
                <h1> <span className='font-bold text-black '> SPORT :</span> {doc.Sport} </h1>
               <h1> <span className='font-bold text-black'> Date Submitted: </span> {doc.timestamp.toDate().toDateString()}</h1> 
              </div>    
              ): (null)}
              </div>
            )
          })}
              
          </div>
        </div>
        
    </div>
  )
}

export default DashbaordAcademicData


