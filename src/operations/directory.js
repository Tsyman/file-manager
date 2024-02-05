import path from 'path';
import { homedir } from 'os';
import { access } from 'fs/promises';
import { showMessage, showError } from '../helpers/showMessage.js';
import { REJECT_MESSAGES } from '../helpers/constants.js';

export const changeDirectory = async (targetPath) => {
  const normalizedPath = path.normalize(targetPath);
  const isAbsolutePath = path.isAbsolute(normalizedPath);

  try {
    if (isAbsolutePath) {
      await updateCurrentDirectory(normalizedPath);
    } else {
      const currentDirectory = process.env.CURRENT_DIRECTORY;
      const absoluteDirectory = path.join(currentDirectory, normalizedPath);

      if (await isDirectoryExist(absoluteDirectory)) {
        await updateCurrentDirectory(absoluteDirectory);
      } else {
        showMessage(REJECT_MESSAGES.directoryDoesNotExist);
      }

      if (!absoluteDirectory.includes(homedir())) {
        await updateCurrentDirectory(homedir());
      }
    }
  } catch (err) {
    showError(err ? err : REJECT_MESSAGES.invalidDirectory);
  }
};

const updateCurrentDirectory = async (newDirectory) => {
  if (await isDirectoryExist(newDirectory)) {
    process.env.CURRENT_DIRECTORY = newDirectory;
  } else {
    showMessage(REJECT_MESSAGES.directoryDoesNotExist);
  }
};

export const isDirectoryExist = async (directory) => {
  try {
    await access(directory);
    return true;
  } catch {
    return false;
  }
};
