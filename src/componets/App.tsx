import React, { useEffect, useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import InputDisplay from './InputDisplay';
import OutputDisplay from './OutputDisplay';
import ErrorModal from './ErrorModal';
import { KeyInfo } from '../keyboard-setting';
import { InputResult } from '../app-handler/input';

type AppProps = {
  keyboard: Array<KeyInfo>,
  input: (sign: string) => InputResult,
  execute: (expression: string) => number
}

type errorCalculate = {
  isActive: boolean
  text?: string
}

enum TaskStatus {
  InProcess = 'IN_PROCESS',
  Resolved = 'RESOLVED',
}

const App: React.FC<AppProps> = ({ keyboard = [], input, execute }) => {

  const [isHorizontal, setHorizontal] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<number>(0);
  const [statusTask, setStatusTask] = useState<TaskStatus>(TaskStatus.InProcess);
  const [errorCalculate, setErrorCalculate] = useState<errorCalculate>({ isActive: false });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression,statusTask]);

  useEffect(() => {
    const orientationChangeHandler = () => handleHorizontalOrientation();
    window.addEventListener('orientationchange', orientationChangeHandler);
    return () => window.removeEventListener('orientationchange', orientationChangeHandler);
  }, []);

  function inputExpression(key: KeyInfo) {

    let newExperession = expression;

    if (statusTask === TaskStatus.Resolved) {
      newExperession = '';
      setResult(0);
      setStatusTask(TaskStatus.InProcess);
    }

    switch (key.operation) {
      case 'clean': setExpression(newExperession.slice(0, expression.length - 1));
        break;

      case 'input': setExpression(`${newExperession}${key.sign}`);
        break;

      case 'execute':
        try {
          setResult(execute(newExperession));
          setExpression(newExperession);
          setStatusTask(TaskStatus.Resolved);
        } catch (error: any) {
          if (error instanceof Error) {
            setErrorCalculate({ isActive: true, text: error.message });
          }
          else {
            throw new Error('Неизвестная ошибка');
          }
        }

        break;

      case 'cleanAll': setExpression('');
      setResult(0);
      setStatusTask(TaskStatus.InProcess);
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

  function closeError(): void {
    setErrorCalculate({ isActive: false });
  }

  return (
    <main className="calculator-app">
      <div className="calculator">
        <div className="calculator__container">
          <InputDisplay
            className='calculator__input-container'
            expression={`${expression}${statusTask === TaskStatus.Resolved && !!expression ? '=' : ''}`}
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
        {errorCalculate.isActive && (<ErrorModal onClick={closeError} errorText={errorCalculate.text ?? ''} />)}
      </div>
    </main >
  );

}

export default App;