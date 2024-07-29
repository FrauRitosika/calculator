import React from "react";
import './Key.css';

export default function Key({sign, operationName, onClick}) {

    return (
        <button className={`key ${operationName}`} onClick={onClick}>
            {sign}
        </button>);
}