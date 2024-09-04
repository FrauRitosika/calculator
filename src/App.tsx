import React, { useEffect, useState } from 'react';
import './App.css';
import Keyboard from './componets/Keyboard';
import InputDisplay from './componets/InputDisplay';
import OutputDisplay from './componets/OutputDisplay'
import { KeyInfo } from './keyboard-handler/keyboard-setting';
import { InputResult } from './keyboard-handler/input';

type AppProps = {
  keyboard: Array<KeyInfo>,
  input: (sign: string) => InputResult,
  execute: (expression: string) => number
}

const App: React.FC<AppProps> = ({ keyboard = [], input, execute }) => {

  const [isHorizontal, setHorizontal] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [statusTask, setStatusTask] = useState<string>('IN_PROCCESS');

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, result, statusTask]);

  useEffect(() => {
    const orientationChangeHandler = () => handleHorizontalOrientation();
    window.addEventListener('orientationchange', orientationChangeHandler);
    return () => window.removeEventListener('orientationchange', orientationChangeHandler);
  }, []);

  function inputExpression(key: KeyInfo) {

    let newExperession = expression;

    if (statusTask === 'RESOLVED') {
      newExperession = '';
      setResult(0);
      setStatusTask('IN_PROCCESS');
    }

    switch (key.operation) {
      case 'clean': setExpression(newExperession.slice(0, expression.length - 1));
        break;

      case 'input': setExpression(`${newExperession}${key.sign}`);
        break;

      case 'execute': setResult(execute(newExperession));
        setExpression(newExperession);
        setStatusTask('RESOLVED');
        break;

      case 'cleanAll': setExpression('');
        break;

      default: break;
    }
  }


  function handleKeyDown(event: KeyboardEvent): void {

    const inputResult = input(event.key);
    if (inputResult.isAvailable && !!inputResult.data) {
      inputExpression(inputResult.data);
    }
  }

  function handleHorizontalOrientation(): void {
    if (window.matchMedia("(orientation: landscape)").matches) {
      setHorizontal(true);
    }
  };

  return (
    <main className="calculator-app">
      <div className="calculator">
        <div className="calculator__container">
          <InputDisplay
            className='calculator__input-container'
            expression={`${expression}${statusTask === 'RESOLVED' && !!expression ? '=' : ''}`}
          />
          <OutputDisplay
            className='calculator__output-container'
            result={result}
          />
          <Keyboard
            keyboard={keyboard}
            onClick={inputExpression}
            isHorizontal={isHorizontal}
          />
        </div>
      </div>
    </main >
  );

}

export default App;