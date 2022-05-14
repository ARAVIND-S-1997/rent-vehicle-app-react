// react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// other packages imports
import * as yup from 'yup';
import axios from 'axios';

// hooks imports
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

// other file imports
import { apiurl } from '../applicationURL';

// validation schema
const formValidation = yup.object({
    firstname: yup
        .string()
        .required("First name should not be empty")
        .min(3, "First name should be minimum 3 characters")
        .max(15, "First name should not be more than 10 characters"),
    lastname: yup
        .string()
        .required("Last name should not be empty")
        .min(1, "Last name should be minimum 3 characters")
        .max(15, "Last name should not be more than 10 characters"),
    dob: yup
        .string()
        .required("Date of birth should not be empty"),
    emailid: yup
        .string()
        .required("Email field should not be empty")
        // eslint-disable-next-line 
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"),
    password: yup
        .string()
        .required("Password field should not be empty")
        .min(8, "Password should not be less than 8 characters")
        .max(12, "Password should not be more than 12 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmpassword: yup
        .string()
        .required("Confirm password field should not be empty ")
        .oneOf([yup.ref("password"), null], "Password is not matching")
})

// signup component
export function Signup() {

    // formik functionality
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { firstname: "", lastname: "", dob: "", emailid: "", password: "", confirmpassword: "" },
        validationSchema: formValidation,
        onSubmit: (data) => signup(data)
    })
    const history = useHistory();

    // signup api request
    const signup = (values) => {
        try {
            axios({ url: `${apiurl}/signup`, method: "POST", data: values })
                .then((response) => {
                    if (response.status === 200) {
                        history.push("/login");
                    }
                })
        }
        catch (errors) {
            console.log("Error is:", errors);
        }
    }

    return (
        <div className="signup-form-container">
            <Card className="signup-form-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="signup-form">
                        <Form.Group className="signup-form-fields" controlId="formBasicEmail">

                            {/* firstname field */}
                            <Form.Label>First name</Form.Label>
                            <input
                                name="firstname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstname}
                                type="First name"
                                placeholder="Enter first name"
                            />
                            {errors.firstname && touched.firstname ? (<div>{errors.firstname}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-form-fields" controlId="formBasicEmail">

                            {/* lastname field*/}
                            <Form.Label>Last name</Form.Label>

                            <input
                                name="lastname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                type="lastname"
                                placeholder="Enter last name"
                            />
                            {errors.lastname && touched.lastname ? (<div>{errors.lastname}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-form-fields" controlId="formBasicEmail">

                            {/* date of birth field*/}
                            <Form.Label>Date of birth</Form.Label>
                            <input
                                name="dob"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dob}
                                type="date"
                            />
                            {errors.dob && touched.dob ? (<div>{errors.dob}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-form-fields" controlId="formBasicPassword">

                            {/* email id field*/}
                            <Form.Label>Email id</Form.Label>
                            <input
                                name="emailid"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.emailid}
                                type="emailid"
                                placeholder=" Enter email id"
                            />
                            {errors.emailid && touched.emailid ? (<div>{errors.emailid}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-form-fields" controlId="formBasicPassword">

                            {/* password field */}
                            <Form.Label>Password</Form.Label>
                            <input
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type="password"
                                placeholder=" Enter Password"
                            />
                            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                        </Form.Group>
                        <Form.Group className="signup-form-fields" controlId="formBasicPassword">

                            {/* confirm password field */}
                            <Form.Label> Confirm Password</Form.Label>
                            <input
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {errors.confirmpassword && touched.confirmpassword ? (<div>{errors.confirmpassword}</div>) : null}
                        </Form.Group>
                        <Button className="signup-form-button" variant="warning" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}