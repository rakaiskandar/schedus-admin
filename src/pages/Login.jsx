import { Helmet } from 'react-helmet-async';
import ilustration from '../assets/login.svg';

const Login = () => {
    return (
        <>
        <Helmet>
            <title>Login</title>
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
                    <form className='flex flex-col mt-10' action=''>
                        <label>Email
                            <span className='text-red-500'>*</span>
                        </label>
                        <input type="email" className='inputStyle' required placeholder='Enter email' />
                        <label className='mt-2'>Password
                            <span className='text-red-500'>*</span>
                        </label>
                        <input type="password" className='inputStyle' required placeholder='Enter password' />
                        
                        <button className='btnPrimary mt-10' type='submit'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            
            <div className='flex justify-center pr-14'>
                <img src={ilustration} alt="" />
            </div>
        </div>
        </>
    );
}

export default Login;