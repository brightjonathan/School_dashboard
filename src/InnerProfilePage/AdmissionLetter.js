import {useState, useEffect} from 'react'
import {auth, db } from '../Firebase-config'
import { collection, onSnapshot } from 'firebase/firestore';

const AdmissionLetter = ({isAuth}) => {

  const [letter, setLetter] = useState([]);

  //fetching the data using useEffect 
  useEffect(()=>{
    const getletter = onSnapshot(
      collection(db, 'BioData'),
      (snapshot)=>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({id: doc.id, ...doc.data()});
        });
        setLetter(list);
      }
    )
    return ()=>{
      getletter();
    }
  },[]);


  return (
    <>
    {letter?.map((doc)=>{
      return(
        <div className="details__form" key={doc.id}> 
      { isAuth && doc.User.id === auth.currentUser.uid ? (
        <> 
        <h2 className='profile__desc text-xl text-center'> OFFER OF PROVISIONAL ADMISSION </h2> 
        <h2 className="profile__title">Dear, {doc.surname.toUpperCase()} {doc.First_name.toUpperCase()} {doc.Other_name.toUpperCase()} </h2> 
        <p className="profile__desc"> i am pleased to inform you that you have been offered Provisional Admission to OBIO PRIMARY SCHOOL, Port Harcourt, River State, Nigeria.
        We congratulate you for the achievement and welcome you to OBIO PRIMARY SCHOOL. </p>
        <p className="profile__desc"> You are expected to report to the school by Monday at 9:00am. accompanied by your parent / guardian, failure to which you shall be deemed to have forfeited your vacancy to another deserving student.</p>
        <h3 className="profile__desc text-2xl"> Location </h3>
        <p className="profile__desc "> You may access the school by boarding a "Texi" staduim Road Elekahia, Port Harcourt, River State. The school is approxiamately 200 meter from Air Force. Please find the joining instructions and school fees structure.</p>
        <p className='profile__desc'> we look forward to recieving you. <br/> <span className='text-xl'> WELCOME </span> </p>
        <p className='profile__desc text-xl'>Mrs Esther Udofia <br/> <span className='underline'> PRINCIPAL / SECRETARY B.O.G / P.T.A </span></p>
        </>
      ) : (null)
      } 
    
   </div>
      )
    })}
    </> 
  )
}

export default AdmissionLetter;

