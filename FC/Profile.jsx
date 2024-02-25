import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';



export default function Profile(props) {

  let userProfile = props.user;

  const Gamelink = 'https://games.yo-yoo.co.il/games_play.php?game=729';
  console.log(userProfile);

function logoutUser() {
  
    let sesUser=JSON.parse(sessionStorage.getItem("user"));
    if (userProfile.Email == sesUser.Email) {
      sessionStorage.clear();
      props.LogOutUser("sign-in");
    }
  }


  function EditDet() {
    props.sendUserToEdit(userProfile);
    props.canEdit("עדכון");
  }

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0" style={{width: "100%"}}>
              <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                  <MDBCol md="4" className="gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                    <MDBTypography tag="h5">{userProfile.FirstName} {userProfile.LastName}</MDBTypography>
                    <MDBCardText>Web Designer</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>

                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">{userProfile.Email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address</MDBTypography>
                          <MDBCardText className="text-muted">{userProfile.Street} {userProfile.Number} {userProfile.City}</MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div>
                        <Button color="secondary" onClick={EditDet}>עדכון פרטים</Button>
                        <Button color="secondary"><a style={{ color: 'inherit' }} href={Gamelink}>למשחק</a></Button>
                        <Button color="secondary" onClick={logoutUser}>להתנתק</Button>
                      </div>

                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  )
}
