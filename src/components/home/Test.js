import { easePolyOut } from "d3-ease";
import React, { useState } from "react";
import { Animate } from "react-move";

const Test = () =>{

    const [show,setShow] = useState(true);
    const [bck,setBck] = useState('#ffffff');

    return(
        <div className="featured_wrapper">

            <button onClick={()=>{
                setBck('#f43366');
            }}>
                Update
            </button>

            <button onClick={()=>{
                setShow(false);
            }}>
                Remove
            </button>

            <button onClick={()=>{
                setShow(true);
            }}>
                show
            </button>

            <Animate
                show={show}
                start={{
                    backgroundColor:bck,
                    width:500,
                    height:500,
                    opacity:0
                }}
                enter={{
                    backgroundColor:bck,
                    width:[100],
                    height:[100],
                    opacity:[1],
                    timing:{
                        duration:1000,
                        delay:1000,
                        ease:easePolyOut
                    }
                }}
                update={{
                    backgroundColor:bck,
                    opacity:[0.5],
                    timing:{
                        duration:1000,
                        ease:easePolyOut
                    },
                    events:{
                        start:()=>{
                            console.log('Started')
                        },
                        end:()=>{
                            console.log('Ended')
                        }
                    }
                }}
                leave={[
                    {
                        width:[1000],
                        timing:{
                            duration:1000,
                            ease:easePolyOut
                        }
                    },
                    {
                        opacity:[0],
                        timing:{
                            delay:2000,
                            duration:1000,
                            ease:easePolyOut
                        }
                    }
                ]}
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