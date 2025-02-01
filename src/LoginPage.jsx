import { useState } from "react";
import MailIcon from './components/MailIcon';
import PasswordIcon from './components/PasswordIcon';
import PersonIcon from './components/PersonIcon';
import './App.css';

export default function LoginPage() {
  const getHour = () => new Date().getHours();

  const getMessage = () => {
    if(getHour() >= 5 && getHour() < 12) { return 'Morning'; }
    else if(getHour() >= 12 && getHour() < 6) { return 'Afternoon'; }
    else if(getHour() >= 6 && getHour() < 10) { return 'Evening'; }
    else { return 'Night'; }
  }

  const isDark = () => getMessage() === 'Evening' || getMessage() ===  'Night';

  const [inLogInPage, setInLoginPage] = useState(true);
  

  return(
    <>
      <div className={`min-h-screen flex items-center justify-center ${isDark() && 'bg-slate-800'}`}>
        <div className={`flex shadow-2xl bg-indigo-600 rounded-2xl`}>
          
          {/* Section that will be change with the value with the changing state */}
          
          <div className={`w-full flex flex-col gap-5 text-[1.1rem] bg-slate-50 py-8 px-5 ${inLogInPage ? 'rounded-tr-[10rem] rounded-l-xl' : 'rounded-tl-[10rem] rounded-r-xl translate-x-full'} transition duration-300`}>
            
            <form className={`flex flex-col gap-5 relative ${inLogInPage ? 'login-slide-in' : 'signup-slide-in'}`}>

              <h2 className={`text-center font-bold mb-3 text-3xl`}>{inLogInPage ? 'Login' : 'Sign Up'}</h2>

              {!inLogInPage && (
                <legend className={``}> {/* name */}
                  <div className="flex gap-2 items-center"><PersonIcon></PersonIcon>Name</div>
                  <input required type="text" placeholder="e.g. Abdur Rahman" className="border-b-2 outline-none py-2 w-full" />
                </legend>
              )}

              <legend className={``}> {/* email */}
                <div className="flex gap-2 items-center"><MailIcon></MailIcon>Mail</div>
                <input required type="email" placeholder="e.g. yourname@example.com" className="border-b-2 outline-none py-2 text-md w-full" />
              </legend>

              <legend className={``}> {/* password */}
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

          <div className={`w-full flex items-center ${!inLogInPage && '-translate-x-full'} transition duration-200`}>
            <h1 className="text-center text-white font-bold text-6xl">Good {getMessage()}</h1>
          </div>
        </div>
      </div>
    </>
  );
}