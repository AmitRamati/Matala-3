import React, { useEffect, useState } from 'react';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Autocomplete } from '@mui/material';
import Swal from 'sweetalert2'





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Register(props) {
    const [inputFields, setInputFields] = useState({
        UserName: "",
        Password: "",
        ConfirmPassword: "",
        Image: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Date: "",
        City: "",
        Street: "",
        Number: ""
    });


    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [userSubmissions, setUserSubmissions] = useState([]);

    const cities = ['', 'ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אילת', 'נתניה', 'אשדוד', 'חולון', 'רמת גן', 'פתח תקווה'];

    const registeredUsers = JSON.parse(localStorage.getItem('Users')) || [];

    const validateValues = (inputValues) => {
        let errors = {};

        const isValid = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(inputValues.UserName);
        if (!isValid) {
            errors.UserName = "User Name must be in English";
        }

        if (inputValues.UserName.length > 60) {
            errors.UserName = "User Name must be less than 60 characters."
        }

        if (!inputValues.UserName.trim()) {
            errors.UserName = 'Username is required';
        }

        if (registeredUsers.some(user => user.UserName === inputValues.UserName)) {
            errors.UserName = "UserName is already exist. Please pick a different User Name"
        }

        const Passregex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{7,12}$/;
        if (!Passregex.test(inputValues.Password)) {
            errors.Password = "Password must be between 7 and 12 characters and include at least one special character, one uppercase letter, and one number."
        }

        if (inputValues.Password != inputValues.ConfirmPassword) {
            errors.ConfirmPassword = "Please insert the same Password."
        }



        const Nameregex = /^[a-zA-Z\s]*$/;
        if (!Nameregex.test(inputValues.FirstName)) {
            errors.FirstName = "Please enter a valid First Name"
        }
        if (!Nameregex.test(inputValues.LastName)) {
            errors.LastName = "Please enter a valid Last Name"
        }

        //check email validation - special charates
        const Emailregex = /^[a-zA-Z@._-]+\.com$/;
        if (!Emailregex.test(inputValues.Email)) {
            errors.Email = "Please enter a valid email address."
        }

        const currentDate = new Date();
        const selectedDate = new Date(inputValues.Date);
        const age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (isNaN(age) || age > 120) {
            errors.Date = "Please enter a valid date"
        }
        if (age < 18) {
            errors.Date = "You must be 18 years old"
        }

        if (inputValues.City == "") {
            errors.City = "Please pick City"
        }
        const Streetregex = /^[\u0590-\u05FF\s]+$/;
        if (!Streetregex.test(inputValues.Street)) {
            errors.Street = "Please insert street in Hebrew"
        }
        if (inputValues.Number < 0) {
            errors.Number = "Please enter a valid Number"
        }

        
        
        return errors;
    };


    //insert input- event 
    const handleChange = (e) => {
        if (e.target.name == "Image") {
           
        setInputFields({ ...inputFields, [e.target.name]: e.target.files[0] });
        }
        //     const file = e.target.files[0];
        //     if (file) {
        //         const reader = new FileReader();

        //         reader.onload = (event) => {
        //             // Set the image source to the base64 representation of the image
        //             setInputFields({ ...inputFields, [e.target.name]: event.target.result });
        //             //let image1 = event.target.result;
        //             // setImageSrc(event.target.result);
        //         };

        //         // Read the contents of the image file
        //         reader.readAsDataURL(file);
        //        // 
        //        // 

        //     }
        // }
        else{

        
            setInputFields({ ...inputFields, [e.target.name]: e.target.value });
            } 
        

    };

    const handleCityChange = (event, newValue) => {
        setInputFields((prevInputFields) => ({
            ...prevInputFields,
            City: newValue || ''
        }));
    };


    const registerUser = (event) => {

        event.preventDefault();
        setErrors(validateValues(inputFields));

        setSubmitting(true);



    };

    const finishSubmit = () => {
        Swal.fire({
            title: "Good job!",
            text: "Add User Succeeded!",
            icon: "success"
        });

        setInputFields({
            UserName: "",
            Password: "",
            ConfirmPassword: "",
            Image: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Date: "",
            City: "",
            Street: "",
            Number: ""
        });

        const NewUsers = [...registeredUsers, inputFields];
        setUserSubmissions(NewUsers);
        localStorage.setItem('Users', JSON.stringify(NewUsers));
        
        //props.MoveToLogin(true);
        //props.regiToLogin(NewUsers);
    };


    useEffect(() => {
        
        if (Object.keys(errors).length == 0 && submitting) {
            finishSubmit();
        }
    }, [errors]);








    return (
        <div>


            <form>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Item>
                                <TextField required id="UsernameTB" label="User Name" variant="standard" type="text" color="secondary" name="UserName" onChange={handleChange} value={inputFields.UserName} /><br></br><br></br>
                                {errors.UserName ? (
                                    <p className="error">
                                        {errors.UserName}
                                    </p>
                                ) : null}
                                <TextField required id="PassTB" label="Password" variant="standard" type="password" color="secondary" name="Password" onChange={handleChange} value={inputFields.Password} /><br></br><br></br>
                                {errors.Password ? (
                                    <p className="error">
                                        {errors.Password}
                                    </p>
                                ) : null}
                                <TextField required id="PassAgainTB" label="Confirm Password" variant="standard" type="password" color="secondary" name="ConfirmPassword" onChange={handleChange} value={inputFields.ConfirmPassword} /><br></br><br></br>
                                {errors.ConfirmPassword ? (
                                    <p className="error">
                                        {errors.ConfirmPassword}
                                    </p>
                                ) : null}
                                <div id="imgDiv">
                                    <label>Image</label>
                                    <input required type="file"
                                        id="ImageTB"
                                        accept=".jpg, .jpeg"
                                       
                                        name="Image" onChange={handleChange}>
                                    </input>
                                </div><br></br><br></br>
                                {errors.Image ? (
                                    <p className="error">
                                        {errors.Image}
                                    </p>
                                ) : null}
                                <TextField required id="FirstNameTB" label="First Name" variant="standard" type="text" color="secondary" name="FirstName" onChange={handleChange} value={inputFields.FirstName} /><br></br><br></br>
                                {errors.FirstName ? (
                                    <p className="error">
                                        {errors.FirstName}
                                    </p>
                                ) : null}
                                <TextField required id="LastNameTB" label="Last Name" variant="standard" type="text" color="secondary" name="LastName" onChange={handleChange} value={inputFields.LastName} /><br></br><br></br>
                                {errors.LastName ? (
                                    <p className="error">
                                        {errors.LastName}
                                    </p>
                                ) : null}

                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <TextField required id="EmailTB" label="Email" variant="standard" type="email" color="secondary" name="Email" onChange={handleChange} value={inputFields.Email} /><br></br><br></br>
                                {errors.Email ? (
                                    <p className="error">
                                        {errors.Email}
                                    </p>
                                ) : null}
                                <TextField required id="DateTB" variant="standard" type="date" color="secondary" name="Date" onChange={handleChange} value={inputFields.Date} /><br></br><br></br>
                                {errors.Date ? (
                                    <p className="error">
                                        {errors.Date}
                                    </p>
                                ) : null}
                                <Autocomplete
                                    options={cities}
                                    value={inputFields.City}
                                    onChange={handleCityChange}
                                    renderInput={(params) => (
                                        <TextField required {...params} label="City" variant="standard" color="secondary" />
                                    )}
                                /><br></br><br></br>
                                {errors.City ? (
                                    <p className="error">
                                        {errors.City}
                                    </p>
                                ) : null}

                                <TextField required id="StreetTB" label="Address" variant="standard" type="text" color="secondary" name="Street" onChange={handleChange} value={inputFields.Street} /><br></br><br></br>
                                {errors.Street ? (
                                    <p className="error">
                                        {errors.Street}
                                    </p>
                                ) : null}
                                <TextField required id="NumberTB" label="Number" variant="standard" type="number" color="secondary" name="Number" onChange={handleChange} value={inputFields.Number} /><br></br><br></br>
                                {errors.Number ? (
                                    <p className="error">
                                        {errors.Number}
                                    </p>
                                ) : null}

                            </Item>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>
                            <Item>
                                <Button color="secondary" onClick={registerUser}>Register</Button>
                                <Button color="secondary" onClick={() => props.sendSign("sign-in")}>Login</Button>
                            </Item>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>


                    </Grid>
                </Box>

            </form>
        </div>
    )
}
