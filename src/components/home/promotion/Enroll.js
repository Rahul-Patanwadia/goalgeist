import React, {useState} from "react";
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {showToastError, showToastSuccess} from '../../Utils/tools'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";



const Enroll = () =>{

    const [loading,setLoading] = useState(false);
    const formik = useFormik({
        initialValues:{
            email:''
        },
        validationSchema: Yup.object({
            email: Yup.string()
            .email('Invalid email')
            .required('Email is required')
        }),
        onSubmit:(values)=>{
            setLoading(true)
            submitForm(values)
        }
    })

    const submitForm = async (values) =>{

        const q = query(collection(db, "promotions"), where("email", "==", values.email));

        const result = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            result.push({id:doc.id,...doc.data()});
        });

        if(result.length >= 1)
        {
            showToastError('you are already on the list')
            setLoading(false)
            return false;
        }

        try {
            const docRef = await addDoc(collection(db, "promotions"), {
              email: values.email
            });
            console.log("Document written with ID: ", docRef.id);
            showToastSuccess('Congratulations')
            formik.resetForm();
            setLoading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return(
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Enter your email
                    </div>
                    <div className="enroll_input">
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email?
                            <div className="error_label">
                                {formik.errors.email}
                            </div>
                            : null
                        }

                        { loading?
                            <CircularProgress color="secondary" className="progress"/>
                            :
                            <button type="submit">
                                Enroll Now
                            </button>
                        }

                        <div className="enroll_discl">
                        Lorem ipsum dolor sit amet. Ea impedit tenetur sed corrupti internos aut aliquid quis. Id minus adipisci nam perspiciatis officiis et internos tenetur qui fugit atque ut tempora excepturi.
                        </div>

                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Enroll;