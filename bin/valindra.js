#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('valindra')
  .version('1.0.0')
  .description('A mythic CLI for weaving narrative and code.')
  .command('init', 'Initialize a new mythos seed project.')
  .parse(process.argv);
