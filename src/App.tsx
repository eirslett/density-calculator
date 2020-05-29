import React, { useState } from 'react';
import './App.css';
import 'purecss';

interface State {
    measureBefore: string
    measureSubmerged: string
}
const initial = {
    measureBefore: '',
    measureSubmerged: ''
};

interface Success {
    type: 'SUCCESS',
    value: number
}
interface Waiting {
    type: 'WAITING'
}
interface Failure {
    type: 'FAILURE',
    message: string
}
type Result = Success | Waiting | Failure

function failure(message: string): Failure {
    return {
        type: 'FAILURE',
        message
    };
}

function isNumber(str: string): boolean {
    return str.length > 0 && !Number.isNaN(Number(str));
}
function calculate(state: State): Result {
    if (state.measureBefore === '' || state.measureSubmerged === '') {
        return {
            type: 'WAITING'
        };
    }
    if (!isNumber(state.measureBefore)) {
        return failure('Measurement before must be a number.');
    }
    const before = Number(state.measureBefore);
    if (before <= 0) {
        return failure('Measurement before must be greater than 0.');
    }

    if (!isNumber(state.measureSubmerged)) {
        return failure('Measurement submerged must be a number.');
    }
    const submerged = Number(state.measureSubmerged);
    if (submerged <= 0) {
        return failure('Measurement submerged must be greater than 0.');
    }

    return {
        type: 'SUCCESS',
        value: Math.round(100 * before / (submerged + before))
    };
}

function App() {
    const [state, setState] = useState(initial);
    const result = calculate(state);

    return (
        <div className="App">
            <form className="pure-form pure-form-aligned">
                <fieldset>
                <legend>Density Calculator</legend>

                <div className="pure-control-group">
                    <label htmlFor="measureBefore">Measurement before</label>
                    <input type="number" name="measureBefore" value={state.measureBefore} onChange={ev => setState({ ...state, measureBefore: ev.target.value })} />
                </div>

                <div className="pure-control-group">
                    <label htmlFor="measureSubmerged">Measurement submerged</label>
                    <input type="number" name="measureSubmerged" value={state.measureSubmerged} onChange={ev => setState({ ...state, measureSubmerged: ev.target.value })} />
                </div>
                </fieldset>
            </form>

            {result.type === 'SUCCESS' && <div>Density: {result.value}</div>}
            {result.type === 'FAILURE' && <div>{result.message}</div>}
        </div>
    );
}

export default App;
