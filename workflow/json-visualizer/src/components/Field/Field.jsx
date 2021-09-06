import React from 'react';
import './Field.css';

function Field(props) {
    return (
        <div className="Field">
            <div className="field-header">{props.title}</div>
            <div className="field-body">{props.content}</div>
        </div>
    );
};

export default Field;