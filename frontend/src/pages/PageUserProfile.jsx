import { useContext, useEffect, useState } from "react";
import { api } from "../assets/util/UtilApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./layout/LayoutUser";
import { Edit2, LogOut, User2, CircleX, Mail, Lock } from "lucide-react";

export default function UserProfilePage() {
  const navTo = useNavigate();
  const { userInfo, userNotes } = useContext(UserContext);

  const [inEditMode, setInEditMode] = useState(false);
  const [changedName, setChangedName] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [changedPassword, setChangedPassword] = useState('');

  const numberOfNotes = userNotes.reduce((acc, note) => acc + note.notes.length, 0);
  const numberOfTags = userNotes.length;

  async function updateUserProfile(e) {
    try {

    }
    catch (error) {

    }
  }

  async function logout() {
    try {
      const logoutRes = await api.post('/auth/logout');

      logoutRes.status === 200 & navTo('/login');
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteAccount() {
    try {
      const deleteAccRes = await api.delete('/user');

      deleteAccRes.status === 200 && navTo('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`h-full flex justify-center items-center bg-gradient-to-r from-purple-lite to-purple-500 p-16`}>

      <section className={`dark:text-gray-200 p-8 rounded-[20px] shadow-xl w-svw md:w-[50svw] bg-[whitesmoke]/90`}>

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
          <div className={`cal-sans flex flex-col gap-15`}>

            {/* user name + edit profile button */}
            <div className={`flex justify-between items-center`}>
              <div className={`flex items-center gap-3`}>
                <div className={`bg-gradient-to-br from-purple-lite to-purple-500 rounded-[10px] w-fit p-3`}>
                  <User2
                    size={35}
                    className={`text-white`}
                  />
                </div>
                <div>
                  <h1 className={`text-[1.2rem]`}>{userInfo.name}</h1>
                  <p className={`text-grey-mid text-[.8rem]`}>Profile Settings</p>
                </div>
              </div>
              <button
                onClick={() => setInEditMode(prev => !prev)}
                className={`border-grey-mid border p-2 rounded-[10px] profile-edit-button`}
              ><Edit2 className={`text-grey-mid`}/>
              </button>
            </div>

            {/* email section */}
            <div className={`bg-white p-5 rounded-[15px]`}>
              <h3 className={`flex gap-1 items-center my-2.5`}><Mail className={`text-indigo-500`}/>Email</h3>
              <h2 className={`truncate`}>{userInfo.email}</h2>
            </div>

            {/* password section */}
            <div className={`bg-white p-5 rounded-[15px]`}>
              <h3 className={`flex gap-1 items-center my-2.5`}><Lock className={`text-indigo-500`}/>Password</h3>
              <input
                disabled
                type="password"
                defaultValue={`password`}
                className={`outline-none`}
              />
            </div>

            {/* Note Stat section */}
            <div className={`flex justify-around bg-blue-100/80 p-5 rounded-[15px]`}>
              <div className={`text-center`}>
                <p className={`text-[1.7rem]`}>{numberOfNotes}</p>
                <p className={`text-[.8rem] text-grey-mid`}>Total Notes</p>
              </div>
              <div className={`text-center`}>
                <p className={`text-[1.7rem]`}>{numberOfTags}</p>
                <p className={`text-[.8rem] text-grey-mid`}>Tags Used</p>
              </div>
            </div>

            {/* logout + account deletion button */}
            <div className={`flex justify-between gap-3`}>
              <button
                onClick={logout}
                className={`px-2 py-1.5 cal-sans rounded-[15px] border w-full flex items-center justify-center gap-2`}
              ><LogOut />Logout</button>
              <button
                onClick={deleteAccount}
                className={`border px-2 py-1.5 cal-sans rounded-[15px] w-full flex items-center justify-center gap-2`}
              ><CircleX />Delete Account</button>
            </div>

          </div>
        }
      </section>

    </div>
  );
}