import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
//import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';


export default function Admmm(props) {


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


    let RegiList = props.users;

    const EditRow = (e) => {
        setEditFields({ ...EditFields, [e.target.id]: true });
    }

    const DeleteRow = () => {

    }

    return (
        <div>
            <Container style={{ border: "5px outset #F8F8FF", width: "900px" }}>
                <Row style={{ borderBottom: "1px outset #F8F8FF" }}>
                    <Col xs={1} md={1} className="text-right" style={{ float: 'right' }}>
                        <p><b>#</b></p>
                    </Col>
                    <Col xs={1} md={1} className="text-right" style={{ float: 'right' }}>
                        <p><b>Username</b></p>
                    </Col>
                    <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                        <p><b>Name</b></p>
                    </Col>
                    <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                        <p><b>Birthday</b></p>
                    </Col>
                    <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                        <p><b>Address</b></p>
                    </Col>
                    <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                        <p><b>Email</b></p>
                    </Col>
                </Row><br />

                {RegiList.map((key, index) =>
                    <Row>
                        <Col xs={1} md={1} className="text-right" style={{ float: 'right' }}>
                            <p> {index + 1}</p>
                        </Col>
                        <Col xs={1} md={1} className="text-right" style={{ float: 'right' }}>
                            <p id="UserNameEdit"> {key.UserName}</p>
                            {EditFields.UserNameEdit ? (
                                <TextField required placeholder={userToEdit.UserName} id="UsernameTB" label="User Name" variant="standard" type="text" color="secondary" name="UserName" onChange={handleChange} value={inputFields.UserName} />) : null} <br></br><br></br>
                        </Col>
                        <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                            <p>{key.FirstName + " " + key.LastName}</p>
                        </Col>
                        <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                            <p>{key.Date}</p>
                        </Col>
                        <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                            <p>{key.Street}</p>
                        </Col>
                        <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                            <p>{key.Email}</p>
                        </Col>
                        <Col xs={2} md={2} className="text-right" style={{ float: 'right' }}>
                            <EditIcon onClick={EditRow}></EditIcon>
                            <DeleteIcon onClick={DeleteRow}></DeleteIcon>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    )
}
