import React from "react";
import { Link } from "react-router-dom";
import mcityLogo from '../../Resources/images/logos/manchester_city_logo.png'
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { FormHelperText} from '@mui/material'

export const CityLogo = (props) =>{

    const template = <div 
        className="img_cover"
        style={{
            height:props.height,
            width:props.width,
            background:`url(${mcityLogo}) no-repeat`
        }}>
    </div>

    if(props.link){
        return <Link to={props.linkto}>{template}</Link>
    }
    else return template;
}

export const showToastError = (msg) =>(
    toast.error(msg,{
        position: toast.POSITION.TOP_LEFT
    })
)

export const showToastSuccess = (msg) =>(
    toast.success(msg,{
        position: toast.POSITION.TOP_LEFT
    })
)

export const Tag = (props) =>{
    const template = 
    <div style={{
        background: props.bck? props.bck : '#fff',
        fontSize: props.size? props.size : '15px',
        color: props.color? props.color : '#000',
        padding : '5px 10px',
        display : 'inline-block',
        fontFamily : 'Righteous',
        ...props.add
    }}>
        {props.children}
    </div>

    if(props.link)
    {
        return <Link to={props.linkto}>
            {template}
        </Link>
    }
    return template;
}

export const logoutHandler = () =>{
    signOut(auth).then(()=>(
        showToastSuccess('Signed Out!')
    )).catch(err=>(
        showToastError(err.message)
    ))
}

export const textErrorHelper = (formik,values) =>({
    error:formik.errors[values] && formik.touched[values],
    helperText: formik.errors[values] && formik.touched[values]? formik.errors[values] : null
})

export const selectErrorHelper = (formik,values) =>{
    if(formik.errors[values] && formik.touched[values]){
        return (<FormHelperText>{formik.errors[values]}</FormHelperText>)
    }
    return false;
}

export const isSelectError = (formik,values) =>{
    return (formik.errors[values] && formik.touched[values]);
}