import {useState, useEffect} from 'react';
import "./TopNar.css";
import {GrNotification} from 'react-icons/gr';
import {BiSearch} from 'react-icons/bi';
import {auth, db} from '../../Firebase-config';
import {CgProfile} from 'react-icons/cg';
import { collection, doc, onSnapshot } from 'firebase/firestore';

const TopNar = () => {

  const [user, setuser] = useState(null);
  const [isAuth , setisAuth] = useState(localStorage.getItem('isAuthorized'));
  const [imgr, setimgr] = useState([]);
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        setuser(authUser);
      }else{
        setuser(null);
      }
    })
  },[user])

  useEffect(()=>{
   const getimg = onSnapshot(
    collection(db, 'BioData'),
    (snapshot)=>{
      let list = []
      snapshot.docs.forEach((doc)=>{
        list.push({id: doc.id, ...doc.data()});
      });
      setimgr(list);
    }
   )
   return ()=>{
    getimg();
   }
  },[])

  return (
    <div className="top__nav">
    <div className="top__nav-wrapper mt-3">
      <div className="search__box">
        <input type="text" placeholder="search or type" />
        <span>
          <BiSearch className='w-5 h-5'/>
        </span>
      </div>
      <div className="top__nav-right">
        <span className="notification">
        <GrNotification className='w-5 h-5'/>
          <span className="badge">1</span>
        </span>
        <div className="profile">

          {imgr.map((doc)=>{
            return(
              <div key={doc.id}>
                {isAuth && doc.User.id === auth.currentUser.uid ? (
                    <img src={doc.imgUrl} alt="profileImg" /> 
                ) :( <CgProfile className='w-9 h-9'/> ) } 
             </div>
            )
          })}
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default TopNar

