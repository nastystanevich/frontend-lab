import React from 'react';
import './Field.css';
import Node from '../Node/Node.jsx';

function Field( {title, content, obj} ) {
    return (
        <div className="Field">
            <div className="field-header">{title}</div>
            <div className="field-body">{content}
                <Node obj={obj} nodeKey={'parsed Json'}/>
            </div>
        </div>
    );
};

export default Field;