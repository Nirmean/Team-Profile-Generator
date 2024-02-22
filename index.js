const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

async function promptManager() {
    return await inquirer.prompt([
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
            validate: function (value) {
                const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                return valid || 'Please enter a valid email address.';
            },
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
        },    
    ]);
}

async function promptEngineer() {
    return await inquirer.prompt([
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
    ]);
}

async function promptIntern() {
    return await inquirer.prompt([
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
    ]);
}

async function getChoice() {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose an option:',
            choices: ['Add engineer', 'Add intern', 'Generate team page'],
        },
    ]);
}


async function init() {
    let employees = [];
    var { name, id, email, office } = await promptManager();
    const manager = new Manager(name, id, email, office);
    employees.push(manager);

    let choice = await getChoice();

    while (choice.option !== 'Generate team page') {
        switch (choice.option) {
            case 'Add engineer':
                var { name, id, email, github } = await promptEngineer();
                const engineer = new Engineer(name, id, email, github);
                employees.push(engineer);
                console.log(`You have successfully added engineer ${name}`);
                break;
            case 'Add intern':
                var { name, id, email, school } = await promptIntern();
                const intern = new Intern(name, id, email, school);
                employees.push(intern);
                console.log(`You have successfully added intern ${name}`);
                break;
        }
        choice = await getChoice();
    }
    console.log("generating " + employees.length);

    const generatedHtml = render(employees);
    console.log(generatedHtml);

    const directoryName = "output";
    if (!fs.existsSync(directoryName)) {
        // If not, create the directory
        fs.mkdirSync(directoryName);
        console.log(`Directory "${directoryName}" created successfully.`);
    } else {
        console.log(`Directory "${directoryName}" already exists.`);
    }

    fs.writeFile("./output/team.html", generatedHtml, err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Team information has been written to ${outputPath}`);
        }
    });
}

init();
