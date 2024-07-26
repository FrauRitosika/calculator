import React from "react";
import Key from "./Key";
import './Keyboard.css';

export default function Keyboard({ keyboard = [], onClick }) {

    return (
        <div>
            <ul className="keyboard">
                {keyboard.map(key => (
                    <li key={key.sign} >
                        <Key
                            sign={key.signString ? key.signString : key.sign}
                            operationName={key.operation}
                            onClick={() => onClick(key)}
                        />
                    </li>))}
            </ul>
        </div>
    );
}