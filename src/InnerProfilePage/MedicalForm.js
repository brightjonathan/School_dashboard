import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
//import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {auth, db } from '../Firebase-config';

 const HospitalizedOption = [
  'yes',
  'No'
  ]

  const AccidentOPtion = [
    'yes',
    'No'
  ]

  const operationOption = [
    'yes',
    'No'
  ] 

  const SightOption = [
    'yes',
    'No'
  ]

  const initialState = {
    category_one: "",
    category_two: "",
    category_three: "",
    category_four: "",
    input_one: "",
    input_two: "",
    input_three: "",
    input_four: "",
  };

const MedicalForm = () => {

  
  const {id} = useParams;
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { category_one, category_two, category_three, category_four, input_one, input_two, input_three, input_four } = formValue;

  
//targeting the input fields
const onInputChange = (e)=>{
  setFormValue({...formValue, [e.target.name]: e.target.value})
};

//targetting the category one 
const onCategory_one = (e) => {
  setFormValue({ ...formValue, category_one: e.target.value });
};


//targetting the category two 
const onCategory_two = (e) => {
  setFormValue({ ...formValue, category_two: e.target.value });
};

//targetting the category three
const onCategory_three = (e) => {
  setFormValue({ ...formValue, category_three: e.target.value });
};

//targetting the category four 
const onCategory_four = (e) => {
  setFormValue({ ...formValue, category_four: e.target.value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'MedicalForm'), {
        User: {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          id: auth.currentUser.uid
        },
        ...formValue,
        timestamp: serverTimestamp()
      })
      navigate('/')
      toast.success('Medical Form submitted')
    } catch (error) {
      console.log(error)
    }

  }



  //function for populating the data for updating
  const  getsingleform = async ()=>{
    const docRef = doc(db, 'MedicalForm', id);
    const snapshot = await getDoc(docRef);

    if(snapshot.exists()){
      setFormValue({...snapshot.data()})
    }else{
      console.log('no data exists')
    }
  }

  useEffect(()=>{
    id && getsingleform();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);


  
  return (
    <div className="details__form">
    <h2 className="profile__title">Medical data</h2>
    { /* <p className="profile__desc"> Update your Medical data here </p> */ }

    <form onSubmit={handleSubmit}>
          <div className="form__group">
          <div>
                <label>Have You Been Hospitalized Before?</label>
                <select value={category_one} onChange={onCategory_one} >
                <option>select an option</option> 
                  {HospitalizedOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select> 
              </div>

              <div>
                <label>If YES State Where You Where Hospitalized</label>
                <input type="text" 
                placeholder="State where you where hospitalized..." 
                name='input_one'
                value={input_one}
                onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form__group">
          <div>
                <label>Have You Had Accident Before?</label>
                <select value={category_two} onChange={onCategory_two} >
                <option>select an option</option>
                  {AccidentOPtion.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div>
                <label>If YES State The Type Of Accident</label>
                <input 
                type="text" 
                placeholder=" State The Type Of Accident..." 
                name='input_two'
                value={input_two}
                onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form__group">
          <div>
                <label> Have You Had Any Surgery/operation? </label>
                <select value={category_three} onChange={onCategory_three}>
                <option>select an option</option>
                  {operationOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div>
                <label>If Yes, State The Type And When</label>
                <input 
                type="text" 
                placeholder=" State The Type And When" 
                name='input_three'
                value={input_three}
                onChange={onInputChange}
                />
              </div>
            </div>

            
            <div className="form__group">
          <div>
                <label> Is Your Sight Good? </label>
                <select value={category_four} onChange={onCategory_four}>
                <option>select an option</option>
                  {SightOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div> 
                <label> If You Use Glasses Please Specify Why </label>       
                <input   
                type="text" 
                placeholder="Please Specify Why" 
                name='input_four'
                value={input_four}
                onChange={onInputChange}
                />
              </div>
            </div>
            <button className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'> save medical information </button>
    </form>    
    
    </div>
  )
}

export default MedicalForm;




