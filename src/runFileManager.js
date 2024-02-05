import process from "process";
import { showMessage, showError } from './helpers/showMessage.js';
import { showCurrentDirectory } from './helpers/showInfo.js';
import { changeDirectory } from './operations/directory.js';
import { listFiles } from './operations/ls.js';
import { displayFileContent } from './operations/cat.js';
import { createFile } from './operations/add.js';
import { renameFile } from './operations/rename.js';
import { copyFile } from './operations/cp.js';
import { removeDirectory } from './operations/remove.js';
import { executeOsCommand } from './operations/os.js';
import { calculateFileHash } from './operations/hash.js';
import { compressFile } from './operations/compress.js';
import { FILE_MANAGER_COMMANDS, REJECT_MESSAGES, RESPONSE_MESSAGES } from './helpers/constants.js';

export const runFileManager = async (command, args) => {
  try {
    switch (command) {
      case FILE_MANAGER_COMMANDS.close:
        showMessage(`${RESPONSE_MESSAGES.finishFileManagerFirstPart}, ${process.env.USERNAME}, ${RESPONSE_MESSAGES.finishFileManagerSecondPart}!`);
        process.exit();
        break;
      case FILE_MANAGER_COMMANDS.cd:
        handleSingleArgCommand(args, changeDirectory);
        break;
      case FILE_MANAGER_COMMANDS.up:
        await changeDirectory('..');
        showCurrentDirectory();
        break;
      case FILE_MANAGER_COMMANDS.ls:
        await listFiles(process.env.CURRENT_DIRECTORY);
        showCurrentDirectory();
        break;
      case FILE_MANAGER_COMMANDS.cat:
        handleSingleArgCommand(args, displayFileContent);
        break;
      case FILE_MANAGER_COMMANDS.add:
        handleSingleArgCommand(args, createFile);
        break;
      case FILE_MANAGER_COMMANDS.rn:
        handleDoubleArgCommand(args, renameFile);
        break;
      case FILE_MANAGER_COMMANDS.cp:
        handleDoubleArgCommand(args, (src, dest) => copyFile(src, dest, false));
        break;
      case FILE_MANAGER_COMMANDS.mv:
        handleDoubleArgCommand(args, (src, dest) => copyFile(src, dest, true));
        break;
      case FILE_MANAGER_COMMANDS.rm:
        handleSingleArgCommand(args, removeDirectory);
        break;
      case FILE_MANAGER_COMMANDS.os:
        handleSingleArgCommand(args, executeOsCommand);
        break;
      case FILE_MANAGER_COMMANDS.hash:
        handleSingleArgCommand(args, calculateFileHash);
        break;
      case FILE_MANAGER_COMMANDS.compress:
        handleDoubleArgCommand(args, (src, dest) => compressFile(src, dest, true));
        break;
      case FILE_MANAGER_COMMANDS.decompress:
        handleDoubleArgCommand(args, (src, dest) => compressFile(src, dest, false));
        break;
      default:
        showMessage(REJECT_MESSAGES.invalidInput);
    }
  } catch (err) {
    showError(err);
  }
};

const handleSingleArgCommand = (args, action) => {
  if (args.length === 1) {
    action(args[0]);
    showCurrentDirectory();
  } else {
    showMessage(REJECT_MESSAGES.invalidInput);
  }
};

const handleDoubleArgCommand = (args, action) => {
  if (args.length === 2) {
    action(args[0], args[1]);
    showCurrentDirectory();
  } else {
    showMessage(REJECT_MESSAGES.invalidInput);
  }
};