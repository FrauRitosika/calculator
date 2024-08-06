import Key from "./Key";
import './Keyboard.css';

export default function Keyboard({ keyboard = [], onClick, isHorizontal }) {

    return (
            <ul className={`keyboard ${isHorizontal ? 'horizontal' : ''}`}>
                {keyboard.map((key,index) => (
                    <li key={key.sign} className={`row-${Math.trunc(index/4)+1}`} >
                        <Key
                            sign={key.signString ? key.signString : key.sign}
                            operationName={key.operation}
                            onClick={() => onClick(key)}
                        />
                    </li>))}
            </ul>
    );
}