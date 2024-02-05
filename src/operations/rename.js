import { rename } from 'fs/promises';

import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError } from '../helpers/showMessage.js';

import { REJECT_MESSAGES } from '../helpers/constants.js';

export const renameFile = async (currentFilePath, newFilePath) => {
  const currentFileParams = await getFileParameters(currentFilePath);
  const newFileParams = await getFileParameters(newFilePath);

  if (currentFileParams.doesNotExist) {
    showError(REJECT_MESSAGES.notAlreadyExists);
    return;
  }

  if (newFileParams.doesExist) {
    showError(REJECT_MESSAGES.alreadyExists);
    return;
  }

  await rename(currentFileParams.filePath, newFileParams.filePath);
};
