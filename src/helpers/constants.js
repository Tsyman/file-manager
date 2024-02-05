export const FILE_MANAGER_COMMANDS = {
  close: '.exit',
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};

export const OS_COMMAND_OPTIONS = {
  eol: '--EOL',
  cpus: '--cpus',
  homedir: '--homedir',
  username: '--username',
  architecture: '--architecture',
};

export const OS_TEXT_DESCRIPTIONS = {
  eol: 'End-of-line:',
  homedir: 'Home directory:',
  username: 'System username:',
  architecture: 'Architecture:',
};

export const RESPONSE_MESSAGES = {
  welcomeFileManager: 'Welcome to the File Manager',
  finishFileManagerFirstPart: 'Thank you for using File Manager',
  finishFileManagerSecondPart: 'goodbye',
  currentPath: 'You are currently in',
  hash: 'Hash:',
  successCompress: 'Compress completed successfully',
  successDecompress: 'Decompress completed successfully',
};

export const REJECT_MESSAGES = {
  invalidInput: 'Invalid input',
  operationFailed: 'Operation failed',
  directoryDoesNotExist: 'Directory does not exist',
  invalidDirectory: 'An error occurred while changing the directory',
  errorReadingFile: 'Error reading file:',
  errorWritingFile: 'Error writing file:',
  alreadyExists: 'File with this name already exists',
  notAlreadyExists: 'File with this name does not exist',
};