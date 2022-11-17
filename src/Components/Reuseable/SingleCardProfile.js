import {useState, useEffect } from 'react'
import {AiOutlineUser} from 'react-icons/ai'
import { auth , db} from '../../Firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';


const SingleCardProfile = ({isAuth}) => {

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

  return (
    <div className="single__card">
    <div className="card__content">
        {name.map((doc)=> {
            return (
                <div key={doc.id} >
                    {isAuth && doc.User.id === auth.currentUser.uid ? (
                        <>
                        <h4>Welcome Back, {doc.surname} {doc.First_name} </h4>
                        <span>15%</span>              
                        </>
                    ) : 
                    (
                      <>
                      <h4>Welcome</h4>
                      </>
                    )}
                </div>
            )
        })}
    </div>

    <span className="card__icon">
    <AiOutlineUser className='w-9 h-9' />
    </span>
  </div>
  )
}

export default SingleCardProfile;

