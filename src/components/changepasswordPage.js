// react bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// other packages imports
import * as yup from 'yup';
import axios from 'axios';

// other file imports
import { apiurl } from '../applicationURL';

// hooks imports
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// change password validation schema
const formValidation = yup.object({
    newPassword: yup
        .string()
        .required("Password field should not be empty")
        .min(8, "Password should not be less than 8 characters")
        .max(12, "Password should not be more than 12 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmpassword: yup
        .string()
        .required("Confirm password field should not be empty ")
        .oneOf([yup.ref("newPassword"), null], "Password is not matching")
});

// forget password component
export function Changepassword() {

    const {id} = useParams();
    console.log(id)
   
    const history =useHistory();

    // formik functionality
    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: { newPassword: "", confirmpassword: "" },
        validationSchema: formValidation,
        onSubmit: (data) => changepassword(data)
    });

    // change password request
    const changepassword = (dataa) => {
        console.log(dataa)
        // axios({ url: `${apiurl}/changepassword`, method:"POST",headers:id, data: dataa })
        axios({url:`${apiurl}/changepassword`,method:"POST",headers:{id},data:dataa})
        .then((response)=>{
            if(response.status===200){
                history.push("/login")
            }
        })
    }

    return (
        <div className="changepassword-form-container">
            <Card classname="changepassword-form-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} className="changepassword-form">
                        <Form.Group className="changepassword-form-fields" controlId="formBasicPassword">

                            {/* password field */}
                            <Form.Label>New password</Form.Label>
                            <input
                                name="newPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                                type="password"
                                placeholder="New password"
                            />
                            {errors.newPassword && touched.newPassword ? (<div>{errors.newPassword}</div>) : null}
                            </Form.Group>
                            
                            <Form.Group className="changepassword-form-fields" controlId="formBasicPassword">
                            {/* confirm password field */}
                            <Form.Label> Confirm Password</Form.Label>
                            <input
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                                type="password"
                                placeholder="Confirm password"
                            />
                            {errors.confirmpassword && touched.confirmpassword ? (<div>{errors.confirmpassword}</div>) : null}
                        </Form.Group>
                        <Button className="changepassword-form-btn" variant="warning" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    )
}