const inquirer = require('inquirer');
// //to use modules, use require first
// const fs = require('fs');
// //pull function from page-template and assign to a const variable
// const generatePage = require('./src/page-template.js');
// //create const variable to hold generatePage function with name, github parameters
// const pageHTML = generatePage(name, github);

// //write the file (fs.writeFile(file, data[options], error callback)
// fs.writeFile('./index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
//create function to prompt user with questions & record answers
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username.'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself.'
        }
    ]);
};

const promptProject = portfolioData => {
    //if no projects array property, create one
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
==================
Add a New Project
==================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter the project description (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'Select all languages used to build this project',
            choices: ['HTML','CSS','ES6','jQuery', 'BootStrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)'
        },
        {
            type: 'confirm',
            name: 'featureProject',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        },
    ])
    //push data collected from promptProject function into an array to store input...
    .then(projectData => {
        portfolioData.projects.push(projectData);
        //if user confirms to add new project info, re-run the promptProject function and collect info for new project
        if (projectData.confirmAddProject){
            return promptProject(portfolioData);
        //if not, show the info that was previously entered
        } else {
            return portfolioData;
        }
    });
};

//run user prompt, then project prompt...
promptUser()
.then(promptProject)
//now show user data stored in objects for the user prompt and project prompt(s)
.then(portfolioData => {
    console.log(portfolioData);
});