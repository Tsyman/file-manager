import { homedir } from 'os';
import { RESPONSE_MESSAGES } from './constants.js';
import { showMessage } from './showMessage.js';

export const showCurrentDirectory = () => {
    if (!process.env.CURRENT_DIRECTORY) {
        process.env.CURRENT_DIRECTORY = homedir();
    }
    const currentDirectoryMessage = `${RESPONSE_MESSAGES.currentPath} ${process.env.CURRENT_DIRECTORY}`;
    showMessage(currentDirectoryMessage);
};