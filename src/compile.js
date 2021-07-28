const fs = require('fs');
exports.compile = async function (file) {
  try {
    const bfFileName = file.includes('.bf') ? file : file + '.bf';
    let program = await fs.readFileSync(bfFileName, 'utf-8');
    let block = Array(100).fill(0);
    let pointer = 0;
    let isLooping = false;
    let loopStack = [];
    let innerLoops = 0;

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
          break;
        case '.':
          console.log(String.fromCharCode(block[pointer]));
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
