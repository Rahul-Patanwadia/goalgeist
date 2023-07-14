import React, { useEffect, useState } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { db } from "../../../firebase";

const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:''
}

const AddEditPlayers = (props) =>{

    const [formType, setFormType] = useState('')
    const [values,setValues] = useState(defaultValues)

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            values : values
        },
        validationSchema:Yup.object({
            name:Yup.string()
                .required('This input is required'),
            lastname:Yup.string()
                .required('This input is required'),
            number:Yup.number()
                .required('This input is required')
                .min(0,'The minimum is 0').max(100, 'The max is 100'),
            position:Yup.string()
                .required('This input is required')
        })
    });

    useEffect(()=>{
        const param = props.match.params.playerid
        if(param){
            setFormType('edit')
            setValues({name:'bhai'})
        }
        else{
            setFormType('add');
            setValues(defaultValues)
        }
    },[props.match.params.playerid])

    return(
        <AdminLayout>
            content
        </AdminLayout>
    )
}

export default AddEditPlayers;