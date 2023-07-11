import React from "react";
import { Link } from "react-router-dom";
import mcityLogo from '../../Resources/images/logos/manchester_city_logo.png'
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

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

export const showToastError = (msg) =>{
    toast.error(msg,{
        position: toast.POSITION.TOP_LEFT
    })
}

export const showToastSuccess = (msg) =>{
    toast.success(msg,{
        position: toast.POSITION.TOP_LEFT
    })
}

export const logoutHandler = () =>{
    signOut(auth).then(()=>{
        showToastSuccess('Signed Out!')
    }).catch(err=>{
        showToastError(err.message)
    })
}