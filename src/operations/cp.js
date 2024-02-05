import { createReadStream, createWriteStream } from 'fs';
import { parse, join } from 'path';
import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError } from '../helpers/showMessage.js';
import { removeDirectory } from './remove.js';
import { REJECT_MESSAGES } from '../helpers/constants.js';

export const copyFile = async (sourcePath, targetPath, isDeleteSource) => {
  const sourceFileParams = await getFileParameters(sourcePath);

  if (sourceFileParams.doesNotExist) {
    showError(REJECT_MESSAGES.invalidInput);
    return;
  }

  const fullTargetPath = join(targetPath, parse(sourceFileParams.filePath).base);
  const targetFileParams = await getFileParameters(fullTargetPath);

  if (targetFileParams.doesExist) {
    showError(REJECT_MESSAGES.invalidInput);
    return;
  }

  const readStream = createReadStream(sourceFileParams.filePath);
  const writeStream = createWriteStream(targetFileParams.filePath);

  readStream.pipe(writeStream);

  writeStream.on('finish', () => {
    if (isDeleteSource) {
      removeDirectory(sourcePath);
    }
  });

  readStream.on('error', () => {
    showError(REJECT_MESSAGES.operationFailed);
  });

  writeStream.on('error', () => {
    showError(REJECT_MESSAGES.operationFailed);
  });
};