import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { getFileParameters } from '../helpers/getFileParameters.js';
import { showMessage } from '../helpers/showMessage.js';
import { REJECT_MESSAGES, RESPONSE_MESSAGES } from '../helpers/constants.js';

export const compressFile = async (sourceFile, destinationFile, isCompressCommand) => {
  const sourceFileParams = await getFileParameters(sourceFile);
  const destinationFileParams = await getFileParameters(destinationFile);

  if (sourceFileParams.doesNotExist || destinationFileParams.doesExist) {
    showMessage(REJECT_MESSAGES.invalidInput);
    return;
  }

  const readStream = createReadStream(sourceFileParams.filePath);
  const writeStream = createWriteStream(destinationFileParams.filePath);
  const compressionStream = isCompressCommand ? zlib.createBrotliCompress() : zlib.createBrotliDecompress();

  const stream = readStream.pipe(compressionStream).pipe(writeStream);

  readStream.on('error', () => {
    showMessage(REJECT_MESSAGES.operationFailed);
  });

  writeStream.on('error', () => {
    showMessage(REJECT_MESSAGES.operationFailed);
  });

  compressionStream.on('error', () => {
    showMessage(REJECT_MESSAGES.operationFailed);
  });

  stream.on('finish', () => {
    const successMessage = isCompressCommand ? RESPONSE_MESSAGES.successCompress : RESPONSE_MESSAGES.successDecompress;
    showMessage(successMessage);
  });
};
