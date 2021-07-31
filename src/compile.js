const fs = require('fs');
const colors = require('colors');
const path = require('path');
var readline = require('readline-sync');

async function getFile(bfFileName) {
  try {
    return fs.readFileSync(bfFileName, 'utf-8');
  } catch (er) {
    return [
      er
        .toString()
        .match(/(?<=open ').+\'/)
        .toString()
        .replace("'", ''),
    ];
  }
}

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
      console.log(`>  bfk <path to your file> -str`);
      console.log();
      console.log(`COMMANDS`.bold.white);
      console.log(`>  -help   Display help for BFK`);
      console.log(`>  -v      Display version of BFK`);
      console.log(`>  -str    Returns compiled file as continous string`);
      //AD NEW COMMANDS
      return;
    }
    if (file == '-v') {
      console.log(JSON.parse(JSONFileRes).version);
      return;
    }
    let toStr = cmd == '-str';
    const bfFileName = file.includes('.bf') ? file : file + '.bf';
    let program = await getFile(bfFileName);
    if (typeof program == 'object') {
      console.log();
      console.log(`Unsuccessfully Compiled!`.red.bold);
      console.log(`> Your result:`, `No such file or directory`.cyan, `${bfFileName}`.bold.cyan);
      console.log(`> What to do: `, `Change the path to the file. You're probably misspelled!`.cyan);
      return;
    }
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

      switch (program[i]) {
        case '+':
          block[pointer]++;
          break;
        case '-':
          block[pointer]--;
          break;
        case ',':
          var t = readline.question('Write: ');
          block[pointer] = t.charCodeAt();
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
      if (resString && i == program.length - 1) {
        console.log(resString);
        console.log();
        console.log('> Thank you for using', 'BFK!'.bold.cyan);
      } else if (i == program.length - 1) {
        console.log();
        console.log('> Thank you for using', 'BFK!'.bold.cyan);
      }
    }
  } catch (e) {
    console.log('e', e);
  }
};
