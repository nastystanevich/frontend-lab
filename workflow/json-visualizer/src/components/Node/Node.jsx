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

    function openAndClose(EO) {
        EO.target.nextElementSibling.classList.toggle('hidden');
    };

    function addType() {
        let type = null;

        if (Array.isArray(obj)) {
            type = 'arr';
        } else if (typeof obj === 'object') {
            type = 'obj'
        };

        return type;
    };


    // return (
    //     typeof obj === 'object' && obj != null 
    //     ? <div><ul className="key" className={`list ${addType()}`} onClick={openAndClose}>{nodeKey}:</ul> {Object.entries(obj).map(([key, value]) => <li className="list-item"><Node key={JSON.stringify(value)} obj={value} nodeKey={key} /></li> )}</div>
    //     : <span className="str"><span className="key">{nodeKey}: </span> <span className="value" style={ {color: `${setColor()}`} }>{obj}</span></span>   
    // )

    return (
        typeof obj === 'object' && obj != null 
        ? <ul className="list"><p className={`${addType()}`} onClick={openAndClose}>{nodeKey}:</p> <ul className="openAndClose">{Object.entries(obj).map(([key, value]) => <li className="list-item"><Node key={JSON.stringify(value)} obj={value} nodeKey={key} /></li> )}</ul></ul>
        : <span className="str"><span className="key">{nodeKey}: </span> <span className="value" style={ {color: `${setColor()}`} }>{obj}</span></span>   
    )
};

export default Node;
