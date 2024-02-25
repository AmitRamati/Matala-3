import { useEffect, useState } from 'react'
import './App.css'
import Register from '../FC/Register'
import Login from '../FC/Login'
//import FCApp from '../FC/FCApp'
import Profile from '../FC/Profile'
import EditDetails from '../FC/EditDetails'
import SystemAdmin from '../FC/SystemAdmin'
import Admmm from '../FC/Admmm'
import Blah from '../FC/Blah'
//import FCRegi from '../FC/FCRegi'


function App() {


  const [count, setCount] = useState(0);

  const [user, setUser] = useState("");
  const [users, setUsers] = useState(localStorage.length == 0 ? "" : JSON.parse(localStorage["Users"]));
  const [session, setSession] = useState(sessionStorage.length == 0 ? "" : JSON.parse(sessionStorage["user"]));
  const [sign, setSign] = useState("sign-in");
  const [UserToEdit, setUserToEdit] = useState("");

  // const [adminU, setAdminU] = useState('Admin');
  // const [adminP, setAdminP] = useState('Ad12343!');


  useEffect(() => {
    setUsers(localStorage.length == 0 ? "" : JSON.parse(localStorage["Users"]));
    setSession(sessionStorage.length == 0 ? "" : JSON.parse(sessionStorage["user"]));
  }, [])


  //מקבל איזה כפתור לחצו הרשמה/כניסה 
  const getSign = (sign) => {
    setSign(sign);
    //setprofileS("להתנתק");

  }

  const getUser = (UserData) => {
    setUser(UserData);
  }

  const LogoutFunc = (logout) => {
    setSign(logout);

  }

  const userToEdit = (userToEdit) => {
    setUserToEdit(userToEdit);
  }

  const goEdit = (edit) => {
    setSign(edit);
  }

  const UserProf = (userProf) => {
    setUser(userProf);
  }

  // {sign == "AdminS" ? <Admmm users={users}></Admmm> : ""}



  return (

    <>
            {sign == "sign-in" ? <Login sendUser={getUser} sendSign={getSign}></Login> : ""}

{sign == "sign-Up" ? <Register sendSign={getSign}></Register> : ""}

     {sign == "login" ? <Profile user={user} LogOutUser={LogoutFunc} sendUserToEdit={userToEdit} canEdit={goEdit}></Profile> : ""}

      {sign == "עדכון" ? <EditDetails user={UserToEdit} users={users} sendSign={getSign} userEdited={UserProf} ></EditDetails> : ""}

    {sign == "AdminS" ? <SystemAdmin users={users}></SystemAdmin> : ""}


    </>
  )
}

export default App
