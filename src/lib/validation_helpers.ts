const { throwBadRequestError } = require("./error_helpers");


const validateSimpleTypeParam = (value: any, type: string): void => {
    if (typeof value !== type) throwBadRequestError(`"${value}" is not a ${type}`);
}

const validateEmail = (value: any): void => {
    validateSimpleTypeParam(value, 'string');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        throwBadRequestError('Email doesn\'t match pattern');
    }
}

const validateName = (value: any): void => {
    validateSimpleTypeParam(value, 'string');
    if (value.length < 2) {
        throwBadRequestError('Name should contain at least 2 symbols');
    }
}

const validateSurname = (value: any): void => {
    validateSimpleTypeParam(value, 'string');
    if (value.length < 2) {
        throwBadRequestError('Surname should contain at least 2 symbols');
    }
}

const validateUserId = (value: any): void => {
    const id = parseInt(value)
    console.log('id: ', typeof id);
    validateSimpleTypeParam(id, 'number');

}

module.exports = {
    validateSimpleTypeParam, validateEmail,
    validateName, validateUserId, validateSurname
};