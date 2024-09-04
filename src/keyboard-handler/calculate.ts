import { mapping, Sign } from './keyboard-setting';

const expressionExecute = (expression: string) => {

    expression = expression.replace(/ /g, '');
    mapping.forEach((item: Sign) => {
        expression = expression.replace(item.signInput, item.sign);
    });

    const executeBrackets = (expression: string): number => {


        if (/\(|\)/.test(expression)) {
            let startIndex = -1;
            const expressionArray = expression.split('');
            expressionArray.forEach((sign: string, index: number) => {
                if (sign === '(') startIndex = index;
            });
            if (startIndex === -1) throw new Error('выражение cодержит ошибку');

            const endIndex: number = expressionArray.findIndex((sign: string, index: number) => sign === ')' && index > startIndex);
            if (endIndex === -1) throw Error('выражение cодержит ошибку');

            const subExpression = expression.slice(startIndex + 1, endIndex);
            const result = executeBrackets(subExpression);

            const newExpression = (startIndex === 0 ? '' : expression.slice(0, startIndex)) + result.toString() + (endIndex + 1 === expression.length ? '' : expression.slice(endIndex + 1, expression.length));
            return executeBrackets(newExpression);

        }

        return execute(expression);

    }

    return executeBrackets(expression);

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
            throw new Error('выражение cодержит ошибку');
        }

        return args.map((arg: string) => execute(arg))
            .reduce((sum: number, arg: number) => sum + arg, 0);
    }

    if (expression.includes('-')) {
        const args = expression.split('-');

        if (!args.length) {
            throw new Error('выражение cодержит ошибку');
        }

        return args.map((arg: string) => execute(arg))
            .map((arg: number, index: number) => index ? 0 - arg : arg)
            .reduce((sum: number, arg: number) => sum + arg, 0);
    }

    if (expression.includes('*')) {
        const args = expression.split('*');

        if (!args.length || args.includes('')) {
            throw new Error('выражение cодержит ошибку');
        }

        return args.map((arg: string) => execute(arg))
            .reduce((sum: number, arg: number) => sum * arg, 1);
    }

    if (expression.includes('/')) {
        const args = expression.split('/');

        if (!args.length || args.includes('')) {
            throw new Error('выражение cодержит ошибку');
        }

        return args.map((arg: string) => execute(arg))
            .reduce((res: number, arg: number, index: number) => index ? res / arg : arg, 1);
    }

    if (expression.includes('√')) {
        const args = expression.split('√');
        if (args.length !== 2) {
            throw new Error('выражение cодержит ошибку');
        }
        const factor = args[0] === '' ? 1 : execute(args[0]);
        return factor * Math.sqrt(execute(args[1]));
    }


    if (expression.includes('%')) {
        const args = expression.split('%');
        if (args.length !== 2 || args[1] !== '') {
            throw new Error('выражение cодержит ошибку');
        };
        return execute(args[0]) / 100;
    }

    throw new Error('выражение cодержит ошибку');
}



export default expressionExecute;