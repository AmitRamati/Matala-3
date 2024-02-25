import React, { useState } from 'react'
import Login from './Login'
import Register from './Register';

export default function FCApp() {


    const [isRegistered, setIsRegistered] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
   


    const handleLogin = (fromRegis) => {
        console.log(fromRegis);
        setIsRegistered(true);
        setIsLogin(false);
       
    }

    return (
        <div>

            {isLogin ? (
                <Register regiToLogin={handleLogin}></Register>
            ) : null}



            {isRegistered ? (
                <Login></Login>
            ) : null}



        </div>
    )
}
