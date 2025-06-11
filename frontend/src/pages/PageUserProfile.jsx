import { useEffect, useState } from "react";

import EditProfileIcon from "../assets/icon/IconEditProfile";
import { api } from "../assets/util/UtilApi";

export default function UserProfilePage() {
  const [inEditMode, setInEditMode] = useState(false);
  const [changedName, setChangedName] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [changedPassword, setChangedPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileRes = await api.get(`/user`);console.log(profileRes);

        setUserInfo(profileRes.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, []);

  async function updateUserProfile(e) {
    try {

    }
    catch (error) {

    }
  }

  return (
    <div className={`h-full flex justify-center items-center`}>

      <section className={`border dark:text-gray-200 p-5 rounded-md shadow-xl w-svw md:w-[50svw]`}>

        {inEditMode ?
          <form
            onSubmit={updateUserProfile}
            className={`flex flex-col gap-4 fira-mono`}
          >
            
            <label className={`text-2xl`}>Name</label>
            <input
              type="text"
              onChange={e => setChangedName(e.target.value)}
              defaultValue={userInfo.name}
              className={`px-1 py-1.5 rounded border border-gray-200`}
            />

            <label className={`text-2xl`}>Email</label>
            <input
              type="email"
              onChange={e => setChangedEmail(e.target.value)}
              defaultValue={userInfo.email}
              className={`px-1 py-1.5 rounded border border-gray-200`}
            />

            <label className={`text-2xl`}>Password</label>
            <input
              type="password"
              onChange={e => setChangedPassword(e.target.value)}
              defaultValue={userInfo.password}
              className={`px-1 py-1.5 rounded border border-gray-200`}
            />

            <div className={`flex justify-between gap-12`}>
              <button
                onClick={() => setInEditMode(false)}
                className={`bg-emerald-600 p-2 rounded-lg w-full text-xl text-gray-100 font-medium`}
              >Save</button>
              <button
                type="button"
                onClick={() => setInEditMode(false)}
                className={`bg-red-400 p-2 rounded-lg w-full text-xl text-gray-100 font-medium`}
              >Cancel</button>
            </div>

          </form>
          :
          <div className={`cal-sans`}>
            <div className={`flex items-center justify-between mb-10 text-3xl sm:text-4xl md:text-5xl`}>
              <h1>{userInfo.name}</h1>
              <button
                onClick={() => setInEditMode(prev => !prev)}
                className={``}
              ><EditProfileIcon />
              </button>
            </div>

            <label className={`text-lg md:text-xl mb-7`}>Email</label>
            <h2 className={`text-xl sm:text-2xl mb-10 truncate`}>{userInfo.email}</h2>

            <label className={`text-lg md:text-xl mb-1 block`}>Password</label>
            <input 
              disabled
              type="password" 
              defaultValue={userInfo.password}
              className={`text-xl md:text-2xl outline-none`} 
            />
          </div>
        }
      </section>

    </div>
  );
}