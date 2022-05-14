// reactbootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// hooks imports
import { useParams, useHistory } from "react-router-dom"
import { useFormik } from "formik";

// packages imports
import axios from "axios";
import * as yup from 'yup';

// other files imports
import { apiurl } from "../applicationURL";

const formvalidation = yup.object({
    vehiclename: yup.string().required(),
    name: yup.string().required(),
    contactno: yup.number().required(),
    alternativeno: yup.number().required(),
    address: yup.string().required(),
    drivinglicenceno:yup.number().required(),
    aadharno: yup.number().required(),
    location: yup.string().required(),
    state: yup.string().required(),

})

// Booking vehicle form component
export function Booking({ setunique }) {

    const history = useHistory();

    const { id } = useParams();
    console.log("id is:", id);

    const authtoken = sessionStorage.getItem("token");
    const authemail = sessionStorage.getItem("emailid");

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            vehiclename: id,
            name: "",
            contactno: "",
            alternativeno: "",
            address: "",
            drivinglicenceno: "",
            aadharno: "",
            location: "",
            state: ""
        },
        validationSchema:formvalidation,
        onSubmit: (data) => bookingReq(data)
    });

    // api request
    const bookingReq = (val) => {
        const auth = {
            emailid: authemail,
            token: authtoken
        }
        axios({ url: `${apiurl}/bookingdetails`, method: "POST", headers: auth, data: val })
            .then((response) => {
                if (response.status === 200) {
                    setunique(response.data);
                    history.push("/document")
                }
            })

    }

    return (
        <div className="booking-main-div">
            <Card classname=" booking-card">
                <Card.Body >
                    <h2>Fill this following booking form</h2>
                    <Form onSubmit={handleSubmit} className="">

                        {/* name field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicMonth">
                            <Form.Label>Name</Form.Label>
                            <input
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                type="text"
                                placeholder="Enter the name as per aadhar card"
                            />
                            {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                        </Form.Group>

                        {/* contactno field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Contact Number</Form.Label>
                            <input
                                name="contactno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contactno}
                                type="text"
                                placeholder="Enter the contact number of the person who rents the vehicle"
                            />
                            {errors.contactno && touched.contactno ? (<div>{errors.contactno}</div>) : null}
                        </Form.Group>

                        {/* alternative field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Alternative Number</Form.Label>
                            <input
                                name="alternativeno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.alternativeno}
                                type="text"
                                placeholder="Enter the alternative number of the person who rents the vehicle"
                            />
                            {errors.alternativeno && touched.alternativeno ? (<div>{errors.alternativeno}</div>) : null}
                        </Form.Group>

                        {/* address field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Address </Form.Label>
                            <input
                                name="address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                type="text"
                                placeholder="Enter the full address with pincode"
                            />
                            {errors.address && touched.address ? (<div>{errors.address}</div>) : null}
                        </Form.Group>

                        {/*  driving licence field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Driving licence number</Form.Label>
                            <input
                                name="drivinglicenceno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.drivinglicenceno}
                                type="text"
                                placeholder="Enter the Driving licence number"
                            />
                            {errors.drivinglicenceno && touched.drivinglicenceno ? (<div>{errors.drivinglicenceno}</div>) : null}
                        </Form.Group>

                        {/* aadhar field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Aadhar number</Form.Label>
                            <input
                                name="aadharno"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.aadharno}
                                type="text"
                                placeholder="Enter the aadhar number"
                            />
                            {errors.aadharno && touched.aadharno ? (<div>{errors.aadharno}</div>) : null}
                        </Form.Group>

                        {/* location  field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>Vehicle delivery location</Form.Label>
                            <input
                                name="location"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                                type="text"
                                placeholder="Enter the location where the vehicle needs to be delivered"
                            />
                            {errors.location && touched.location ? (<div>{errors.location}</div>) : null}
                        </Form.Group>

                        {/* state field */}
                        <Form.Group className="booking-form-fields" controlId="formBasicEmail">
                            <Form.Label>State</Form.Label>
                            <input
                                name="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.state}
                                type="text"
                                placeholder="Enter the state"
                            />
                            {errors.state && touched.state ? (<div>{errors.state}</div>) : null}
                        </Form.Group>

                        <Button className="booking-form-btn" variant="warning" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}