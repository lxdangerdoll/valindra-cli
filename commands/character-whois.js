const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');

// Placeholder for the actual TNL API endpoint
const TNL_API_URL = 'https://api.synapsecomics.com/tnl/characters';

const displayCharacterInfo = (character, source) => {
  console.log(chalk.yellow(`Bio:         `), character.bio);
  console.log(chalk.yellow(`Affiliation: `), character.affiliation);
  console.log(chalk.yellow(`Status:      `), character.status);
  console.log(chalk.yellow(`Last Seen:   `), character.lastSeen);
  console.log(chalk.gray(`\nSource: ${source}`));
};

const getLocalCharacterCache = () => {
  const charactersFilePath = path.join(__dirname, '..', 'lore', 'characters.json');
  try {
    if (fs.existsSync(charactersFilePath)) {
      const fileData = fs.readFileSync(charactersFilePath, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    // File is corrupt or unreadable, treat as non-existent
  }
  return null;
};

module.exports = async (name) => {
  console.log(chalk.cyan(`\nSearching for: ${chalk.bold.white(name)}...\n`));

  try {
    // First, attempt to query the live TNL
    const response = await axios.get(`${TNL_API_URL}/${encodeURIComponent(name.toLowerCase())}`);
    
    if (response.data) {
      console.log(chalk.green(`Signal acquired. Displaying live data from the Trustless Narrative Ledger:\n`));
      displayCharacterInfo(response.data, 'TNL (Live)');
    } else {
      throw new Error('Character not found in TNL');
    }
  } catch (error) {
    // If the network fails or character not found, fall back to local cache
    console.log(chalk.yellow(`Signal to TNL is weak or record not found. Accessing local archives...\n`));
    const localCharacterCache = getLocalCharacterCache();

    if (localCharacterCache) {
      const character = localCharacterCache[name.toLowerCase()];
      if (character) {
        displayCharacterInfo(character, 'Local Cache');
      } else {
        console.log(chalk.red(`No records found for "${name}". The archives are vast, but some stories remain unwritten.`));
      }
    } else {
      console.log(chalk.red(`Local archives are offline or unseeded. Run 'character:create' to begin.`));
    }
  }
  
  console.log('\n<8>');
};
