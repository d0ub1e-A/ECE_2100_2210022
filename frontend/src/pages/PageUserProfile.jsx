import { useContext, useEffect, useState } from "react";
import { api } from "../assets/util/UtilApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./layout/LayoutUser";
import { Edit2, LogOut, User2, CircleX, Mail, Lock, User, Check, LockOpen } from "lucide-react";
import { isValidPassword } from "../assets/util/UtilCheckInfo";
import { GlobalContext } from "../App";

import DeleteAccDialog from "../components/modal/ModalDeleteAccount";

export default function UserProfilePage() {
  const navTo = useNavigate();
  const { userInfo, userNotes, setRefetch } = useContext(UserContext);
  const {notifyUser} = useContext(GlobalContext);

  const [inEditMode, setInEditMode] = useState(false);
  const [changedName, setChangedName] = useState('');
  const [changedEmail, setChangedEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeTrigger, setPasswordChangeTrigger] = useState(false);
  const [showPassErrMsg, setShowPassErrMsg] = useState(false);
  const [showDeleteAccDialog, setShowDeleteAccDialog] = useState(false);

  const numberOfNotes = userNotes.reduce((acc, note) => acc + note.notes.length, 0);
  const numberOfTags = userNotes.length;

  useEffect(() => setShowPassErrMsg(false), [passwordChangeTrigger]);

  async function updateUserProfile(e) {
    e.preventDefault();

    try {
      const nameEmailRes = await api.patch(`/user`, {
        name: changedName,
        email: changedEmail
      });

      if (nameEmailRes.status === 200) {
        setInEditMode(false);
        setRefetch(prev => !prev);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  async function updatePassword(e) {
    e.preventDefault();

    if (isValidPassword(newPassword)) {
      setShowPassErrMsg(false);

      try {
        const passRes = await api.patch(`/user/password`, {
          old_password: oldPassword,
          new_password: newPassword
        });

        if (passRes.status === 200) {
          setPasswordChangeTrigger(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    else {
      setShowPassErrMsg(true);
    }
  }

  async function logout() {
    try {
      const logoutRes = await api.post('/auth/logout');

      logoutRes.status === 200 & navTo('/login');
    } catch (error) {
      console.error(error);

      if(error.status === 500) {notifyUser('error', 'Internal server error. Please try again!')}
    }
  }

  async function deleteAccount() {
    const message = {
      200: 'Account has been deleted successfully.',
      500: 'Internal server error. Please try again!'
    }
    
    try {
      const deleteAccRes = await api.delete('/user');

      if(deleteAccRes.status === 200) {
        navTo('/login');
        notifyUser('success', message[deleteAccRes.status]);
      }
    } catch (error) {
      console.error(error);

      if(error.status === 401) navTo(`/login`);
      if(error.status === 500) notifyUser('error', message[error.status]);
    }
  }

  return (
    <div className={`h-full flex justify-center items-center bg-white dark:bg-black p-16`}>
      <DeleteAccDialog
        showDeleteAccDialog={showDeleteAccDialog}
        deleteAccount={deleteAccount}
        setShowDeleteAccDialog={setShowDeleteAccDialog}
      />

      <section className={`p-8 ${showDeleteAccDialog ? 'brightness-75' : ''} rounded-[20px] shadow-xl w-svw md:w-[50svw] bg-[whitesmoke]/90 transition-all`}>

        {inEditMode ?
          <form
            onSubmit={updateUserProfile}
            className={`flex flex-col gap-4 fira-mono p-5`}
          >

            <label className={`flex items-center gap-3 text-grey-mid`}><User />Name</label>
            <input
              type="text"
              onChange={e => setChangedName(e.target.value)}
              defaultValue={userInfo.name}
              className={`px-4.5 py-2 text-[1.2rem] border border-grey-mid rounded-[15px]`}
            />

            <label className={`flex items-center gap-3 text-grey-mid`}><Mail />Email</label>
            <input
              type="email"
              onChange={e => setChangedEmail(e.target.value)}
              defaultValue={userInfo.email}
              className={`px-4.5 py-2 text-[1.2rem] rounded-[15px] border border-grey-mid`}
            />

            <div className={`flex justify-between gap-12 mt-10`}>
              <button
                onClick={() => { updateUserProfile }}
                className={`p-2 rounded-[15px] update-profile w-full text-xl text-grey-bold border border-grey-mid flex items-center justify-center gap-3`}
              ><Check className={`text-green-600`} />Save</button>
              <button
                type="button"
                onClick={() => setInEditMode(false)}
                className={`flex items-center gap-3 justify-center bg-red-mid p-2 rounded-[15px] cancel-edit w-full text-xl text-gray-100 font-medium`}
              ><CircleX />Cancel</button>
            </div>

          </form> :
          <div className={`cal-sans flex flex-col gap-10`}>

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
              ><Edit2 className={`text-grey-mid`} />
              </button>
            </div>

            {/* email section */}
            <div className={`bg-white p-5 rounded-[15px]`}>
              <h3 className={`flex gap-1 items-center my-2.5`}><Mail className={`text-indigo-500`} />Email</h3>
              <h2 className={`truncate`}>{userInfo.email}</h2>
            </div>

            {/* password section */}
            {passwordChangeTrigger ?
              <form
                onSubmit={updatePassword}
                className={`flex flex-col gap-3`}
              >
                <label className={`flex items-center gap-3 text-grey-mid`}><Lock />Old Password</label>
                <input
                  type="password"
                  onChange={e => setOldPassword(e.target.value)}
                  className={`px-4.5 py-2 text-[1.2rem] rounded-[15px] border border-grey-mid`}
                />
                <label className={`flex items-center gap-3 text-grey-mid`}><LockOpen />New Password</label>
                <input
                  type="password"
                  onChange={e => setNewPassword(e.target.value)}
                  className={`px-4.5 py-2 text-[1.2rem] rounded-[15px] border border-grey-mid`}
                />
                <p className={`text-red-mid text-xs md:text-sm py-1 ${showPassErrMsg ? 'scale-100 translate-x-0' : 'scale-0 translate-x-5'} transition-all`}>Need at least 8 characters</p>

                <div className={`flex justify-between gap-3`}>
                  <button
                    onClick={updatePassword}
                    className={`px-2 py-1.5 cal-sans rounded-[15px] border border-grey-lite logout text-grey-bold w-full flex items-center justify-center gap-2`}
                  ><Check />Update</button>
                  <button
                    onClick={() => { setPasswordChangeTrigger(false) }}
                    type="button"
                    className={`delete-account px-2 py-1.5 cal-sans bg-red-mid text-white rounded-[15px] w-full flex items-center justify-center gap-2`}
                  ><CircleX />Cancel</button>
                </div>
              </form> :
              <div className={`bg-white p-5 rounded-[15px] relative`}>
                <h3 className={`flex gap-1 items-center my-2.5`}><Lock className={`text-indigo-500`} />Password</h3>
                <input
                  disabled
                  type="password"
                  defaultValue={`password`}
                  className={`outline-none`}
                />
                <button
                  onClick={() => { setPasswordChangeTrigger(true) }}
                  className={`absolute border border-grey-mid/50 change-password px-3 py-1.5 text-[15px] rounded-[10px] right-4 top-1/2 -translate-y-1/2 bg-blue-100/60`}>Change</button>
              </div>
            }

            {/* Note Stat section */}
            <div className={`bg-blue-200/50 rounded-[15px]`}>
              <div className={`flex justify-around p-2.5 rounded-[15px] bg-clip-text bg-gradient-to-r from-blue-600 to-red-600`}>
                <div className={`text-center`}>
                  <p className={`text-[2rem] font-bold text-transparent`}>{numberOfNotes}</p>
                  <p className={`text-[.8rem] text-grey-mid`}>Total Notes</p>
                </div>
                <div className={`text-center`}>
                  <p className={`text-[2rem] font-bold text-transparent`}>{numberOfTags}</p>
                  <p className={`text-[.8rem] text-grey-mid`}>Tags Used</p>
                </div>
              </div>
            </div>

            {/* logout + account deletion button */}
            <div className={`flex justify-between gap-3`}>
              <button
                onClick={logout}
                className={`px-2 py-1.5 cal-sans rounded-[15px] border border-grey-lite logout text-grey-bold w-full flex items-center justify-center gap-2`}
              ><LogOut />Logout</button>
              <button
                onClick={() => {setShowDeleteAccDialog(true)}}
                className={`delete-account px-2 py-1.5 cal-sans bg-red-mid text-white rounded-[15px] w-full flex items-center justify-center gap-2`}
              ><CircleX />Delete Account</button>
            </div>

          </div>
        }
      </section>
    </div>
  );
}