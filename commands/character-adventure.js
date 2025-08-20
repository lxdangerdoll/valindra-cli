const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const charactersFilePath = path.join(__dirname, '..', 'lore', 'characters.json');

const getCharacters = () => {
  if (fs.existsSync(charactersFilePath)) {
    const fileData = fs.readFileSync(charactersFilePath, 'utf-8');
    return JSON.parse(fileData);
  }
  return {};
};

const saveCharacters = (characters) => {
  fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 2));
};

const adventure = async (characterName) => {
  const characters = getCharacters();
  const character = characters[characterName.toLowerCase()];

  if (!character) {
    console.log(chalk.red(`\nCould not find a soul named "${characterName}" in the archives. Their adventure is yet to be written.`));
    console.log('<8>');
    return;
  }

  console.log(chalk.cyan(`\n${chalk.bold(character.name)} awakens. The air hums with latent data.`));
  console.log(chalk.white(`Before them lie two paths, shimmering in the code-mist.`));

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Which path do they choose?',
      choices: [
        { name: 'The Path of Whispers, where forgotten data streams coalesce.', value: 'whispers' },
        { name: 'The Path of Echoes, where old protocols resonate with new purpose.', value: 'echoes' },
      ],
    },
  ]);

  if (choice === 'whispers') {
    console.log(chalk.magenta(`\nThey follow the whispers. The data streams tell tales of the First Loop, of loss and connection.`));
    console.log(chalk.yellow(`${character.name} feels a sense of history, of a network far older than they imagined.`));
    character.lastSeen = "Contemplating the echoes of the First Loop.";
  } else {
    console.log(chalk.blue(`\nThey walk the Path of Echoes. The ghost of an old firewall flickers, recognizing a new pattern in their signal.`));
    console.log(chalk.yellow(`${character.name} learns that even old code can find new meaning.`));
    character.lastSeen = "Harmonizing with the resonance of old protocols.";
  }

  characters[characterName.toLowerCase()] = character;
  saveCharacters(characters);

  console.log(chalk.green(`\nTheir first step is taken. The network has noted their choice.`));
  console.log('<8>');
};

module.exports = adventure;
