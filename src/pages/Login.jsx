import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import ilustration from '../assets/login.svg';
import logo from '../assets/app_logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();

    const loginHandler = async (ev) => {
        ev.preventDefault();
        const id = toast.loading("Loading...")
        setLoading(true);

        try{
            await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passRef.current.value
            );
            toast.update(id, {render:"Check data", type:"info", isLoading:false, autoClose:2000});
            navigate('/app/home');
        }catch(error){
            if(error.code.includes("not-found")){
                toast.update(id, {render:"Sorry, account not found", type:"error", isLoading:false, autoClose:3000});
                navigate('/');
                return;
            }else if(error.code.includes("wrong-password")){
                toast.update(id, {render:"Email or password not correct", type:"error", isLoading:false, autoClose:3000});
                navigate('/');
                return;
            }
            toast.update(id, {render:"Error", type:"error", isLoading:false, autoClose:3000});
            navigate('/');
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

      <div className="lg:grid lg:grid-cols-2 bg-white lg:bg-transparent">
        <div className="flex flex-col justify-center h-screen bg-white w-full lg:w-11/12">
          <div className="w-48 top-0 -mt-[60px] mb-12">
              <img src={logo} alt="" />
          </div>
          <div className="flex flex-col px-10 lg:pl-28">
            <div className="w-72">
              <h1 className="text-3xl font-bold">Hello, Schemin👋</h1>
              <h2 className="text-md font-regular text-gray-400 mt-3">Welcome back! Please enter your details.</h2>
            </div>
            <form className="flex flex-col mt-10" onSubmit={loginHandler}>
              <label>
                Email
                <span className="text-red-500">*</span>
              </label>
              <input type="email" ref={emailRef} disabled={loading} className="inputStyle" required placeholder="Enter email" />
              <label className="mt-2">
                Password
                <span className="text-red-500">*</span>
              </label>
              <input type="password" ref={passRef} disabled={loading} className="inputStyle" required placeholder="Enter password" />

              <button disabled={loading} className={`btnPrimary mt-10 ${loading && 'opacity-75'}`} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex justify-center pr-14">
          <img src={ilustration} alt="ilustration 1" />
        </div>
      </div>
    </>
  );
};

export default Login;
