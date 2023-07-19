import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';

const defaultValues = {
    date:'',
    local:'',
    resultLocal:'',
    away:'',
    resultAway:'',
    referee:'',
    stadium:'',
    result:'',
    final:''
}

const AddEditMatch = () =>{

    const [loading, setLoading] = useState(false)
    const [formType, setFormType] = useState('')
    const [teams, setTeams] = useState(null)
    const [values, setValues] = useState(defaultValues)

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: values,
        validationSchema: Yup.object({
            date : Yup.string()
                .required('This input is required'),
            local : Yup.string()
                .required('This input is required'),
            resultLocal : Yup.number()
                .required('This input is required')
                .min(0,'The minimum is 0')
                .max(99,'Is it even possible?'),
            away : Yup.string()
                .required('This input is required'),
            resultAway : Yup.number()
                .required('This input is required')
                .min(0,'The minimum is 0')
                .max(99,'Is it even possible?'),
            referee : Yup.string()
                .required('This input is required'),
            stadium : Yup.string()
                .required('This input is required'),
            result : Yup.mixed()
                .required('This input is required')
                .oneOf(['W','D','L','n/a']),
            final : Yup.mixed()
                .required('This input is required')
                .oneOf(['yes','no']),
        }),
        onSubmit : (values) => {
            console.log(values)
        }
    })

    return (
        <div>
            Add edit match
        </div>
    )
}

export default AddEditMatch;