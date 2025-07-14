import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidMail, isValidPassword, isValidName } from "../assets/util/UtilCheckInfo";
import { api } from "../assets/util/UtilApi";

import MailIcon from '../assets/icon/IconMail';
import PasswordIcon from '../assets/icon/IconPassword';
import PersonIcon from '../assets/icon/IconPerson';
import { GlobalContext } from "../App";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const mailRef = useRef(null);
  const passRef = useRef(null);
  const passSectionRef = useRef(null); console.log(passSectionRef);
  const navTo = useNavigate();
  const { notifyUser } = useContext(GlobalContext);

  const [inLogInPage, setInLoginPage] = useState(true);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passSectionFocuesd, setPassSectionFocuesd] = useState(false);

  document.title = inLogInPage ? `Login` : `Sign Up`;

  // Get the greeting message
  function getMessage() {
    const now = new Date();

    if (now.getHours() >= 5 && now.getHours() < 12) return 'Morning';
    if (now.getHours() >= 12 && now.getHours() < 18) return 'Afternoon';
    if (now.getHours() >= 18 && now.getHours() < 22) return 'Evening';
    else return 'Night';
  }

  // Clear the unwanted input from user name
  const clearName = name => name.trim().replace(/[^a-zA-Z0-9\']/g, ' ').replace(/\s+/g, ' ');

  // Shows the incorrect input warning
  const checkIfWrong = (isValid, inputRef) =>
    isValid ?
      setWrongInputs(prevInputs => prevInputs.filter(input => input !== inputRef)) :
      setWrongInputs(prevInputs => wrongInputs.includes(inputRef) ? [...prevInputs] : [...prevInputs, inputRef]);

  // function to send login data
  async function sendLoginInfo(email, password, e) {
    const message = {
      200: 'Successfully logged in.',
      400: 'Bad request. Please try again!',
      401: 'Check your login info and try again.',  
      500: 'Internal server error. Please try again!'
    }

    try {
      const loginRes = await api.post(`/auth/login`, {
        email: email,
        password: password,
      });

      if (loginRes.status === 200) {
        navTo('/me/notes');
        notifyUser('success', message[loginRes.status]);
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);

      if (error.status === 400) notifyUser('error', message[error.status]);
      if (error.status === 401) notifyUser('error', message[error.status]);
      if (error.status === 500) notifyUser('error', message[error.status]);
    }
  }

  // function to send signup data
  async function sendSignupInfo(name, email, password, e) {
    const message = {
      201: 'Account has been created successfully',
      400: 'Bad request. Please try again!',
      401: 'Your email is unavailable. Use another email.',
      500: 'Internal server error. Please try again!'
    }

    try {
      const signupRes = await api.post(`/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });

      if (signupRes.status === 201) {
        navTo('/me/notes');
        notifyUser('success', message[signupRes.status]);
        e.currentTarget.reset();
      }
    }
    catch (error) {
      console.error(error);

      if (error.status === 400) notifyUser('error', message[error.status]);
      if (error.status === 401) notifyUser('error', message[error.status]);
      if (error.status === 500) notifyUser('error', message[error.status]);
    }
  }

  // Store user input
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userInput = Object.fromEntries(formData);

    const name = clearName(userInput.name || '');
    const email = userInput.email;
    const password = userInput.password;

    const mailValid = inLogInPage ? true : isValidMail(email);
    const passValid = inLogInPage ? true : isValidPassword(password);
    const nameValid = isValidName(name);

    checkIfWrong(mailValid, mailRef);
    checkIfWrong(passValid, passRef);
    if(!inLogInPage) checkIfWrong(nameValid, nameRef);

    if (inLogInPage) sendLoginInfo(email, password);
    else {
      if (mailValid && passValid && nameValid) {
        sendSignupInfo(name, email, password);
      }
    }
  }

  // toggles the password visibility
  function togglePasswordVisibility() {
    setShowPassword(prev => !prev);

    const input = document.querySelector('input[type="text"], input[type="password"]');
    
    setTimeout(() => {
      if(input) input.selectionStart = input.selectionEnd = input.value.length;
    }, 0)
  }

  // Refreshes the whole page everytime page appears
  useEffect(() => {
    inLogInPage ? mailRef.current?.focus() : nameRef.current?.focus();
    setWrongInputs([]);
    formRef.current.reset();
  }, [inLogInPage]);

  return (
    <div className={`flex flex-col items-center justify-center h-full w-full bg-indigo-50 dark:bg-slate-700`}>

      {/* The whole section of login content */}
      <div className={`flex flex-col-reverse gap-6 md:gap-0 shadow-2xl bg-indigo-600 rounded-xl transition-all ${inLogInPage ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

        {/* Login + Signup form */}
        <div className={`w-full py-8 px-5 flex flex-col gap-5 text-[1rem] md:text-[1.1rem] bg-slate-50 rounded-lg ${inLogInPage ? 'rounded-tr-[10rem] rounded-br-none animate-slide-from-left' : 'rounded-tl-[10rem] rounded-bl-none animate-slide-from-right'} transition-all duration-700`}>

          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={`flex flex-col gap-5`}
          >

            <h2
              tabIndex={-1}
              className={`text-center font-bold mb-3 text-3xl`}
            >{inLogInPage ? 'Login' : 'Sign Up'}</h2>

            {!inLogInPage && (
              <label>
                <span className="flex gap-2 items-center">
                  <PersonIcon />Name
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  ref={nameRef}
                  placeholder="e.g. Abdur Rahman"
                  className={`border-b-2 ${wrongInputs.includes(nameRef) ? 'border-red-600' : 'border-gray-400 focus:border-blue-700'} transition-all duration-300 outline-none py-2 w-full`}
                />
                {wrongInputs.includes(nameRef) &&
                  <p className={`text-red-500 text-xs md:text-sm py-1`}>Name can't be empty</p>
                }
              </label>
            )}

            <label>
              <span className="flex gap-2 items-center">
                <MailIcon />Mail
              </span>
              <input
                required
                type="email"
                name="email"
                defaultValue={`ahnaf_abid@gmail.com`}
                ref={mailRef}
                placeholder="e.g. yourname@example.com"
                className={`border-b-2 ${wrongInputs.includes(mailRef) ? 'border-red-600' : 'border-gray-400 focus:border-blue-700'} transition-all duration-300 outline-none py-2 text-md w-full`}
              />
              {wrongInputs.includes(mailRef) &&
                <p className={`text-red-500 text-xs md:text-sm py-1`}>Please enter a valid mail</p>
              }
            </label>

            <label>
              <span className="flex gap-2 items-center">
                <PasswordIcon />Password
              </span>
              <div
                tabIndex={0}
                ref={passSectionRef}
                onFocus={() => setPassSectionFocuesd(true)}
                onBlur={() => setPassSectionFocuesd(false)}
                className={`flex items-center border-b-2 transition-all ${wrongInputs.includes(passRef) && 'border-red-600'} ${passSectionFocuesd ? 'border-blue-700' : 'border-gray-400'}`}>
                <input
                  required
                  type={`${showPassword ? 'text' : 'password'}`}
                  name="password"
                  ref={passRef}
                  className={`outline-none py-2 w-full`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`text-grey-mid`}
                >{showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {wrongInputs.includes(passRef) && 
                <p className={`text-red-mid text-xs md:text-sm py-1`}>Need at least 8 characters</p>
              }
            </label>

            <button className="text-white bg-slate-800 py-1 rounded-3xl">
              {inLogInPage ? 'Login' : 'Register'}
            </button>
          </form>

          {/* Button for jumping between login and signup section */}
          <div className="flex gap-3 justify-center text-[.9rem]">
            <span>{inLogInPage ? 'Don\'t have ' : 'Already have '}an account?</span>
            <button
              onClick={() => setInLoginPage(prevCond => !prevCond)}
              className="text-indigo-600 cursor-pointer hover:scale-125 transition"
            >{inLogInPage ? 'Sign Up' : 'Login'}</button>
          </div>

        </div>

        {/* Welcome Message Section. Doesn't change with any value in state */}
        <div className={`w-full p-4 md:p-0 flex items-center ${inLogInPage ? 'animate-slide-from-right' : 'animate-slide-from-left'} transition-all`}>
          <h2 className="text-center text-white font-bold text-5xl md:text-6xl">Good {getMessage()}</h2>
        </div>

      </div>

    </div>
  );
}