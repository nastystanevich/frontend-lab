import React from 'react';
import './Button.css';

function Button(props) {

    return (
        <button className="Button" onClick={props.action}>{props.title}</button>
    );
};

export default Button;