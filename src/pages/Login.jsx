import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import ilustration from '../assets/login.svg';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();

    const loginHandler = async (ev) => {
        ev.preventDefault();
        const id = toast.loading("Tolong tunggu...")
        setLoading(true);

        try{
            await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passRef.current.value
            );
            toast.update(id, {render:"Login success, Welcome!", type:"success", isLoading:false, autoClose:2000});
            navigate('/app/home');
        }catch(error){
            if(error.code.includes("not-found")){
                toast.update(id, {render:"Sorry, account not found", type:"error", isLoading:false, autoClose:3000});
                return;
            }else if(error.code.includes("wrong-password")){
                toast.update(id, {render:"Email or password not correct", type:"error", isLoading:false, autoClose:3000});
                return;
            }
            toast.update(id, {render:"Error", type:"error", isLoading:false, autoClose:3000});
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
        <Helmet>
            <title>Schedus</title>
        </Helmet>
        
        <div className='grid grid-cols-2'>
            <div className='flex flex-col justify-center bg-white h-screen w-11/12'>
                <div className='flex flex-col pl-24'>
                    <h1 className='text-3xl font-bold'>
                        Hello, Schemin👋
                    </h1>
                    <h2 className='text-md font-regular text-gray-400 mt-3'>
                        Welcome back! Please enter your details.
                    </h2>
                    <form className='flex flex-col mt-10' onSubmit={loginHandler}>
                        <label>Email
                            <span className='text-red-500'>*</span>
                        </label>
                        <input 
                        type="email"
                        ref={emailRef} 
                        disabled={loading} 
                        className='inputStyle' 
                        required 
                        placeholder='Enter email' />
                        <label className='mt-2'>Password
                            <span className='text-red-500'>*</span>
                        </label>
                        <input 
                        type="password"
                        ref={passRef}
                        disabled={loading} 
                        className='inputStyle' 
                        required 
                        placeholder='Enter password' />
                        
                        <button disabled={loading} className={`btnPrimary mt-10 ${ loading && "opacity-75"}`} type='submit'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            
            <div className='flex justify-center pr-14'>
                <img src={ilustration} alt="ilustration 1" />
            </div>
        </div>
        </>
    );
}

export default Login;