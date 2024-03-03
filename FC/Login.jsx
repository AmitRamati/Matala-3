import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2'
import { json } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Login(props) {

    const [loginData, setLoginData] = useState({
        UserName: '',
        Password: '',
    });
    const [errors, setErrors] = useState({});
    const [LoginNow, setLoginNow] = useState(false);
    //const [UserRegiList, setUserRegiList] = useState([]);


    const [adminU, setAdminU] = useState('admin');
    const [adminP, setAdminP] = useState('Ad12343!');


    const registeredUsers = JSON.parse(localStorage.getItem('Users')) || [];

    const validateValues = (inputValues) => {
        let errors = {};

        if (!inputValues.UserName.trim()) {
            errors.UserName = 'Username is required';
            return errors;
        }

        if (!inputValues.Password.trim()) {
            errors.Password = 'Password is required';
            return errors;
        }


        if (registeredUsers.some(user => user.UserName === inputValues.UserName)) {

        }
        else if (inputValues.UserName != "") {
            errors.UserName = "User Name not exist. please sign up"
        }

        if (registeredUsers.some(user => user.UserName === inputValues.UserName && user.Password != inputValues.Password && inputValues.Password != "")) {
            errors.Password = "Password is incorect. please try again"
        }

        
        
        return errors;
    }


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const loginUser = (event) => {
        event.preventDefault();
        
        const userExists = registeredUsers.some(user => user.UserName === loginData.UserName && user.Password === loginData.Password);
        
        setErrors(validateValues(loginData));
        setLoginNow(true);


    };

    const finishLogin = () => {
        const userLogin = registeredUsers.find(user => user.UserName === loginData.UserName && user.Password === loginData.Password);
        
        let SwalMes = loginData.UserName;
        Swal.fire({
            title: "Hello " + SwalMes,
            text: "Login Succeeded!",
            icon: "success"
        });

        let found = userLogin;
        sessionStorage.setItem("user", JSON.stringify(found));
        props.sendUser(found);

        if (userLogin.UserName == adminU && userLogin.Password == adminP) {
            props.sendSign("AdminS");
        }
        else {
            props.sendSign("login");
        }


        setLoginData({
            UserName: "",
            Password: ""

        });
    };

    useEffect(() => {
        
        if (Object.keys(errors).length == 0 && LoginNow) {
            finishLogin();
        }
    }, [errors]);

    return (
        <div>

            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Item>
                                <TextField id="UsernameTB" label="User Name" variant="standard" type="text" color="secondary" name="UserName" value={loginData.UserName} onChange={handleChange} /><br></br><br></br>
                                {errors.UserName ? (
                                    <p className="error">
                                        {errors.UserName}
                                    </p>
                                ) : null}
                                <TextField id="PassTB" label="Password" variant="standard" type="password" color="secondary" name="Password" value={loginData.Password} onChange={handleChange} /><br></br><br></br>
                                {errors.Password ? (
                                    <p className="error">
                                        {errors.Password}
                                    </p>
                                ) : null}
                            </Item>
                        </Grid>
                        <Grid item xs={8}>
                            <Item>
                                <Button color="secondary" onClick={loginUser}>Login</Button>
                                <Button color="secondary" onClick={() => props.sendSign("sign-Up")}>SIGN-UP</Button>

                            </Item>
                        </Grid>
                    </Grid>

                </Box>

            </form>
        </div>
    )
}
