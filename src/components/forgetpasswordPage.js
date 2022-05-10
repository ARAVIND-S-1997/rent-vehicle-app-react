// react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// other packages imports
import * as yup from 'yup';
import axios from 'axios';

// other file imports
import { apiurl } from '../apiLink';

// hooks imports
import { useFormik } from 'formik';

// forget password validation schema
const formValidation = yup.object({
    emailid: yup.string().required("Email field should not be empty") 
});

// forget password component
export function Forgetpassword() {

    // formik functionality
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { emailid: ""},
        validationSchema: formValidation,
        onSubmit: (data) => forgetpassword(data)
    });

    // forget password request
    const forgetpassword = (value) => {
        axios({ url: `${apiurl}/user/forgetpassword`, method: "POST", data: value })
    }

    return (
        <div className="forgetpassword-form-container">
            <Card classname="forgetpassword-form-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="forgetpassword-form">
                        <Form.Group className="forgetpassword-emailid-part" controlId="formBasicEmail">

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
                        </Form.Group>
                        <Button className="forgetpassword-form-button" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}