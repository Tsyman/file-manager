import { RESPONSE_MESSAGES } from './constants.js';

const extractUsernameFromCommandLine = () => {
  const commandLineArgs = process.argv.slice(2);
  const usernameArg = commandLineArgs.find(arg => arg.startsWith('--username'));

  if (usernameArg) {
    const currentUsername = usernameArg.split('=')[1];
    return capitalizeFirstLetter(currentUsername);
  } else {
    return 'Username';
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getUsername = () => {
  return extractUsernameFromCommandLine();
};

const setUsername = () => {
  process.env.USERNAME = getUsername();
};

export const start = () => {
  setUsername();
  const welcomeMessage = `${RESPONSE_MESSAGES.welcomeFileManager}, ${process.env.USERNAME}!`;
  console.log(welcomeMessage);
  return welcomeMessage;
};