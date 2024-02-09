const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const htmlFile = require(".starter/index.html")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
        message: "What is the manager's email?",
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

async function createManager() {

}

function addTeamMembers() {

}

function createEngineer() {

}

function createIntern() {

}

function renderHTML() {}