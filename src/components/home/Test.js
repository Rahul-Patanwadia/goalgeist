import { easePolyOut } from "d3-ease";
import React, { useState } from "react";
import { Animate } from "react-move";

const Test = () =>{

    const [show,setShow] = useState(true);

    return(
        <div className="featured_wrapper">
            <Animate
                show={show}
                start={{
                    backgroundColor:'red',
                    width:500,
                    height:500,
                    opacity:0
                }}
                enter={{
                    width:[100],
                    height:[100],
                    opacity:[1],
                    timing:{
                        duration:1000,
                        delay:1000,
                        ease:easePolyOut
                    }
                }}
            >
                {({backgroundColor,width,height,opacity})=>(
                    <div
                        style={{
                            backgroundColor, width, height, opacity
                        }}
                    >
                        Testing hello 123
                    </div>
                )}
            </Animate>
        </div>
    )
}

export default Test;