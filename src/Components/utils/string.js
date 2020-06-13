// this will generate 6 digit random id
const randomAlphaNumeric = (length) => {
    return Math.floor(100000 + Math.random() * 900000);
};

export { randomAlphaNumeric }