import { Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from "./components/homePage"
import { Booking } from "./components/bookingComponent"
import { Signup } from "./components/signupPage"
import { Login } from "./components/loginPage"
import { Document } from "./components/documentUploadModule"
import {Confirm } from "./components/confirmbookingComponent"
import { Forgetpassword } from "./components/forgetpasswordPage";
import { Changepassword } from "./components/changepasswordPage";
import { Message } from "./components/forgetpasswordMessageComponent";

import { useState } from "react"

import Offcanvas from 'react-bootstrap/Offcanvas'
import "./App.css"


// react bootstrap imports

import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom";
import { Mybookings } from "./components/mybookingComponent";


export default function App() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authtoken = sessionStorage.getItem("token");
    console.log(authtoken)


    const history = useHistory()

    const [token, settoken] = useState(false);
    console.log(token);

    const [unique, setunique] = useState();
    console.log(unique)

    return (
        <>
            <div className="homepage-header">
                <div>
                    <Button className="homepage-header-option-btn" variant="warning" onClick={handleShow}>
                        Options
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="option-heading">Options</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="homepage-option-toggle-btn-container">
                                <Button className="homepage-option-toggle-btn" onClick={() => history.push("/")} variant="warning" >Home </Button>
                                <Button className="homepage-option-toggle-btn" onClick={()=>history.push("/mybookings")} variant="warning" >Bookings </Button>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                <div>
                    <img className="homepage-header-image" src="https://svgsilh.com/svg/1300231.svg" alt="logo" />
                    <i className="homepage-header-image-title">Rent Vehicles</i>
                    {(authtoken === null) ? <Button className="homepage-login-btn" onClick={() => history.push("/login")} variant="warning" >Login </Button> :
                        <Button className="homepage-logout-btn" onClick={() => {
                            sessionStorage.clear("token");
                            sessionStorage.clear("emailid");
                            sessionStorage.clear("firstname");
                            sessionStorage.clear("lastname");
                            settoken(false)
                        }} variant="warning">Logout</Button>
                    }

                </div>
            </div>
            <div>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/login">
                        <Login settoken={settoken} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>
                    <Route exact path="/forgetpassword">
                        <Forgetpassword />
                    </Route>
                    <Route exact path="/message">
                        <Message />
                    </Route>
                    <Route exact path="/changepassword/:id">
                        <Changepassword />
                    </Route>
                    <Route exact path="/bookvehicles/:id">
                        {(token === true) ? <Booking setunique={setunique} /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/document">
                        {(token === true) ? <Document unique={unique} /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/finished">
                        {(token === true) ? <Confirm /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/mybookings">
                        {/* {(token === true) ? <Mybookings /> : <Redirect to="/login" />} */}
                        <Mybookings/>
                    </Route>
                </Switch>
            </div>
        </>
    )
}

