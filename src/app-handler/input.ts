import { keyboard, mapping, shadowKeyboard, KeyInfo } from '../keyboard-setting';

const keyboardAvailableInput = [...keyboard.map(item => item.sign), ...shadowKeyboard.map(item => item.sign), ...mapping.map(item => item.sign)];

type InputResult = {
    data: KeyInfo | undefined | null,
    isAvailable: boolean
}

const input = (key: string): InputResult => {
    if (keyboardAvailableInput.includes(key)) {

        const sign = mapping.find(item => item.sign === key)?.signInput ?? key;
        const data = [...keyboard,...shadowKeyboard] .find((item: KeyInfo) => item.sign === sign);

        return {
            data: data,
            isAvailable: data ? true : false
        }
    }

    return {
        data: null,
        isAvailable: false
    }
}

export {InputResult, input}