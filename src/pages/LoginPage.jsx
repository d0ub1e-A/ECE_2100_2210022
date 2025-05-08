import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidMail, isValidPassword, isValidName } from "../assets/checkInfo";

import MailIcon from '../components/MailIcon';
import PasswordIcon from '../components/PasswordIcon';
import PersonIcon from '../components/PersonIcon';

export default function LoginPage() {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);

  const [inLogInPage, setInLoginPage] = useState(true);
  const [wrongInput, setWrongInput] = useState([]);

  const navigateTo = useNavigate();

  // Get the greeting message
  function getMessage() {
    const now = new Date();

    if (now.getHours() >= 5 && now.getHours() < 12) return 'Morning';
    if (now.getHours() >= 12 && now.getHours() < 18) return 'Afternoon';
    if (now.getHours() >= 18 && now.getHours() < 22) return 'Evening';
    else return 'Night';
  }

  // Determine whether to switch dark mode or not
  const isDark = () => getMessage() === 'Evening' || getMessage() === 'Night';

  // Clear the unwanted input from user name
  function clearName(name) {
    const regex = /[^a-zA-Z0-9\']/g;

    return name.trim().replace(regex, ' ').replace(/\s+/g, ' ');
  }

  // Handles swapping of signup and login section
  function swapSignLogin() {
    setInLoginPage(prevCond => !prevCond);
    setWrongInput([]);
    formRef.current.reset();
    setTimeout(() => formRef.current[0].focus(), 300);
  }

  // Store user input
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userInput = Object.fromEntries(formData);
    
    isValidMail(userInput.email) ?
    setWrongInput(prevInputs => prevInputs.filter(input => input !== mailRef)) :
    setWrongInput(prevInputs => wrongInput.includes(mailRef) ? [...prevInputs] : [...prevInputs, mailRef]);
    
    isValidPassword(userInput.password) ?
    setWrongInput(prevInputs => prevInputs.filter(input => input !== passRef)) :
    setWrongInput(prevInputs => wrongInput.includes(passRef) ? [...prevInputs] : [...prevInputs, passRef]);
    
    if(!inLogInPage) {
      isValidPassword(clearName(userInput.name)) ?
        setWrongInput(prevInputs => prevInputs.filter(input => input !== nameRef)) :
        setWrongInput(prevInputs => wrongInput.includes(nameRef) ? [...prevInputs] : [...prevInputs, nameRef]);
    }

    // Demonstrtes the post method
    // console.log(inLogInPage ? userInput : {
    //   ...userInput,
    //   name: clearName(userInput.name)
    // });

    if(inLogInPage) {
      if (isValidMail(userInput.email) && isValidPassword(userInput.password)) {
        e.currentTarget.reset();
        setWrongInput([]);
      }
    }
    else {
      if (isValidMail(userInput.email) && isValidPassword(userInput.password) && isValidName(clearName(userInput.name))) {
        e.currentTarget.reset();
        setWrongInput([]);
      }
    }
  }

  useEffect(() => {
    inLogInPage ? mailRef.current?.focus() : nameRef.current?.focus();
    document.title = `Quick Notes - Never Lose Your Ideas`;
  }, []);

  return (
    <div className={`h-screen flex flex-col gap-5 items-center justify-center ${isDark() && 'bg-slate-800'}`}>

      {/* App name + link to go to home page */}
      <Link to={`/`}>
        <h1
          title="Go back to home page"
          className={`text-6xl md:text-7xl text-center -mt-10 bg-transparent ${isDark() ? "text-white" : "text-slate-800"} font-bold font-[roboto] hover:scale-110 transition duration-300`}
        >Quick Notes</h1>
      </Link>

      <div className={`flex flex-col-reverse gap-6 md:gap-0 shadow-2xl bg-indigo-600 rounded-xl transition duration-300 ${inLogInPage ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

        <div className={`w-full py-8 px-5 relative flex flex-col gap-5 text-[1rem] md:text-[1.1rem] bg-slate-50 rounded-lg ${inLogInPage ? 'rounded-tr-[10rem] rounded-br-none animate-slide-from-left' : 'rounded-tl-[10rem] rounded-bl-none animate-slide-from-right'}`}>

          {/* Login + Signup form */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={`flex flex-col gap-5 relative ${inLogInPage ? 'animate-slide-from-left' : 'animate-slide-from-right'}`}
          >

            <h2 className={`text-center font-bold mb-3 text-3xl`}>{inLogInPage ? 'Login' : 'Sign Up'}</h2>

            {!inLogInPage && (
              <label>
                <span className="flex gap-2 items-center"><PersonIcon />Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="e.g. Abdur Rahman"
                  className={`border-b-2 ${wrongInput.includes(nameRef) ? 'border-red-600' : 'border-gray-400 focus:border-blue-700'} transition-all duration-300 outline-none py-2 w-full`}
                />
                {wrongInput.includes(nameRef) &&
                  <p className={`text-red-500 text-xs md:text-sm py-1`}>Name can't be empty</p>
                }
              </label>
            )}

            <label>
              <span className="flex gap-2 items-center"><MailIcon />Mail</span>
              <input
                required
                type="email"
                name="email"
                ref={mailRef}
                placeholder="e.g. yourname@example.com"
                className={`border-b-2 ${wrongInput.includes(mailRef) ? 'border-red-600' : 'border-gray-400 focus:border-blue-700'} transition-all duration-300 outline-none py-2 text-md w-full`}
              />
              {wrongInput.includes(mailRef) &&
                <p className={`text-red-500 text-xs md:text-sm py-1`}>Please enter a valid mail</p>
              }
            </label>

            <label>
              <span className="flex gap-2 items-center"><PasswordIcon />Password</span>
              <input
                required
                type="password"
                name="password"
                ref={passRef}
                className={`border-b-2 ${wrongInput.includes(passRef) ? 'border-red-600' : 'border-gray-400 focus:border-blue-700'} transition-all duration-300 outline-none py-2 w-full`}
              />
              {wrongInput.includes(passRef) &&
                <p className={`text-red-500 text-xs md:text-sm py-1`}>Need at least 8 characters</p>
              }
            </label>

            <button
              // onClick={() => navigateTo('/notes')} // This should not be here. rather it will interact with backend
              className="text-white cursor-pointer bg-slate-800 py-1 rounded-3xl hover:shadow-xl"
            >{inLogInPage ? 'Login' : 'Register'}</button>

          </form>

          {/* Button for jumping between login and signup section */}
          <div className="flex  gap-3 justify-center text-[.9rem]">
            <span>{inLogInPage ? 'Don\'t have ' : 'Already have '}an account?</span>
            <button
              onClick={swapSignLogin}
              className="text-indigo-600 cursor-pointer hover:scale-125 transition duration-200"
            >{inLogInPage ? 'Sign Up' : 'Login'}</button>
          </div>

        </div>

        {/* Welcome Message Section. Doesn't change with any value in state */}
        <div className={`w-full p-4 md:p-0 relative flex items-center ${inLogInPage ? 'animate-slide-from-right' : 'animate-slide-from-left'}`}>
          <h2 className="text-center text-white font-bold text-5xl md:text-6xl">Good {getMessage()}</h2>
        </div>

      </div>
    </div>
  );
}