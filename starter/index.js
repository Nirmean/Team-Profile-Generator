import { Manager } from "./lib/Manager.js";
import { Engineer } from "./lib/Engineer.js";
import { Intern } from "./lib/Intern.js";
import inquirer from "inquirer";
import path from "path";
import fs from "fs/promises";
import { render } from "./src/page-template.js";

const currentModuleUrl = new URL(import.meta.url);
const __dirname = path.dirname(currentModuleUrl.pathname);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

async function promptManager() {
    const managerQuestions = [
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?",
            validate: function(value) {
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                return valid || 'Please enter a valid email address.';
            },
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
        },
    ] 

    const answers = await inquirer.prompt(managerQuestions);
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    
}

async function promptEngineer() {
    const engineerQuestions = [
        {
        type: 'input',
        name: 'name',
        message: "Enter the engineer's name:",
        },
        {
        type: 'input',
        name: 'id',
        message: "Enter the engineer's employee ID:",
        },
        {
        type: 'input',
        name: 'email',
        message: "Enter the engineer's email address:",
        },
        {
        type: 'input',
        name: 'github',
        message: "Enter the engineer's GitHub username:",
        },
    ];

    const answers = await inquirer.prompt(engineerQuestions);
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
}

async function promptIntern() {
    const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter the intern's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter the intern's employee ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter the intern's email address:",
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter the intern's school:",
    },
    ];

    const answers = await inquirer.prompt(internQuestions);
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
}

async function init() {
    await promptManager();

    let userChoice;

    do {
        const menuQuestion = {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        };

        const menuAnswer = await inquirer.prompt(menuQuestion);
        userChoice = menuAnswer.choice;

        if (userChoice === 'Add an engineer') {
            await promptEngineer();
        } else if (userChoice === 'Add an intern') {
            await promptIntern();
        }
    } while (userChoice !== 'Finish building the team');

    const outputHtml = render(teamMembers);

    // Write HTML to the output file
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch (err) {
        console.error("Error creating output directory:", err);
        return;
    }

    // Write HTML to the output file
    try {
        await fs.writeFile(outputPath, outputHtml, "utf-8");
        console.log(`Team information has been written to ${outputPath}`);
    } catch (err) {
        console.error("Error writing to file:", err);
    }
}

// Run the application
init();