const fs = require('fs');
const colors = require('colors');
const path = require('path');

exports.compile = async function (file, cmd) {
  try {
    const dirPath = path.join(__dirname, '../package.json');
    let JSONFileRes = fs.readFileSync(dirPath, 'utf-8');
    if (!file || file == '-help') {
      console.log(`Welcome in BFK!`.green.bold);
      console.log();
      console.log(`VERSION`.bold.white);
      console.log(JSON.parse(JSONFileRes).version);
      console.log();
      console.log(`USAGE`.bold.white);
      console.log(`>  bfk <path to your file>`);
      console.log();
      console.log(`COMMANDS`.bold.white);
      console.log(`>  -help   Display help for BFK`);
      console.log(`>  -v      Display version of BFK`);
      //AD NEW COMMANDS
      return;
    }
    if (file == '-v') {
      console.log(JSON.parse(JSONFileRes).version);
      return;
    }
    let toStr = cmd == '-str';
    const bfFileName = file.includes('.bf') ? file : file + '.bf';
    let program = await fs.readFileSync(bfFileName, 'utf-8');
    let block = Array(100).fill(0);
    let pointer = 0;
    let isLooping = false;
    let loopStack = [];
    let innerLoops = 0;
    let resString = '';

    for (i = 0; i < program.length; i++) {
      if (isLooping) {
        if (program[i] === '[') innerLoops++;
        if (program[i] === ']') {
          if (innerLoops === 0) isLooping = false;
          else innerLoops--;
        }
        continue;
      }
      if (resString && i == program.length - 1) {
        console.log(resString);
      } else if (i == program.length - 1) {
        console.log();
        console.log('> Thank you for using', 'BFK!'.bold.cyan);
      }
      switch (program[i]) {
        case '+':
          block[pointer]++;
          break;
        case '-':
          block[pointer]--;
          break;
        case ',':
          break;
        case '.':
          if (toStr) {
            resString += String.fromCharCode(block[pointer]);
          } else {
            console.log(String.fromCharCode(block[pointer]));
          }
          break;
        case '>':
          pointer++;
          block[pointer] = block[pointer] || 0;
          break;
        case '<':
          pointer--;
          block[pointer] = block[pointer] || 0;
          break;
        case '[':
          block[pointer] === 0 ? (isLooping = true) : loopStack.push(i);
          break;
        case ']':
          block[pointer] !== 0 ? (i = loopStack[loopStack.length - 1]) : loopStack.pop();
          break;
        default:
          break;
      }
    }
  } catch (e) {
    console.log('e', e);
  }
};
