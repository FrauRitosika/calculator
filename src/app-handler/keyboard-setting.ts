type Sign = {
    sign: string,
    signInput: string
}

type KeyInfo =  {
    operation: string,
    sign: string
}

const mapping: Array<Sign> = [
    {
        sign: '√',
        signInput: '\u221a'
    },
    {
        sign: '%',
        signInput: '\u0025'
    },
    {
        sign: '*',
        signInput: '\u00D7'
    },
    {
        sign: '.',
        signInput: ','
    },
]

const shadowKeyboard: Array<KeyInfo> = [
    {
        operation: 'input',
        sign: '('
    },
    {
        operation: 'input',
        sign: ')',
    },
    {
        operation: 'execute',
        sign: 'Enter'
    },
    {
        operation: 'cleanAll',
        sign: 'Escape',
    },
    {
        operation: 'clean',
        sign: 'Backspace',
    }
]

const keyboard: Array<KeyInfo> = [
    {
        operation: 'clean',
        sign: 'C'
    },
    {
        operation: 'input',
        sign: '\u221a',
    },
    {
        operation: 'input',
        sign: '\u0025'
    },
    {
        operation: 'input',
        sign: '/'
    },
    {
        operation: 'input',
        sign: '7'
    },
    {
        operation: 'input',
        sign: '8'
    },
    {
        operation: 'input',
        sign: '9'
    },
    {
        operation: 'input',
        sign: '\u00D7'
    },
    {
        operation: 'input',
        sign: '4'
    },
    {
        operation: 'input',
        sign: '5'
    },
    {
        operation: 'input',
        sign: '6'
    },
    {
        operation: 'input',
        sign: '-'
    },
    {
        operation: 'input',
        sign: '1'
    },
    {
        operation: 'input',
        sign: '2'
    },
    {
        operation: 'input',
        sign: '3'
    },
    {
        operation: 'input',
        sign: '+'
    },
    {
        operation: 'input',
        sign: '00'
    },
    {
        operation: 'input',
        sign: '0'
    },
    {
        operation: 'input',
        sign: ','
    },
    {
        operation: 'execute',
        sign: '='
    }
];

export {keyboard, mapping, shadowKeyboard, Sign, KeyInfo}