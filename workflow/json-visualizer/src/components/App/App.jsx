import React, { useState } from 'react';
import './App.css';
import Button from '../Button/Button.jsx';
import Field from '../Field/Field.jsx';

function App() {

    const [notVisualizedjson, inputJson] = useState('');
    const [visualizedJson, outputJson] = useState();

    async function getJSON() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100)}`);
        let result = await response.json();
        inputJson(JSON.stringify(result));
    };

    function visualizeJSON(obj) {
        let output = null;
        if (typeof obj === 'object' && obj != null) { 
            for (let element in obj) {
                if (typeof obj[element] === 'object' && obj[element] != null) {
                    visualizeJSON(obj[element])
                };
            };
        } else {
            console.log('Not a JSON');
        };
        outputJson(output);
    };

    return (
        <div className="App">
            <div className="container">
                <Field title="JSON String" content={notVisualizedjson} />
            <div className="button-container">
                <Button title="Download JSON" onClick={ getJSON } />
                <Button title="Visualize JSON" onClick={ () => visualizeJSON() }/>
            </div>
                <Field title="JSON Tree" content={visualizedJson}/> 
            </div>
        </div>
    );
};

export default App;