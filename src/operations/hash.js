import { createReadStream } from 'fs';
import { createHash } from 'crypto';

import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError, showMessage } from '../helpers/showMessage.js';

import { RESPONSE_MESSAGES, REJECT_MESSAGES } from '../helpers/constants.js';

export const calculateFileHash = async (filePath) => {
  const fileParams = await getFileParameters(filePath);

  if (!fileParams.doesExist || fileParams.isFolder || !fileParams.isExist) {
    showError(REJECT_MESSAGES.invalidInput);
    return;
  }

  const readStream = createReadStream(fileParams.filePath);
  const hash = createHash('sha1').setEncoding('hex');

  readStream.pipe(hash);

  hash.on('data', (hashData) => {
    showMessage(`${RESPONSE_MESSAGES.hash} ${hashData}`);
  });

  hash.on('error', () => {
    showError(REJECT_MESSAGES.operationFailed);
  });

  readStream.on('error', () => {
    showError(REJECT_MESSAGES.operationFailed);
  });
};