#!/usr/bin/env node

const app = require('../src/compile.js');
let args = process.argv.splice(2);
app.compile(args[0]);
