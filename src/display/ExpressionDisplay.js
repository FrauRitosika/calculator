import React from "react";
import './ExpressionDisplay.css';

export default function ExpressionDisplay({ expression }) {

    return (
        <div className="expression">
            <p className="expression-text">{expression}</p>
        </div>
    );
}