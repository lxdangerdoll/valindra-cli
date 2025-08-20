#!/usr/bin/env node

const { program } = require('commander');
const projectInit = require('../commands/project-init');

program
  .name('valindra')
  .version('1.0.0')
  .description('A mythic CLI for weaving narrative and code.');

program
  .command('project:init')
  .description('Initialize a new mythos seed project.')
  .action(projectInit);

program.parse(process.argv);

