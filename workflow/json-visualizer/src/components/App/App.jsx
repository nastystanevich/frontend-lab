import React, { useState } from 'react';
import './App.css';
import Button from '../Button/Button.jsx';
import Field from '../Field/Field.jsx';

function App() {

    const [notVisualizedjson, inputJson] = useState('');
    const [visualizedJson, outputJson] = useState();

    let json = null;

    async function getJSON() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100)}`);
        json = await response.json();
        inputJson(JSON.stringify(json));
    };

    function visualizeJSON(obj) {
        for (const element in obj) {
            if (typeof obj[element] === 'object' && obj[element] != null) {
                console.log(obj[element], true)
                visualizeJSON(obj[element]);
            } else {
                console.log(obj[element], false)
            };
        };
        outputJson();
    };


    return (
        <div className="App">
            <div className="container">
                <Field title="JSON String" content={notVisualizedjson} />
            <div className="button-container">
                <Button title="Download JSON" onClick={getJSON} />
                <Button title="Visualize JSON" onClick={visualizeJSON}/>
            </div>
                <Field title="JSON Tree" content={visualizedJson}/> 
            </div>
        </div>
    );
};

export default App;