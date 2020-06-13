import isNumber from 'ecmascript-is-number';

const maxSupportedLength = 20;

const randomNumber = (length) => {
    if (!isNumber(length)) {
        return;
    }

    if (length > maxSupportedLength) {
        return;
    }

    let number = Math.random();
    while (length > 0) {
        number *= 10;
        length--;
    }
    const randomNumberWithoutDecimals = Math.floor(number);
    return randomNumberWithoutDecimals;
}

export { randomNumber }