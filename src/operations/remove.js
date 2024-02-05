import { rm as removeFile } from 'fs/promises';
import { getFileParameters } from '../helpers/getFileParameters.js';
import { showError } from '../helpers/showMessage.js';
import { REJECT_MESSAGES } from '../helpers/constants.js';

export const removeDirectory = async (directoryPath) => {
	const directoryParams = await getFileParameters(directoryPath);

	if (directoryParams.doesNotExist) {
		showError(REJECT_MESSAGES.invalidInput);
		return;
	}

	await removeFile(directoryParams.filePath);
};