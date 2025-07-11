import ErrorUI from "../ui/UIError";
import SuccessUI from "../ui/UISuccess";

export default function Toaster({showToaster, type, text}) {console.log(type, text);
  const bannerStyle = {
    success: 'success-banner',
    error: 'error-banner',
  }

  const iconOf = {
    success: <SuccessUI/>,
    error: <ErrorUI/>,
  }
  
  return(
    <div className={`bg-toaster-bg-light dark:bg-toaster-bg-dark fixed top-[4.5rem] p-7 flex items-center gap-5 rounded-tl-[20px] rounded-bl-[20px] z-90 transition-all toaster border-[1.5px] border-grey-lite ${showToaster ? 'right-0' : '-right-full'}`}>
      <div className={`p-1.5 rounded-full ${bannerStyle[type] || 'success-banner'}`}>
      {iconOf[type] || <SuccessUI/>}
      </div>
      <p className={`text-[1.15rem] font-[500] fira-mono text-toaster-bg-dark dark:text-toaster-bg-light`}>{text || 'Successfully updated'}</p>
    </div>
  );
}