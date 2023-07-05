import React, {useState} from "react";

import { CircularProgress } from "@mui/material";
import { Redirect } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from 'yup';

const Signin = () =>{

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
        }),
        onSubmit: (values)=>{
            // go to the server with field values
            setLoading(true);
            console.log(values)
        }
    })

    return(
        <div className="container">
            <div className="signin_wrapper" style={{margin:'100px'}}>

                <form onSubmit={formik.handleSubmit}>
                    <h2> Please Login</h2>
                    <input
                        name='email'
                        placeholder="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email?
                        <div className="error_label">
                            {formik.errors.email}
                        </div>
                    : null}

                    <input
                        name='password'
                        type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    {formik.touched.password && formik.errors.password?
                        <div className="error_label">
                            {formik.errors.password}
                        </div>
                    : null}

                    {loading?
                        <CircularProgress color='secondary' className="progress"/>
                    :
                        <button type="submit"> Log In</button>  
                    }
                    
                </form>

            </div>
        </div>
    )
}

export default Signin;
