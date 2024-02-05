import { createWriteStream } from 'fs';
import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError } from '../helpers/showMessage.js';
import { REJECT_MESSAGES } from '../helpers/constants.js';

export const createFile = async (filePath) => {
  const fileParams = await getFileParameters(filePath);

  if (fileParams.doesExist) {
    showError(REJECT_MESSAGES.invalidInput);
    return;
  }
  
  const writeStream = createWriteStream(fileParams.filePath);

  writeStream.on('error', (err) => {
    showError(`${REJECT_MESSAGES.errorWritingFile} ${err.message}`);
  });
};
