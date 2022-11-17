import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase-config';
import '../Styles/Details.css';

const categoryOption = [
  "male",
  "female",
];

const schoolOption = [
  'kindergarten',
  'Primary school',
  'Secondary school'
]

const currentGrade = [
  'Nursery one','Nursery Two','grade one','grade two','grade three','grade four','grade five','grade six'
]

const sportOption = [
  'Football',
  'Basketball',
  'volleyball',
  'Tenis'
]

const socialActivities = [
  'Debate club',
  'Drama club',
  'Dance club',
  'Physics/Chemistry club',
]


const initialState = {
  Gender: "",
  School: "",
  Level: "",
  School_club: "",
  Sport: "",
  surname: "",
  First_Name: "",
  Other_Name: "",
  Permanent_Address: "",
  Previous_school: "",
};


const Details = () => {

  
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { Gender, School, Level, School_club, Sport, surname, First_Name, Other_Name, Permanent_Address, Previous_school} = formValue;

  //targeting the input fields
const onInputChange = (e)=>{
  setFormValue({...formValue, [e.target.name]: e.target.value})
}


//targetting the category one 
const onCategory_one = (e) => {
  setFormValue({ ...formValue, Gender: e.target.value });
};


//targetting the category two 
const onCategory_two = (e) => {
  setFormValue({ ...formValue, School: e.target.value });
};

//targetting the category three
const onCategory_three = (e) => {
  setFormValue({ ...formValue, Level: e.target.value });
};

//targetting the category four 
const onCategory_four = (e) => {
  setFormValue({ ...formValue, School_club: e.target.value });
};

//targetting the category four 
const onCategory_five = (e) => {
  setFormValue({ ...formValue, Sport: e.target.value });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(surname === '' || First_Name === '' || Other_Name === '' || Permanent_Address === '' || Previous_school === '' || Gender === '' || School === '' || Level === '' || School_club === '' || Sport === ''){
      toast.error('Please Fill in all the Input Field')
    }else{
      try {
        await addDoc(collection(db, 'AcademicData'), {
          User: {
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            id: auth.currentUser.uid
          },
          ...formValue,
          timestamp: serverTimestamp()
        })
        navigate('/')
        toast.success(' Academic data submitted')
      } catch (error) {
        console.log(error)
      }

      
    }
  }
  
  return (
      <div className="details__form">
          <h2 className="profile__title">Academic data</h2>
          <p className="profile__desc"> Update your academic data here </p>

          <form onSubmit={handleSubmit} >
          <div className="form__group">
              <div>
                <label>Surname</label>
                <input type="text"
                 placeholder="surname name" 
                 name='surname'
                value={surname}
                onChange={onInputChange} 
                 />
              </div>

              <div>
                <label>First Name</label>
                <input type="text"
                 placeholder="Middle name" 
                 name='First_Name'
                value={First_Name}
                onChange={onInputChange}
                 />
              </div>
            </div>

            <div className="form__group">
            
              <div>
                <label>Other Name</label>
                <input 
                type="text" 
                placeholder="Other name" 
                name='Other_Name'
                value={Other_Name}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Permanent Address</label>
                <input 
                type="text" 
                placeholder="SYL 3108" 
                name='Permanent_Address'
                value={Permanent_Address}
                onChange={onInputChange}
                />
              </div>
            </div>


            <div className="form__group">
            <div>
                <label>Gender</label>
                <select value={Gender} onChange={onCategory_one}>
                <option>select your Gender</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div>
                <label>Previous school</label>
                <input 
                type="text" 
                placeholder="previous school" 
                name='Previous_school'
                value={Previous_school}
                onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form__group">
            <div>
                <label>School</label>
                <select value={School} onChange={onCategory_two}>
                <option>select your school</option>
                  {schoolOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div>
                <label>Level</label>
                <select value={Level} onChange={onCategory_three}>
                <option>select your school level</option>
                  {currentGrade.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option> 
                  ))}
              </select>
              </div>
              </div>

              <div className="form__group">
            <div>
                <label>School Club</label>
                <select value={School_club} onChange={onCategory_four}>
                <option>select your school club</option>
                  {socialActivities.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>

              <div>
                <label>Sport</label>
                <select value={Sport} onChange={onCategory_five}>
                <option>select your sport</option>
                  {sportOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option> 
                  ))}
              </select>
              </div>
              </div>
                <button className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'>Submit</button>
            </form>

    </div>
  )
}

export default Details;

