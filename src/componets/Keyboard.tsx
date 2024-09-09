import React from "react";
import Key from "./Key";
import { KeyInfo } from '../keyboard-setting';
import './Keyboard.css';

type KeyboardProps = {
    keyboard: Array<KeyInfo>
    onClick: (key: KeyInfo) => void
    isHorizontal: boolean
}



const Keyboard: React.FC<KeyboardProps> = ({ keyboard = [], onClick, isHorizontal }) => {

    return (
        <ul className={`keyboard ${isHorizontal ? 'horizontal' : ''}`}>
            {keyboard.map((key, index) => (
                <li key={key.sign} className={`row-${Math.trunc(index / 4) + 1}`} >
                    <Key
                        keyInfo={key}
                        onClick={() => onClick(key)}
                    />
                </li>))}
        </ul>
    );
}

export default Keyboard;


