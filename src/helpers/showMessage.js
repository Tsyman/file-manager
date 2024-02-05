import { REJECT_MESSAGES } from './constants.js';

export const showMessage = (message) => {
    process.stdout.write(`${message}\n`);
};

export const showError = (errorText) => {
    const errorMessage = errorText ? errorText : REJECT_MESSAGES.operationFailed;
    showMessage(`${errorMessage}\n`);
};