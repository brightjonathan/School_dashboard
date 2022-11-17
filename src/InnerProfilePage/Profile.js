import {useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import {auth, db, storage } from '../Firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const categoryOption = [
  "male",
  "female",
];

const stateOption = [
  'Abia state','Adamawa state','Akwa Ibom state','Anambra state','Bauchi state','Bayelsa state','Benue state',
  'Borno state','Cross River state','Delta state','Ebonyi state','Edo state','Ekiti state','Enugu state','Gombe state',
  'Imo state','Jigawa state','Kaduna state','Kano state','Katsina state','Kebbi state','Kogi state','Kwara state','Lagos state',
  'Nasarawa state','Niger state','Ogun state','Ondo state','Osun state','Oyo state','Plateau state','Rivers state','Sokoto state',
  'Taraba state','Yobe state','Zamfara state','Federal Capital Territory (FCT)'];

const disabilityOption = [
  "Yes",
  "No",
];

const religionOption = [
  "Christainity",
  "Islamic",
];


const initialState = {
  surname: '',
  First_name: '',
  Other_name: '',
  Permanent_Address: '',
  Local_Government: '',
  Email: '',
  Phone_Number: '',
  Date_of_Birth: '',
  Religion: '',
  Gender: '',
  State_of_origin: '',
  Disability: '',
  Next_of_kin_Name: '',
  Next_of_kin_permenent_address: '',
  Next_of_Phone_Number: '',
  Relationship: ''
};


