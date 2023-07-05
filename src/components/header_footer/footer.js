import React from "react";
import { CityLogo } from "../Utils/tools";

const Footer = () =>{
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <CityLogo
                    link={true}
                    linkto='/'
                    height='70px'
                    width='70px'
                />
            </div>
            <div className="footer_descl">
                Manchester City 2023. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;