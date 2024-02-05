import { createReadStream } from 'fs';
import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError } from '../helpers/showMessage.js';
import { REJECT_MESSAGES } from '../helpers/constants.js';

export const displayFileContent = async (filePath) => {
  const fileParams = await getFileParameters(filePath);

  if (!fileParams.doesExist) {
    showError(REJECT_MESSAGES.invalidInput);
    return;
  }

  const readStream = createReadStream(fileParams.filePath);
  readStream.pipe(process.stdout);

  readStream.on('error', (err) => {
      showError(`${REJECT_MESSAGES.errorReadingFile} ${err.message}`);
  });
};