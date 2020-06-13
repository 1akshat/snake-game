// this will generate 6 digit random id
const Uuid = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export default Uuid;