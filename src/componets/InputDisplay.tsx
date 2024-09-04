import React from "react";
import './InputDisplay.css';

type InputDisplayProps = {
    expression: string
    className?: string
}

const InputDisplay: React.FC<InputDisplayProps> = ({ className = '', expression }) => {

    return (
        <div className={`expression ${className}`} >
            <p className="expression-text">{expression}</p>
        </div >
    );
}

export default InputDisplay;