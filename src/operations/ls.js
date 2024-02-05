import { readdir } from 'fs/promises';

import { getFileParameters } from '../helpers/getFileParameters.js';
import { showMessage } from '../helpers/showMessage.js';

import { REJECT_MESSAGES } from '../helpers/constants.js';

export const listFiles = async (directoryPath) => {
  const directoryOptions = await getFileParameters(directoryPath);

  if (directoryOptions.doesNotExist) {
    showMessage(REJECT_MESSAGES.invalidInput);
    return;
  }

  const filesInDirectory = await readdir(directoryPath);
  showMessage(filesInDirectory.join(', '));
};