const Profile = () => {

  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const types = ['image/png', 'image/jpeg']; //file type
  const [imgfile, setimgFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const {
  surname, First_name, Other_name, Permanent_Address, Local_Government, 
  Email, Phone_Number, Date_of_Birth, Religion, Gender, State_of_origin, Disability, 
  Next_of_kin_Name, Next_of_kin_permenent_address, Next_of_Phone_Number, Relationship
 } = formValue;


 //targeting the input fields
const onInputChange = (e)=>{
  setFormValue({...formValue, [e.target.name]: e.target.value})
};


//targetting the category input
const onCategoryChange_one = (e) => {
  setFormValue({ ...formValue, Religion: e.target.value });
};


//targetting the category input
const onCategoryChange_two = (e) => {
  setFormValue({ ...formValue, Gender: e.target.value });
};


//targetting the category input
const onCategoryChange_three = (e) => {
  setFormValue({ ...formValue, State_of_origin: e.target.value });
};


//targetting the category input
const onCategoryChange_four = (e) => {
  setFormValue({ ...formValue, Disability: e.target.value });
};

//validating the img file
const handleChange = (e) =>{
  let selected = e.target.files[0];
 
  if (selected &&  types.includes(selected.type)) {
    setimgFile(selected)
    toast.success('selected')
  }else{
    toast.error( 'Please Select an image File' )
  }  
}


useEffect(()=>{

  //function to upload a file to firebase 
  const uploadFile = ()=> {
    const name = new Date().getDate() * Math.floor(Math.random() * 2178634590 )
    const storageRef = ref(storage, `ProfileImages/${imgfile.name + name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgfile);

    uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
      //console.log("Upload is " + progress + "% done");
      setProgress(progress);
      switch (snapshot.state) {
        case "paused":
          //console.log("Upload is paused");
          break;
        case "running":
          //console.log("Upload is running");
          break;
        default:
          break;
      }
    }, (err)=>{
      console.log(err)
    }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        setFormValue((prev)=> ({...prev, imgUrl: url}))
      })
    })
  }

  imgfile && uploadFile();

},[imgfile])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(surname === '' || First_name === '' || Other_name === '' || Permanent_Address === '' || Local_Government === '' || Email === '' || imgfile === null 
      || Phone_Number === '' || Date_of_Birth === '' || Religion === '' || Gender === '' || State_of_origin === '' || Disability === '' || Next_of_kin_Name === '' || 
      Next_of_kin_permenent_address === '' || Next_of_Phone_Number === '' || Relationship === '' ){
        toast.error('Please Fill in all the Input Field');
    }else {
      try {
        await addDoc(collection(db, 'BioData'), { 
        User : {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          id: auth.currentUser.uid
        },
        ...formValue,
        timestamp: serverTimestamp()
        })
        navigate('/')
        toast.success('Bio data submitted')
      } catch (error) {
        console.log(error)
      }
    }
  }

 
  return (
    <div>
      <div className="details__form">
          <h2 className="profile__title">Bio data</h2>
          <p className="profile__desc">
            Update your photo and bio data here
          </p>
          <form onSubmit={handleSubmit}>
          <div className="form__group">
              <div>
                <label>Surname Name</label>
                <input 
                type="text" 
                placeholder="surname name" 
                name='surname'
                value={surname}
                onChange={onInputChange}
                />
                
              </div>

              <div>
                <label>First Name</label>
                <input 
                type="text" 
                placeholder="Middle name" 
                name='First_name'
                value={First_name}
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
                name='Other_name'
                value={Other_name}
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
                <label>Local Government</label>
                <input 
                type="text" 
                placeholder="L.G.A" 
                name='Local_Government'
                value={Local_Government}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Religion</label>
                <select value={Religion} onChange={onCategoryChange_one}>
                <option>select your religion</option>
                  {religionOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>
              </div>

            <div className="form__group">
              <div>
                <label>Email</label>
                <input 
                type="email" 
                placeholder="example@gmail.com"
                name='Email'
                value={Email}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input 
                type="number" 
                placeholder="+234 81*******" 
                name='Phone_Number'
                value={Phone_Number}
                onChange={onInputChange}
                />
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Date of Birth</label>
                <input 
                type="date" 
                placeholder="dd/mm/yyyy" 
                name='Date_of_Birth'
                value={Date_of_Birth}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Gender</label>
                <select value={Gender} onChange={onCategoryChange_two}>
                <option>select your Gender</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
              </select>
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Your Photo</label>
                <p className="profile-img__desc">
                  This will be displayed in your profile
                </p>
                <input type="file"  onChange={handleChange} placeholder="choose file" />
              </div>

              <div>
                <label>State of origin</label>
              <select  value={State_of_origin} onChange={onCategoryChange_three}>
                <option>Please select your State of origin</option>
                  {stateOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
             </select>
              </div>

            </div>

            <div className="form__group">
              <div>
                <label>Disability</label>
              <select value={Disability} onChange={onCategoryChange_four}>
                <option>Please select an option</option>
                  {disabilityOption.map((option, index) => (
                    <option value={option || ""} key={index}> {option} </option>
                  ))}
             </select>
              </div>
              </div>


            <h2 className='text-2xl text-white mb-3'> Next of Kin </h2>
            <div className="form__group">
              <div>
                <label>Next of kin</label> 
                <input 
                type="text" 
                placeholder="full name" 
                name='Next_of_kin_Name'
                value={Next_of_kin_Name}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Next of kin permenent address</label>
                <input 
                type="text" 
                placeholder="address" 
                name='Next_of_kin_permenent_address'
                value={Next_of_kin_permenent_address}
                onChange={onInputChange}
                />
                
              </div>
            </div>

            <div className="form__group">
              <div>
                <label>Phone Number</label>
                <input 
                type="number" 
                placeholder="+234 81*******"
                name='Next_of_Phone_Number'
                value={Next_of_Phone_Number}
                onChange={onInputChange}
                />
              </div>

              <div>
                <label>Relationship</label>
                <input 
                type="text" 
                placeholder="relationship"
                name='Relationship'
                value={Relationship}
                onChange={onInputChange}
                />
              </div>
            </div>

            <button className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'> Submit </button>

          </form>
        </div>
    </div>
  )
}

export default Profile


