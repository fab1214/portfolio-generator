const inquirer = require("inquirer");
const fs = require('fs');
const generatePage = require('./src/page-template');
//mock data
const mockData = {
    name: 'Lernantino',
    github: 'lernantino',
    confirmAbout: true,
    about:
      'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
    projects: [
      {
        name: 'Run Buddy',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['HTML', 'CSS'],
        link: 'https://github.com/lernantino/run-buddy',
        confirmFeature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'HTML', 'CSS'],
        link: 'https://github.com/lernantino/taskinator',
        confirmFeature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskmaster Pro',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
        languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
        link: 'https://github.com/lernantino/taskmaster-pro',
        confirmFeature: false,
        confirmAddProject: true
      },
      {
        name: 'Robot Gladiators',
        description:
          'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
        languages: ['JavaScript'],
        link: 'https://github.com/lernantino/robot-gladiators',
        confirmFeature: false,
        confirmAddProject: false
      }
    ]
  };
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
          name: "confirmFeature",
          message: "Would you like to feature this project?",
          default: false
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
// promptUser()
//   .then(promptProject)
//   //now show user data stored in objects for the user prompt and project prompt(s)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

const pageHTML = generatePage(mockData);


    fs.writeFile('./index.html', pageHTML, err => {
        if(err) throw new Error(err);
    });
//   });

