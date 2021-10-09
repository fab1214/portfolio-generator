const inquirer = require("inquirer");

//create function to prompt user with questions & record answers
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub username. (Required)",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself.",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

//add parameter to store the project data (all of user's input)
const promptProject = (portfolioData) => {
  //If there's no 'projects' array create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
==================
Add a New Project
==================
    `);
  //collect portfolioData.projects from user...
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "What is the name of your project? (Required)",
          validate: (projectNameInput) => {
            if (projectNameInput) {
              return true;
            } else {
              console.log("Please enter the project name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "description",
          message: "Enter the project description (Required)",
          validate: (descriptionInput) => {
            if (descriptionInput) {
              return true;
            } else {
              console.log("Please enter the project description!");
              return false;
            }
          },
        },
        {
          type: "checkbox",
          name: "languages",
          message: "Select all languages used to build this project",
          choices: ["HTML", "CSS", "ES6", "jQuery", "BootStrap", "Node"],
        },
        {
          type: "input",
          name: "link",
          message: "Enter the GitHub link to your project (Required)",
          validate: (linkInput) => {
            if (linkInput) {
              return true;
            } else {
              console.log("Please enter the GitHub link!");
              return false;
            }
          },
        },
        {
          type: "confirm",
          name: "featureProject",
          message: "Would you like to feature this project?",
          default: false,
        },
        {
          type: "confirm",
          name: "confirmAddProject",
          message: "Would you like to add another project?",
          default: false,
        },
      ])
      //push project data we just collected above into projects array we created (inside projectData objects)
      .then((projectData) => {
        portfolioData.projects.push(projectData);
        //if user confirms to add new project info, re-run the promptProject function with previous portfolioData object and collect info for new project
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
          //if not, show the info that was previously entered
        } else {
          return portfolioData;
        }
      })
  );
};

//run user prompt, then project prompt...
promptUser()
  .then(promptProject)
  //now show user data stored in objects for the user prompt and project prompt(s)
  .then((portfolioData) => {
    console.log(portfolioData);
  });
