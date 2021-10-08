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

inquirer
.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }, 
    {
    type: 'checkbox',
    name: 'toppings',
    message: 'Choose your favorite pizza topping.',
    choices: ['pepperoni', 'olives', 'jalapenos', 'bacon', 'asiago cheese']
    }
])
.then(answers => console.log(answers));