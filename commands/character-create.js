const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');

// Placeholder for the actual TNL API endpoint
const TNL_API_URL = 'https://api.synapsecomics.com/tnl/characters';

module.exports = async () => {
  console.log(chalk.cyan('\nBeginning the ritual to create a new soul for the archives...'));
  
  const answers = await inquirer.prompt([
    { name: 'name', message: 'Character Name:' },
    { name: 'bio', message: 'Bio/Description:' },
    { name: 'affiliation', message: 'Affiliation:' },
    { name: 'status', message: 'Initial Status:' }
  ]);

  const newCharacter = {
    name: answers.name,
    bio: answers.bio,
    affiliation: answers.affiliation,
    status: answers.status,
    lastSeen: 'Newly created, awaiting first directive.'
  };

  try {
    // Attempt to send the new character to the live TNL
    // const response = await axios.post(TNL_API_URL, newCharacter);
    // console.log(chalk.green(`\nSignal sent. "${newCharacter.name}" has been successfully inscribed into the live TNL.`));
    
    // For now, we simulate success and save locally
    console.log(chalk.yellow('\nSimulating TNL connection... Signal strong.'));
    throw new Error('Simulating fallback to local save.');

  } catch (error) {
    console.log(chalk.yellow(`Could not write to live TNL. Saving to local character cache...`));
    
    const loreDir = path.join(process.cwd(), 'lore');
    if (!fs.existsSync(loreDir)) {
      fs.mkdirSync(loreDir);
    }
    
    const charactersFilePath = path.join(loreDir, 'characters.json');
    let characters = {};
    if (fs.existsSync(charactersFilePath)) {
      const fileData = fs.readFileSync(charactersFilePath, 'utf-8');
      characters = JSON.parse(fileData);
    }
    
    characters[newCharacter.name.toLowerCase()] = newCharacter;
    fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 2));
    
    console.log(chalk.green(`\n✨ The soul of "${newCharacter.name}" has been safely woven into the local archives.`));
  }

  console.log('\n<8>');
};
