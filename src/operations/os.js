import os from 'os';
import { showMessage } from '../helpers/showMessage.js';
import { OS_COMMAND_OPTIONS, OS_TEXT_DESCRIPTIONS, REJECT_MESSAGES } from '../helpers/constants.js';

export const executeOsCommand = (command) => {
  switch (command) {
    case OS_COMMAND_OPTIONS.eol:
      showMessage(`${OS_TEXT_DESCRIPTIONS.eol} ${JSON.stringify(os.EOL)}`);
      break;
    case OS_COMMAND_OPTIONS.cpus:
      const cpusInfo = os.cpus().map((item) => ({ ...item, times: undefined }));
      console.table(cpusInfo);
      break;
    case OS_COMMAND_OPTIONS.homedir:
      showMessage(`${OS_TEXT_DESCRIPTIONS.homedir} ${os.userInfo().homedir}`);
      break;
    case OS_COMMAND_OPTIONS.username:
      showMessage(`${OS_TEXT_DESCRIPTIONS.username} ${os.userInfo().username}`);
      break;
    case OS_COMMAND_OPTIONS.architecture:
      showMessage(`${OS_TEXT_DESCRIPTIONS.architecture} ${os.arch()}`);
      break;
    default:
      showMessage(REJECT_MESSAGES.invalidInput);
  }
};
