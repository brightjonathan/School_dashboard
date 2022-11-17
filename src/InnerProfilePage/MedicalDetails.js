import {useState, useEffect } from 'react';
import {auth, db} from '../Firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';


const MedicalDetails = ({ isAuth }) => {


  const [medicalform, setmedicalform] = useState([]);

  //fetching the data using useEffect 
  useEffect(()=> {
     const getmedicalform = onSnapshot(
      collection(db, 'MedicalForm'),
      (snapshot)=>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id, ...doc.data()});
        });
        setmedicalform(list);
      }
     )
     return ()=>{
      getmedicalform()
     }
  },[])


  return (
    <div className="details__form">
      <h2 className="profile__title"> Medical Details  </h2>

      <div className="bg-gray-300 px-5 py-5 rounded-md">
          <h3 className="pt-4 text-xl text-black pb-2"> MEDICAL DETAILS </h3>
          <div className="grid grid-cols-1 gap-4">
             
          {/* Looping through the data and display them in the broswer */}
          {medicalform?.map((doc)=>{
            return(
              <div key={doc.id}>
              {isAuth && doc.User.id === auth.currentUser.uid ? (
                <div className="mb-6 font-mono" >
                <label className='font-bold text-black pt-4 text-xl'> If "YES" Explain </label>
                <h1> ID: {doc.User.id} </h1>
                <h1> Full name: {doc.User.name} </h1>
                <h1> Email:  {doc.User.email} </h1>
                <h1> <span className='font-bold text-black '> Have You Had Accident Before? : </span>  {doc.category_two} </h1>
                <h1> <span className='font-bold text-black '> Have You Been Hospitalized Before? :</span> {doc.category_one} </h1>
                <h1> <span className='font-bold text-black '> Have You Had Any Surgery/operation? : </span> {doc.category_three} </h1>
                <h1> <span className='font-bold text-black '> Is Your Sight Good? :</span> {doc.category_four} </h1>
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

export default MedicalDetails