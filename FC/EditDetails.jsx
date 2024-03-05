import React, { useEffect, useState } from 'react';
//import  '/src/App.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function EditDetails(props) {

  let userToEdit = props.user;
  

  const UsersRegiList = props.users;
  




  const [inputFields, setInputFields] = useState({
    UserName: userToEdit.UserName,
    Password: userToEdit.Password,
    ConfirmPassword: userToEdit.ConfirmPassword,
    Image: userToEdit.Image,
    FirstName: userToEdit.FirstName,
    LastName: userToEdit.LastName,
    Email: userToEdit.Email,
    Date: userToEdit.Date,
    City: userToEdit.City,
    Street: userToEdit.Street,
    Number: userToEdit.Number
  });


  const [EditFields, setEditFields] = useState({
    UserNameEdit: false,
    PasswordEdit: false,
    ConfirmPasswordEdit: false,
    ImageEdit: false,
    FirstNameEdit: false,
    LastNameEdit: false,
    EmailEdit: false,
    DateEdit: false,
    CityEdit: false,
    StreetEdit: false,
    NumberEdit: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState([]);

  const cities = ['', 'ירושלים', 'תל אביב', 'חיפה', 'באר שבע', 'אילת', 'נתניה', 'אשדוד', 'חולון', 'רמת גן', 'פתח תקווה'];

  //const registeredUsers = JSON.parse(localStorage.getItem('Users')) || [];

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

    if (inputValues.UserName == userToEdit.UserName) {

    }

    else if (UsersRegiList.some(user => user.UserName === inputValues.UserName)) {
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
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    // 
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
    
    let localUsers = JSON.parse(localStorage["Users"]);
    const indexToUpdate = localUsers.findIndex(element => element.Email === userToEdit.Email);
    
    if(indexToUpdate!= -1){
      localUsers[indexToUpdate]=inputFields;

      sessionStorage.setItem("user", JSON.stringify(inputFields));
      localStorage.setItem('Users', JSON.stringify(localUsers));
    }



    Swal.fire({
      title: "Good job!",
      text: "Edit User Succeeded!",
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
    
    props.userEdited(inputFields);
    props.sendSign("login");
    
 
  };


  useEffect(() => {
    
    if (Object.keys(errors).length == 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);



  const EditNow = (e) => {
    //
    setEditFields({ ...EditFields, [e.target.id]: true });

  }





  return (

    <div>


      <form>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>


                <Typography>User Name: {userToEdit.UserName}</Typography> <EditIcon id="UserNameEdit" onClick={EditNow}></EditIcon>
                {EditFields.UserNameEdit ? (
                  <TextField required placeholder={userToEdit.UserName} id="UsernameTB" label="User Name" variant="standard" type="text" color="secondary" name="UserName" onChange={handleChange} value={inputFields.UserName} />) : null} <br></br><br></br>
                {errors.UserName ? (
                  <p className="error">
                    {errors.UserName}
                  </p>
                ) : null}


                <Typography> Password : {userToEdit.Password}</Typography> <EditIcon id="PasswordEdit" onClick={EditNow}></EditIcon>
                {EditFields.PasswordEdit ? (
                  <TextField required id="PassTB" label="Password" variant="standard" type="password" color="secondary" name="Password" onChange={handleChange} value={inputFields.Password} />) : null}<br></br><br></br>
                {errors.Password ? (
                  <p className="error">
                    {errors.Password}
                  </p>
                ) : null}


                <Typography>Confirm Password : {userToEdit.ConfirmPassword}</Typography> <EditIcon id="ConfirmPasswordEdit" onClick={EditNow}></EditIcon>
                {EditFields.ConfirmPasswordEdit ? (
                  <TextField required id="PassAgainTB" label="Confirm Password" variant="standard" type="password" color="secondary" name="ConfirmPassword" onChange={handleChange} value={inputFields.ConfirmPassword} />) : null}<br></br><br></br>
                {errors.ConfirmPassword ? (
                  <p className="error">
                    {errors.ConfirmPassword}
                  </p>
                ) : null}


                <Typography>Image: </Typography> <EditIcon id="ImageEdit" onClick={EditNow}></EditIcon>
                {EditFields.ImageEdit ? (
                  <div id="imgDiv">
                    <label>Image</label>
                    <input required type="file"
                      id="ImageTB"
                      accept=".jpg, .jpeg"
                     
                      name="Image" onChange={handleChange}>
                    </input>
                  </div>) : null}<br></br><br></br>
                {errors.Image ? (
                  <p className="error">
                    {errors.Image}
                  </p>
                ) : null}


                <Typography>First Name : {userToEdit.FirstName}</Typography> <EditIcon id="FirstNameEdit" onClick={EditNow}></EditIcon>
                {EditFields.FirstNameEdit ? (
                  <TextField required id="FirstNameTB" label="First Name" variant="standard" type="text" color="secondary" name="FirstName" onChange={handleChange} value={inputFields.FirstName} />) : null}<br></br><br></br>
                {errors.FirstName ? (
                  <p className="error">
                    {errors.FirstName}
                  </p>
                ) : null}

                <Typography>Last Name : {userToEdit.LastName}</Typography> <EditIcon id="LastNameEdit" onClick={EditNow}></EditIcon>
                {EditFields.LastNameEdit ? (
                  <TextField required id="LastNameTB" label="Last Name" variant="standard" type="text" color="secondary" name="LastName" onChange={handleChange} value={inputFields.LastName} />) : null}<br></br><br></br>
                {errors.LastName ? (
                  <p className="error">
                    {errors.LastName}
                  </p>
                ) : null}

              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>

                <Typography>Email : {userToEdit.Email}</Typography><br></br><br></br>




                <Typography>Date : {userToEdit.Date}</Typography> <EditIcon id="DateEdit" onClick={EditNow}></EditIcon>
                {EditFields.DateEdit ? (
                  <TextField required id="DateTB" variant="standard" type="date" color="secondary" name="Date" onChange={handleChange} value={inputFields.Date} />) : null}<br></br><br></br>
                {errors.Date ? (
                  <p className="error">
                    {errors.Date}
                  </p>
                ) : null}

                <Typography>City : {userToEdit.City}</Typography> <EditIcon id="CityEdit" onClick={EditNow}></EditIcon>
                {EditFields.CityEdit ? (
                  <Autocomplete
                    options={cities}
                    value={inputFields.City}
                    onChange={handleCityChange}
                    renderInput={(params) => (
                      <TextField required {...params} label="City" variant="standard" color="secondary" />
                    )}
                  />) : null}<br></br><br></br>
                {errors.City ? (
                  <p className="error">
                    {errors.City}
                  </p>
                ) : null}


                <Typography>Street : {userToEdit.Street}</Typography> <EditIcon id="StreetEdit" onClick={EditNow}></EditIcon>
                {EditFields.StreetEdit ? (
                  <TextField required id="StreetTB" label="Address" variant="standard" type="text" color="secondary" name="Street" onChange={handleChange} value={inputFields.Street} />) : null}<br></br><br></br>
                {errors.Street ? (
                  <p className="error">
                    {errors.Street}
                  </p>
                ) : null}



                <Typography>Number : {userToEdit.Number}</Typography> <EditIcon id="NumberEdit" onClick={EditNow}></EditIcon>
                {EditFields.NumberEdit ? (
                  <TextField required id="NumberTB" label="Number" variant="standard" type="number" color="secondary" name="Number" onChange={handleChange} value={inputFields.Number} />) : null}<br></br><br></br>
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
                <Button color="secondary" onClick={registerUser}>Edit</Button>
                <Button color="secondary" onClick={() => props.sendSign("login")}>Profile</Button>
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
