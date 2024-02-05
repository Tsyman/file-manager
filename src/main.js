import { start } from './helpers/start.js';
import { runFileManager } from './runFileManager.js';
import { showMessage } from './helpers/showMessage.js';
import { showCurrentDirectory } from './helpers/showInfo.js';
import { RESPONSE_MESSAGES } from './helpers/constants.js';

const main = async () => {
  start();
  showCurrentDirectory();

  process.stdin.on('data', async (inputData) => {
    const [command, ...args] = inputData.toString().trim().split(' ');
    await runFileManager(command, args);
  });

  process.on('SIGINT', () => {
    showMessage(`${RESPONSE_MESSAGES.finishFileManagerFirstPart}, ${process.env.USERNAME}, ${RESPONSE_MESSAGES.finishFileManagerSecondPart}!`);
    process.exit();
  });
};

await main();