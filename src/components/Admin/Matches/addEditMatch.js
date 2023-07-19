import React, { useEffect, useState } from "react";

import AdminLayout from '../../Hoc/AdminLayout'
import { isSelectError, selectErrorHelper, textErrorHelper, showToastSuccess } from "../../Utils/tools";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { TextField, Select, MenuItem, FormControl, Button } from "@mui/material";

import { collection, getDocs, getDoc, doc, addDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../../firebase";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

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
    
    const history = useHistory()
    let {matchid} = useParams()

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
            submitForm(values)
        }
    })

    const submitUtil = async (values) =>{

        let dataToSubmit = values

        teams.forEach((team)=>{
            if(team.shortName === values.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === values.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        try {
            const docRef = await addDoc(collection(db, "matches"), dataToSubmit);
            console.log("Document written with ID: ", docRef.id);
            showToastSuccess('Match added successfully')
            formik.resetForm();
            setLoading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const updateVal = async(values) =>{

        let dataToSubmit = values
        
        teams.forEach((team)=>{
            if(team.shortName === values.local){
                dataToSubmit['localThmb'] = team.thmb
            }
            if(team.shortName === values.away){
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        await setDoc(doc(db, "matches", matchid), dataToSubmit);
        setLoading(false)
        showToastSuccess('Match details edited successfully!')
    }

    const submitForm = (values) =>{
        setLoading(true)
        if(formType === 'add')
        {
            submitUtil(values)
            history.push('/admin_matches')
        }
        else{
            updateVal(values)      
        }
    }

    const fetchData = async() =>{
        const querySnapshot = await getDocs(collection(db, "teams"));
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({id:doc.id,...doc.data()})
        });
        setTeams(result)
    }

    const fetchDataWithRef = async(docRef) =>{
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setValues({...docSnap.data()});
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    const showTeams = () => (
        teams?
            teams.map((item)=>(
                <MenuItem key={item.id} value={item.shortName}>
                    {item.shortName}
                </MenuItem>
            ))
        : null
    )

    useEffect(()=>{
        const param = window.location.pathname
        if(param.match('edit_match')){
            setFormType('edit')
            const docRef = doc(db, "matches", matchid);
            fetchDataWithRef(docRef)
        }
        else{
            setFormType('add');
            setValues(defaultValues)
        }
    },[window.location.pathname, values])

    useEffect(()=>{
        if(!teams){
            setLoading(true)
            fetchData();
            setLoading(false)
        }
    },[teams])

    return (
        <AdminLayout title={formType==='add'?'Add Match':'Edit Match'}>
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>Select date</h4>
                            <FormControl>
                                <TextField
                                    id='date'
                                    name="date"
                                    type="date"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik,'date')}
                                />
                            </FormControl>
                        </div>

                        <hr/>

                        <div>
                            <h4>Result Local</h4>
                            <FormControl
                                error={isSelectError(formik,'local')}
                            >
                                <Select
                                    id="local"
                                    name="local"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('local')}
                                >
                                    <MenuItem value='' disabled> Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'local')}
                            </FormControl>

                            <FormControl
                                style={{marginLeft:'10px'}}
                            >
                                <TextField
                                    id='resultLocal'
                                    name="resultLocal"
                                    type="number"
                                    {...formik.getFieldProps('resultLocal')}
                                    {...textErrorHelper(formik,'resultLocal')}
                                />
                            </FormControl>

                        </div>

                        <div>
                            <h4>Result Away</h4>
                            <FormControl
                                error={isSelectError(formik,'away')}
                            >
                                <Select
                                    id="away"
                                    name="away"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('away')}
                                >
                                    <MenuItem value='' disabled> Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'away')}
                            </FormControl>

                            <FormControl
                                style={{marginLeft:'10px'}}
                            >
                                <TextField
                                    id='resultAway'
                                    name="resultAway"
                                    type="number"
                                    {...formik.getFieldProps('resultAway')}
                                    {...textErrorHelper(formik,'resultAway')}
                                />
                            </FormControl>

                        </div>
                        
                        <hr/>

                        <div>
                            <h4>Match Info</h4>
                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id='referee'
                                        name="referee"
                                        placeholder="Referee Name"
                                        variant="outlined"
                                        {...formik.getFieldProps('referee')}
                                        {...textErrorHelper(formik,'referee')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id='stadium'
                                        name="stadium"
                                        placeholder="Stadium Name"
                                        variant="outlined"
                                        {...formik.getFieldProps('stadium')}
                                        {...textErrorHelper(formik,'stadium')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl
                                    error={isSelectError(formik,'result')}
                                >
                                    <Select
                                        id="result"
                                        name="result"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('result')}
                                    >
                                        <MenuItem value='' disabled> Select a result</MenuItem>
                                        <MenuItem value='W'>Win</MenuItem>
                                        <MenuItem value='L'>Loss</MenuItem>
                                        <MenuItem value='D'>Draw</MenuItem>
                                        <MenuItem value='n/a'>Not applicable</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'away')}
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl
                                    error={isSelectError(formik,'final')}
                                >
                                    <Select
                                        id="final"
                                        name="final"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('final')}
                                    >
                                        <MenuItem value='' disabled>Was the game played?</MenuItem>
                                        <MenuItem value='Yes'>Yes</MenuItem>
                                        <MenuItem value='No'>No</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'final')}
                                </FormControl>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {formType==='add'?'Add Match':'Edit Match'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMatch;