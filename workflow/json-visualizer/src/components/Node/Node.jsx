import React from "react";
import './Node.css'

function Node( { obj, nodeKey } ) {

    function setColor() {
        let color = null;

        if (typeof obj === 'string') {
            color = 'green';
        } else if (typeof obj === 'number') {
            color = 'red'
        } else {
            color = 'black'
        };

        return color;
    };

    function openAndClose() {};

    function addType() {
        let type = null;

        if (Array.isArray(obj)) {
            type = 'arr';
        } else if (typeof obj === 'object') {
            type = 'obj'
        };

        return type;
    };


    return (
        typeof obj === 'object' && obj != null 
        ? <ul><ul className="key" className={`list ${addType()}`} onClick={openAndClose}>{nodeKey}:</ul> {Object.entries(obj).map(([key, value]) => <li className="list-item"><Node key={JSON.stringify(value)} obj={value} nodeKey={key} /></li> )}</ul>
        : <span className="str"><span className="key">{nodeKey}: </span> <span className="value" style={ {color: `${setColor()}`} }>{obj}</span></span>
        
    )
};

export default Node;
