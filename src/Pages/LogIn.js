import {useState } from 'react';
import {AiOutlineMail, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {Link, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import {auth, provider} from '../Firebase-config'; 
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from "react-toastify";


//initial state for the input state
const initialState = {
  email: '',
  password: '',
};


const LogIn = ({setisAuth, setuser }) => {

    const navigate = useNavigate();
    const [passwordEye, setPasswordEye] = useState(false);

    const [formValue, setFormValue] = useState(initialState);
    const { email, password } = formValue;

    //targeting the input
    const onInputChange = (e) =>{
      setFormValue({...formValue, [e.target.name]: e.target.value});
     }
  
     //func... for password 
    const handlePasswordEye = () => {
      setPasswordEye(!passwordEye)
    }

    //Submit functionality
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (email === '' || password === ''){
         return toast.error('please fill the input field')
      }else{
        try {
          if( email && password ){
          const {user} = await signInWithEmailAndPassword(
            auth, email, password
          )
          setuser(user)
          localStorage.setItem('isAuthorized', true);
          setisAuth(true)
          toast.success('Login successfully')
          navigate('/')
          }
        } catch (error) {
          toast.error('Invalid credentail')
          console.log(error)
        }
      }
    }
  
     //Google LogIn func..
     const signinwithgoogle = () =>{
      signInWithPopup(auth, provider).then((result)=>{
        localStorage.setItem('isAuthorized', true); //storing in localstorage
        toast.success('signUp successfully')
        setisAuth(true)
        navigate('/')
      })
   }


  return (
    <div className='pt-[3rem]'>
    <div className='max-w-[800px] m-auto px-4 py-16'>
      <div className='bg-[#F5F5F5] dark:bg-[#181B3A] px-10 py-8 rounded-lg text-white'>
        <h1 className='text-2xl font-bold text-white'> Login Account </h1> 
        <form onSubmit={handleSubmit} >
          <div className='grid md:grid-cols-2 md:gap-8'>
            <div className='md:my-4'>
              <label>Email Address</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="email" 
                  placeholder='Enter Email Address' 
                  name='email'
                  value={email}
                  onChange={onInputChange}
                />
                <AiOutlineMail className='absolute right-2 top-3 text-gray-400'/>
              </div>
            </div>

            <div className='my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(passwordEye === false) ? 'password' : 'text'} 
                  placeholder='Enter Password'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                />
                <div className='absolute right-2 top-3'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
              </div>
            </div>
          </div>

          <p className='text-center text-sm py-1'>By signing in you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
                 
          <button type='submit' className='w-full my-4 md:my-2 p-3 bg-white text-[#181B3A] rounded-lg font-semibold'> Login Account </button>
        </form>

        
        <hr className="my-6 border-gray-300 w-full" />
  
        <button onClick={signinwithgoogle} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
          <div className="flex items-center justify-center">
          <FcGoogle className='w-7 h-7'/>
              <span className="ml-4"> Log in with Google </span>
          </div>
        </button>

        <p className='my-4'>Don't have an account? <Link className='text-[#986c55] underline' to='/signUp'>SignUp</Link></p>
      </div>
    </div>
  </div>
  )
}

export default LogIn


