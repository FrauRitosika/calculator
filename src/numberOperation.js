import {fixedCount} from './calculate-settings';

const integerValidation = (integer) => (typeof(integer) !== 'number' || isNaN(integer) || integer.toString().includes('.')) ? false : true;

function calculate(number, operator, priviousNumber = 0) {
  if (isNaN(number) || isNaN(priviousNumber) || typeof(number) !== 'number' || typeof(priviousNumber) !== 'number' ) {
    throw Error('Некорректный ввод данных. Операции выполняются только над числами.');
  }

  switch (operator) {
    case '+':
      return Number((priviousNumber + number).toFixed(fixedCount));
    case '-':
      return Number((priviousNumber - number).toFixed(fixedCount));
    case '*':
      return Number((priviousNumber * number).toFixed(fixedCount));
    case '/':
      return Number((priviousNumber / number).toFixed(fixedCount));
    case 'sqrt':
      return Number(Math.sqrt(number).toFixed(fixedCount));
    default: return Number(number.toFixed(fixedCount));
  }
}

function calculatePersent(number, persent, operator) {
  if (!Number.isFinite(number) || !Number.isFinite(persent)) {
    throw Error('Некорректный ввод данных. Операции выполняются только на числами.');
  }

  switch (operator) {
    case '+':
      return Number((number + number*persent/100).toFixed(fixedCount));
    case '-':
      return Number((number - number*persent/100).toFixed(fixedCount));
    default: return Number(number.toFixed(fixedCount));
  }
}

export { integerValidation, calculate, calculatePersent };