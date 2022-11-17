import {useState, useEffect} from 'react';
import {auth, db} from '../Firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const AcceptanceLetter = ({isAuth}) => {
 
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
    {
      letter?.map((doc)=>{
        return(
        <div className="details__form" key={doc.id} >
          {isAuth && doc.User.id === auth.currentUser.uid ? (
            <>
            <h2 className='profile__desc text-xl text-center'> ACCEPTANCE OF OFFER OF PROVISIONAL ADMISSION </h2>
            <p className="profile__desc"> I, {doc.surname.toUpperCase()} {doc.First_name.toUpperCase()} {doc.Other_name.toUpperCase()} of {doc.Local_Government.toUpperCase()} L.G.A in {doc.State_of_origin.toUpperCase()} of Nigeria hereby accept the offer of admission into OBIO PRIMARY SCHOOL under the condition stipulated in your letter of admission, reference 
            <span className='text-xl'> Id: {doc.User.id} </span>  I accept to 
            abide by all existing regulations and those that the school will make from time to time concerning fees, academic programmes and other school matters.</p>
            <p className='profile__desc text-xl'> Your's Faithfully <br/> <span > {doc.surname.toUpperCase()} {doc.First_name.toUpperCase()} {doc.Other_name.toUpperCase()} </span> </p>
            </>
          ) : (null) }
      </div> 
        )
      })      
    }
    </>
  )
}

export default AcceptanceLetter;


