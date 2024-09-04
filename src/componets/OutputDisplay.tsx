import React from "react";
import './OutputDisplay.css';

type OutputDisplayProps = {
    result: number
    className?: string
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ className = '', result }) => {

    return (
        <div className={`result ${className}`} >
            <p className="result-text">{result}</p>
        </div >
    );
}

export default OutputDisplay;