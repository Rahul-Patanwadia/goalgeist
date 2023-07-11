import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import React from "react";

let stripesState = [
    {
        background:'#98c5e9',
        left:120,
        rotate:25,
        top:-260,
        delay:0
    },
    {
        background:'#fff',
        left:360,
        rotate:25,
        top:-394,
        delay:200
    },
    {
        background:'#98c5e9',
        left:600,
        rotate:25,
        top:-498,
        delay:400
    }
];

const Stripes = () =>{

    const handleShowStripes = () =>{
        return stripesState.map((stripe,i)=>(
            <Animate 
                key={i}
                show={true}
                start={{
                    background:'#fff',
                    opacity:0,
                    left:0,
                    rotate:0,
                    top:0
                }}
                enter={{
                    background:`${stripe.background}`,
                    opacity:[1],
                    left:[stripe.left],
                    rotate:[stripe.rotate],
                    top:[stripe.top],
                    timing:{
                        duration:200,
                        delay:stripe.delay,
                        ease: easePolyOut
                    }

                }}
            >
                {
                    ({opacity,left,rotate,top,background}) =>(
                        <div className="stripe"
                            style={{
                                opacity, 
                                background, 
                                transform:`rotate(${rotate}deg) translate(${left}px,${top}px)`
                            }}
                        >

                        </div>
                    )
                }
            </Animate>
        ));
    }

    return(
        <div className="featured_stripes">
            {handleShowStripes()}
        </div>
    )
}

export default Stripes;