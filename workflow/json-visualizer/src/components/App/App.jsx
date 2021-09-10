import React, { useState, useMemo } from 'react';
import './App.css';
import Button from '../Button/Button.jsx';
import Field from '../Field/Field.jsx';
import Node from '../Node/Node.jsx';

function App() {

    const [notVisualizedjson, setInputJson] = useState();
    const [visualizedJson, setOutputJson] = useState();
    const [loading, setLoading] = useState(false);

    async function getJSON() {
        setLoading(true)
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100)}`);
        let result = await response.json();
        setLoading(false)
        setInputJson(JSON.stringify(result));
    };

    let xxx = {
        name: 'John',
        age: 30,
        isAdmin: false,
        courses: ['html', 'css', ['jsKey', 'js']],
        smth: 'text',
        wife: [null, {'obj1': 3, 'obj2': 4}]
    };

    let parsedJSON = xxx ? JSON.parse(JSON.stringify(xxx)) : {};

    // let parsedJSON = useMemo(() => notVisualizedjson ? JSON.parse(notVisualizedjson) : {}, [notVisualizedjson]);

    return (
        <div className="App">
            <div className="container">
                <Field title="JSON String" content={notVisualizedjson} />
            <div className="button-container">
                <Button title="Download JSON" onClick={ getJSON } />
                <Button title="Visualize JSON" onClick={ () => Node( parsedJSON )} />
            </div>
                <Field title="JSON Tree" content={visualizedJson} obj={parsedJSON}/>
            </div>
        </div>
    );
};

export default App;