import React, { useState } from 'react';
import './App.css';
import Button from '../Button/Button.jsx';
import Field from '../Field/Field.jsx';

function App() {

    const [json, setJson] = useState('Необходимо загрузить JSON');

    async function getJSON() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100)}`);
        let result = await response.json();
        setJson(JSON.stringify(result));
    };

    function recursion(jsonText) {
        for (const key in jsonText) {
            if (Object.hasOwnProperty.call(jsonText, key)) {
                const element = jsonText[key];
                if (typeof element == 'object') {
                    recursion(element);
                };
            };
        };
    }; 

    return (
        <div className="App">
            <div className="container">
                <Field title="JSON String" content={json} />
            <div className="button-container">
                <Button title="Загрузить JSON" onClick={getJSON} />
                <Button title="Визуализировать JSON" onClick={recursion} />
            </div>
                <Field title="JSON Tree"/> 
            </div>
        </div>
    );
};

export default App;