import React, { useEffect, useState } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showToastSuccess } from "../../Utils/tools";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";
import { db } from "../../../firebase";
import { textErrorHelper, selectErrorHelper, isSelectError } from "../../Utils/tools";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const defaultValues = {
    name:'',
    lastname:'',
    number:'',
    position:''
}

const AddEditPlayers = (props) =>{

    const [formType, setFormType] = useState('')
    const [values,setValues] = useState(defaultValues)
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    let {playerid} = useParams();

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
        }),
        onSubmit:(values)=>{
            submitForm(values);
        }
    });

    const submitUtil = async (values) =>{
        try {
            const docRef = await addDoc(collection(db, "players"), values);
            console.log("Document written with ID: ", docRef.id);
            showToastSuccess('Player added successfully')
            formik.resetForm();
            setLoading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const updateVal = async(values) =>{
        await setDoc(doc(db, "players", playerid), values);
        setLoading(false)
        showToastSuccess('Player details edited successfully!')
    }

    const submitForm = (values) =>{
        setLoading(true)
        if(formType === 'add')
        {
            submitUtil(values)
            history.push('/admin_players')
        }
        else{
            updateVal(values)      
        }
    }

    const fetchData = async(docRef) =>{
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setValues({...docSnap.data()});
            console.log(values)
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    useEffect(()=>{
        const param = window.location.pathname
        if(param.match('edit_player')){
            setFormType('edit')
            const docRef = doc(db, "players", playerid);
            fetchData(docRef)
            console.log(values)
        }
        else{
            setFormType('add');
            setValues(defaultValues)
        }
    },[window.location.pathname, values])

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
                                    type="number"
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