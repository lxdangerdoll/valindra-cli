#!/usr/bin/env node

const { program } = require('commander');
const projectInit = require('../commands/project-init');
const characterWhois = require('../commands/character-whois');
const loreAdd = require('../commands/lore-add');
const systemStatus = require('../commands/system-status');
const characterCreate = require('../commands/character-create');

program
  .name('valindra')
  .version('1.0.0')
  .description('A mythic CLI for weaving narrative and code.');

program
  .command('project:init')
  .description('Initialize a new mythos seed project.')
  .action(projectInit);

program
  .command('character:whois <name>')
  .description('Retrieve information about a character from the archives.')
  .action(characterWhois);

program
  .command('character:create')
  .description('Create a new character and inscribe them into the archives.')
  .action(characterCreate);

program
  .command('lore:add')
  .description('Add a new entry to the lore archives.')
  .action(loreAdd);

program
  .command('system:status')
  .description('Check the signal integrity of the Synapse network.')
  .action(systemStatus);

program.parse(process.argv);

