import React, { useState } from 'react';
import './App.css';
import Keyboard from './keyboard/Keyboard';
import ExpressionDisplay from './display/ExpressionDisplay';
import { integerValidation, calculate, calculatePersent } from './numberOperation';
import { isNullOrUndef } from 'chart.js/helpers';



export default function App({ keyboard = [] }) {

  const [enteredNumberString, setEnteredNumberString] = useState('0');
  const [currentOperator, setCurrentOperator] = useState(null);
  const [statusOperation, setStatusOperation] = useState('WAITING_FOR_NUMBER');
  const [result, setResult] = useState(0);
  const [expression, changeExpression] = useState('');

  function getExpressionStringWithOperator(operator) {
    const number = getEnteredNumber();
    const floatString = number.toString().split('.').join('\u002C');
    const string = (number < 0) ? `(${floatString})` : `${floatString}`;

    if (expression === '') {
      return `${string}${operator ? (operator.signString ? operator.signString : operator.sign) : ''}`;
    } else if (operator) {
      const signString = operator.signString ? operator.signString : operator.sign;
      const firstPartExpression = (statusOperation === 'WAITING_FOR_OPERATOR') ? expression : `${expression}${string}`;
      const needParentheses = (operator.sign !== '%') && (!currentOperator || currentOperator.sign === '/' ||
        (currentOperator.priority === 'low' && operator.priority === 'high'));
      return needParentheses ? `(${firstPartExpression})${signString}` : `${firstPartExpression}${signString}`;
    } else {
      return `${expression}${(statusOperation === 'WAITING_FOR_OPERATOR') ? '' : string}`;
    }
  }

  function addFraction() {
    if (enteredNumberString.includes('\u002C')) {
      throw new Error('Для числа уже указана дробная часть');
    }
    setEnteredNumberString(`${enteredNumberString ? enteredNumberString : '0'}\u002C`);
  }

  function addInteger(integerString) {
    if (Array.from(integerString).filter(int => int === '0').length === integerString.length) {
      setEnteredNumberString(enteredNumberString === '0' ? '0' : enteredNumberString + integerString);
    } else if (integerValidation(Number(integerString))) {
      setEnteredNumberString(`${enteredNumberString === '0' ? '' : enteredNumberString}${integerString}`);
    } else {
      throw new Error('К числу можно добавить только цифру');
    }
  }

  function setNegative() {
    if (enteredNumberString === '-') {
      setEnteredNumberString('0');
    } else if (enteredNumberString === '0') {
      setEnteredNumberString('-');
    } else {
      throw new Error('Некорректный воод. Число нельзя сделать негативным');
    }
  }

  function getEnteredNumber() {
    const floatString = Number(enteredNumberString.toString().split('\u002C').join('.'));
    return Number.isNaN(floatString) ? 0 : floatString;
  }

  function inputSign(sign) {
    switch (sign) {
      case ',': addFraction();
        break;
      case '-': setNegative();
        break;
      default: addInteger(sign);
        break;
    }
    setStatusOperation('WAITING_FOR_ENTRY');
  }

  function clean(newSign) {
    setResult(0);
    changeExpression('');
    const enteredNumber = (newSign === '.') ? '0.' : (integerValidation(Number(newSign)) ? Number(newSign).toString() : '0');
    setEnteredNumberString(enteredNumber);
    setCurrentOperator(null);
    setStatusOperation('WAITING_FOR_NUMBER');
  }

  function execute(isDisplayResult, operator) {

    const currentResult = calculate(getEnteredNumber(), currentOperator?.sign, result);
    setResult(currentResult);
    setEnteredNumberString(isDisplayResult ? currentResult.toString() : '0');
    changeExpression(getExpressionStringWithOperator(operator ? operator : null));
    setCurrentOperator(operator ? operator : null);
    setStatusOperation('WAITING_FOR_OPERATOR');


  }

  function inputOperator(operator) {
    if (statusOperation === 'WAITING_FOR_NUMBER' && currentOperator) {
      setCurrentOperator(operator);
      changeExpression(getExpressionStringWithOperator(operator));
    } else {
      execute(false, operator);
    }

    setStatusOperation('WAITING_FOR_NUMBER');
  }

  function input(key) {

    try {

      switch (key.operation) {
        case 'input': if (statusOperation === 'WAITING_FOR_OPERATOR') {
          clean(key.sign);
        } else {
          inputSign(key.sign);
        }
          break;
        case 'baseMathOperation': if ((key.sign === '-') && (statusOperation === 'WAITING_FOR_NUMBER')) {
          inputSign(key.sign);
        } else {
          inputOperator(key);
        }
          break;
        case 'execute': execute(true);
          break;
        case 'clean': clean();
          break;

        case 'squareRoot':

          const currentResult = currentOperator ? calculate(getEnteredNumber(), currentOperator?.sign, result) : getEnteredNumber();
          const squareRootResult = calculate(currentResult, key.sign);
          setResult(squareRootResult);
          setEnteredNumberString(squareRootResult.toString());
          changeExpression(`${key.signString}(${getExpressionStringWithOperator()})`);
          setCurrentOperator(null);
          setStatusOperation('WAITING_FOR_OPERATOR');

          break;

        case 'percent':
          let newResult;

          if (statusOperation === 'WAITING_FOR_OPERATOR') {
            newResult = getEnteredNumber() / 100;
          } else if (isNullOrUndef(currentOperator) || ['*', '/'].includes(currentOperator.sign)) {
            const percentResult = getEnteredNumber() / 100;
            newResult = calculate(percentResult, currentOperator?.sign, result);
          } else if (['+', '-'].includes(currentOperator.sign)) {
            newResult = calculatePersent(result, getEnteredNumber(), currentOperator.sign);
          } else {
            throw new Error('Некоррентный ввод');
          }

          setResult(newResult);
          setEnteredNumberString(newResult.toString());
          changeExpression(getExpressionStringWithOperator(key));
          setCurrentOperator(null);
          setStatusOperation('WAITING_FOR_OPERATOR');

          break;

        default: new Error('что-то не так');
      }
    }
    catch (err) {
      console.log(err.message);
      clean();
    }

  }

  return (
    <main className="calculator-app">
      <div className="calculator">
        <ExpressionDisplay
          expression={expression}
        />
        <p className="input-display">{enteredNumberString}</p>
        <Keyboard
          keyboard={keyboard}
          onClick={(key) => input(key)} />
      </div>
    </main>
  );
}
