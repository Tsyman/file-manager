import path from 'path';
import { lstat } from 'fs/promises';
import { isDirectoryExist } from '../operations/directory.js';

export const getFileParameters = async (inputPath) => {
  const normalizedPath = path.normalize(inputPath);
  const isAbsolutePath = path.isAbsolute(normalizedPath);
  const absolutePath = isAbsolutePath ? normalizedPath : path.join(process.env.CURRENT_DIRECTORY, normalizedPath);

  let fileStats;
  const doesExist = await isDirectoryExist(absolutePath);
  const doesNotExist = !doesExist;

  if (doesExist) {
    fileStats = (await lstat(absolutePath)).isDirectory();
  }

  return {
    filePath: absolutePath,
    doesExist,
    doesNotExist,
    isFolder: fileStats !== undefined ? fileStats : undefined,
  };
};