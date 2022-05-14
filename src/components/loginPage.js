// react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// other packages imports
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

// other file imports
import { apiurl } from '../applicationURL';

// hooks imports
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

// login validation schema
const formValidation = yup.object({
    emailid: yup.string().required("Email field should not be empty"),
    password: yup.string().required("Password field should not be empty")
})


// login component
export function Login({ settoken }) {

    // formik functionality
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { emailid: "", password: "" },
        validationSchema: formValidation,
        onSubmit: (data) => login(data)
    });

    const history = useHistory();

    // login request
    const login = (value) => {
        axios({ url: `${apiurl}/login`, method: "POST", data: value })
            .then((response) => {
                if (response.status === 200) {
                    try {
                        const token = response.data.finalToken;
                        const emailid = response.data.emailid;
                        const firstname = response.data.firstname;
                        const lastname = response.data.lastname;
                        sessionStorage.setItem("token", token);
                        sessionStorage.setItem("emailid", emailid);
                        sessionStorage.setItem("firstname", firstname);
                        sessionStorage.setItem("lastname", lastname);
                        settoken(true)
                        history.push(`/`)
                    } catch (errors) {
                        console.log("Error is:", errors)
                    }

                }
            })
    }
    return (
        <div className="login-form-container">
            <Card className="login-form-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <Form.Group className="login-form-fields" controlId="formBasicEmail">

                            {/* Email field */}
                            <Form.Label>Email address</Form.Label>
                            <input
                                name="emailid"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.emailid}
                                type="emailid"
                                placeholder="Enter email"
                            />
                            {errors.emailid && touched.emailid ? (<div>{errors.emailid}</div>) : null}
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="login-form-fields" controlId="formBasicPassword">

                            {/* password field */}
                            <Form.Label>Password</Form.Label>
                            <input
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                        </Form.Group>
                        <div className='link-login-btn-container'>
                            {/* links for forget password and signup */}
                            <Link to="/forgetpassword">Forget password</Link>
                            <Link to="/signup">Signup</Link>

                            <Button className="login-form-button" variant="warning" type="submit">
                                Submit
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}