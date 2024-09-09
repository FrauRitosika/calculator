import React from 'react';
import { KeyInfo } from '../keyboard-setting';
import './Key.css';

type KeyProps = {
    keyInfo: KeyInfo
    onClick: () => void
}

const Key: React.FC<KeyProps> = ({ keyInfo, onClick }) => {

    return (
        <button className={`key ${keyInfo.operation}`} onClick={onClick}>
            {keyInfo.sign}
        </button>
    );
}

export default Key;