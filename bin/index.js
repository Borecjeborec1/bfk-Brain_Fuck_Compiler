#!/usr/bin/env node

const app = require('../src/compile.js');
let args = process.argv.splice(2);
if (args[1]) {
  app.compile(args[0], args[1]);
} else {
  app.compile(args[0]);
}
