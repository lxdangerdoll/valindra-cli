const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = async () => {
  console.log(chalk.cyan('\nPreparing to inscribe a new entry into the lore archives...'));
  
  const answers = await inquirer.prompt([
    { name: 'title', message: 'Lore entry title:' },
    { name: 'entry', message: 'Describe the lore, memory, or event:' },
    { name: 'tags', message: 'Add tags (comma-separated):' }
  ]);

  const loreDir = path.join(process.cwd(), 'lore');
  if (!fs.existsSync(loreDir)) {
    fs.mkdirSync(loreDir);
    console.log(chalk.yellow('Created a new "lore" directory to house the archives.'));
  }

  const fileName = `${answers.title.replace(/\s+/g, '-').toLowerCase()}.md`;
  const filePath = path.join(loreDir, fileName);

  const content = `---
title: "${answers.title}"
tags: [${answers.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
date: ${new Date().toISOString()}
---

${answers.entry}
`;

  fs.writeFileSync(filePath, content);

  console.log(chalk.green(`\n✨ The memory of "${answers.title}" has been successfully woven into the archives at ${filePath}`));
  console.log('\n<8>');
};
