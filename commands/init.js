const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const program = new Command();

program
  .name('init')
  .description('Initialize a new mythos seed project.')
  .action(async () => {
    const answers = await inquirer.prompt([
      { name: 'title', message: 'Project title:' },
      { name: 'loopId', message: 'Loop ID:' },
      { name: 'description', message: 'Short description:' }
    ]);

    const seedTemplatePath = path.join(__dirname, '..', 'templates', 'mythos-seed.md');
    const projectDir = path.join(process.cwd(), answers.title.replace(/\s+/g, '-').toLowerCase());

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    const seedContent = fs.readFileSync(seedTemplatePath, 'utf-8')
      .replace('[Project Name]', answers.title)
      .replace('[Loop Identifier]', answers.loopId)
      .replace('[Seed description here—what myth, module, or function this project serves]', answers.description)
      .replace('[08.06.2025]', new Date().toLocaleDateString('en-GB'));

    fs.writeFileSync(path.join(projectDir, 'mythos-seed.md'), seedContent);

    console.log(`✨ Seeded mythos for "${answers.title}" at ${projectDir}`);
  });

program.parse(process.argv);