import React, { useEffect, useState } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { db } from "../../../firebase";
import { textErrorHelper, selectErrorHelper, isSelectError } from "../../Utils/tools";

const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:''
}

const AddEditPlayers = () =>{

    const [formType, setFormType] = useState('')
    const [values,setValues] = useState(defaultValues)
    const [loading, setLoading] = useState(false)

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
        const param = window.location.pathname
        if(param.match('edit_player')){
            setFormType('edit')
            setValues({name:'no name'})
        }
        else{
            setFormType('add');
            setValues(defaultValues)
        }
    },[window.location.pathname])

    return(
        <AdminLayout title={formType==='add'?'Add Player':'Edit Player'}>
            <div className="editplayers_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        image
                        <hr/>
                        <h4>Player Info</h4>

                        <div className="mb-5">
                            <FormControl>
                                <TextField 
                                    id="name"
                                    name="name"
                                    variant="outlined"
                                    placeholder="Add First Name"
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik,'name')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField 
                                    id="lastname"
                                    name="lastname"
                                    variant="outlined"
                                    placeholder="Add Last Name"
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik,'lastname')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl>
                                <TextField 
                                    id="number"
                                    name="number"
                                    variant="outlined"
                                    placeholder="Add Number"
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik,'number')}
                                />
                            </FormControl>
                        </div>

                        <div className="mb-5">
                            <FormControl error={isSelectError(formik,'position')}>
                                <Select 
                                    id="position"
                                    name="position"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value='' disabled>Select a Position</MenuItem>
                                    <MenuItem value='Keeper'>Keeper</MenuItem>
                                    <MenuItem value='Defence'>Defence</MenuItem>
                                    <MenuItem value='Midfield'>Midfield</MenuItem>
                                    <MenuItem value='Striker'>Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik,'position')}
                            </FormControl>
                        </div>

                        <Button 
                            type="submit" 
                            variant="contained"
                            color="primary"
                            disabled = {loading}
                        >
                            {formType === 'add'?
                                'Add Player'
                            :
                                'Edit Player'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditPlayers;