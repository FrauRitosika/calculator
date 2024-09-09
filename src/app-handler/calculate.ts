import { keyboard, KeyInfo, mapping, Sign } from '../keyboard-setting';
import settings from './calculate-settings.json';
import { ValidationExpressionError } from './errors';

const fixedCount = settings?.fixedCount ?? 2;
const factorAccuracy = Math.pow(10, settings.factorAccuracy ?? 1);

const expressionExecute = (expression: string) => {

    expression = replacingСonsecutiveOperators(mappingStringToMathExpression(expression));
    return Number(executeBrackets(expression).toFixed(fixedCount));

}

function mappingStringToMathExpression(expression: string): string {
    expression = expression.replace(/ /g, '');
    mapping.forEach((item: Sign) => {
        expression = expression.replace(item.signInput, item.sign);
    });

    return expression;
}

function replacingСonsecutiveOperators(expression: string): string {

    while ((/\+\+|--|\+-|-\+/g).test(expression)) {
        expression = expression.replace(/\+\+|--/g, '+');
        expression = expression.replace(/\+-|-\+/g, '-');
    }

    return expression;
}

function executeBrackets(expression: string): number {

    if (/\(|\)/.test(expression)) {
        let startIndex = -1;
        const expressionArray = expression.split('');
        expressionArray.forEach((sign: string, index: number) => {
            if (sign === '(') startIndex = index;
        });
        if (startIndex === -1) throw new ValidationExpressionError();

        const endIndex: number = expressionArray.findIndex((sign: string, index: number) => sign === ')' && index > startIndex);
        if (endIndex === -1) throw new ValidationExpressionError();

        const subExpression = expression.slice(startIndex + 1, endIndex);
        const result = executeBrackets(subExpression);

        if(startIndex !== 0) {
            if(!['/','*','+','-','√'].includes(expression[startIndex-1])) {
                throw new ValidationExpressionError();
            }
        }
        
        const newExpression = (startIndex === 0 ? '' : expression.slice(0, startIndex)) + result.toString() + (endIndex + 1 === expression.length ? '' : expression.slice(endIndex + 1, expression.length));
        return executeBrackets(newExpression);

    }
    return execute(expression);
}


function execute(expression: string): number {

    if (expression === '') {
        return 0;
    }
    if (/^(-?\d+(\.\d+)?|\d+(\.\d+)?)$/.test(expression)) {
        return Number(expression);
    }

    if (expression.includes('+')) {
        const args = expression.split('+');

        if (!args.length) {
            throw new ValidationExpressionError();
        }

        return args.map((arg: string) => execute(arg))
            .reduce((sum: number, arg: number) => sum + arg * factorAccuracy, 0) / factorAccuracy;

    }

    if (expression.includes('-')) {
        const args = expression.split('-');

        if (!args.length) {
            throw new ValidationExpressionError();
        }

        return args.map((arg: string) => execute(arg))
            .map((arg: number, index: number) => index ? 0 - arg : arg)
            .reduce((sum: number, arg: number) => sum + arg * factorAccuracy, 0) / factorAccuracy;
    }

    if (expression.includes('*')) {
        const args = expression.split('*');

        if (!args.length || args.includes('')) {
            throw new ValidationExpressionError();
        }

        return args.map((arg: string) => execute(arg))
            .reduce((sum: number, arg: number) => sum * arg, factorAccuracy) / factorAccuracy;
    }

    if (expression.includes('/')) {
        const args = expression.split('/');

        if (!args.length || args.includes('')) {
            throw new ValidationExpressionError();
        }

        return args.map((arg: string) => execute(arg))
            .reduce((res: number, arg: number, index: number) => index ? res / arg : arg * factorAccuracy, 1) / factorAccuracy;
    }

    if (expression.includes('√')) {
        let arg1: string = '';
        let arg2: string = expression;
        const signArr = expression.split('');
        const indexFirstSign: number = signArr.findIndex((sign: string) => sign === '√');

        if (indexFirstSign !== -1) {
            arg1 = indexFirstSign === 0 ? '' : signArr.slice(0, indexFirstSign).join('');
            arg2 = signArr.slice(indexFirstSign + 1, signArr.length).join('');
        }

        const factor = arg1 === '' ? 1 : execute(arg1);
        return factor * Math.sqrt(execute(arg2));
    }


    if (expression.includes('%')) {
        if (expression[expression.length - 1] === '%') {
            return execute(expression.slice(0, expression.length - 1)) / 100;
        }
        throw new ValidationExpressionError();
    }

    throw new ValidationExpressionError();
}



export default expressionExecute;