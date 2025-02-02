import { useState } from "react";
import { Link } from "react-router-dom";
import MailIcon from './components/MailIcon';
import PasswordIcon from './components/PasswordIcon';
import PersonIcon from './components/PersonIcon';
import './App.css';

export default function LoginPage() {
  const getHour = () => new Date().getHours();

  const getMessage = () => {
    if(getHour() >= 5 && getHour() < 12) { return 'Morning'; }
    else if(getHour() >= 12 && getHour() < 18) { return 'Afternoon'; }
    else if(getHour() >= 18 && getHour() < 22) { return 'Evening'; }
    else { return 'Night'; }
  }

  const isDark = () => getMessage() === 'Evening' || getMessage() ===  'Night';

  const [inLogInPage, setInLoginPage] = useState(true);
  

  return(
    <>
      <div className={`h-screen flex flex-col gap-5 items-center justify-center ${isDark() && 'bg-slate-800'}`}>
        <Link to={`/`}>
          <h1 className={`text-5xl md:text-7xl text-center -mt-10 bg-transparent ${isDark ? "text-white" : "text-[#1b1d3f]"} font-bold font-[roboto] hover:scale-110 transition`}>Quick Notes</h1>
        </Link>

        <div className={`flex flex-col-reverse gap-6 md:gap-0 md:flex-row shadow-2xl bg-indigo-600 rounded-2xl`}>

          {/* Section that will be changing with the value with the changing state */}

          <div className={`w-full flex flex-col gap-5 text-[1rem] md:text-[1.1rem] bg-slate-50 py-8 px-5 ${inLogInPage ? 'rounded-tr-[10rem] rounded-b-xl md:rounded-l-xl md:rounded-br-none' : 'rounded-tl-[10rem] rounded-b-xl md:rounded-r-xl md:rounded-bl-none md:translate-x-full'} transition duration-300`}>
            <form className={`flex flex-col gap-5 relative ${inLogInPage ? 'animate-slide-from-left' : 'animate-slide-from-right'}`}>
              <h2 className={`text-center font-bold mb-3 text-3xl`}>{inLogInPage ? 'Login' : 'Sign Up'}</h2>

              {!inLogInPage && (
                <legend> {/* name */}
                  <div className="flex gap-2 items-center"><PersonIcon></PersonIcon>Name</div>
                  <input required type="text" placeholder="e.g. Abdur Rahman" className="border-b-2 outline-none py-2 w-full" />
                </legend>
              )}
              <legend> {/* email */}
                <div className="flex gap-2 items-center"><MailIcon></MailIcon>Mail</div>
                <input required type="email" placeholder="e.g. yourname@example.com" className="border-b-2 outline-none py-2 text-md w-full" />
              </legend>
              <legend> {/* password */}
                <div className="flex gap-2 items-center"><PasswordIcon></PasswordIcon>Password</div>
                <input required type="password" placeholder="" className="border-b-2 outline-none py-2 mb-3 w-full" />
              </legend>

              <button type="submit" className="text-white cursor-pointer bg-slate-800 py-1 rounded-3xl hover:shadow-xl">{inLogInPage ? 'Login' : 'Register'}</button>
            </form>

            <div className="flex  gap-3 justify-center text-[.9rem]">
              <span>{inLogInPage ? 'Don\'t have ' : 'Already have '}an account?</span>
              <button className="text-indigo-600 cursor-pointer hover:scale-125 transition duration-200" onClick={() => setInLoginPage(!inLogInPage)}>{inLogInPage ? 'Sign Up' : 'Login'}</button>
            </div>
          </div>

          {/* Welcome Message Section. Doesn't change with any value in state */}

          <div className={`p-4 md:p-0 w-full flex items-center ${!inLogInPage && 'md:-translate-x-full'} transition duration-200`}>
            <h1 className="text-center text-white font-bold text-5xl md:text-6xl">Good {getMessage()}</h1>
          </div>

        </div>
      </div>
    </>
  );
}