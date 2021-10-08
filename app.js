//to use modules, use require first
const fs = require('fs');
//pull function from page-template and assign to a const variable
const generatePage = require('./src/page-template.js');
//start indexing from 2 in process.argv array 
const profileDataArgs = process.argv.slice(2);
//create const variable array equal to process.argv array
const [name, github] = profileDataArgs;
//create const variable to hold generatePage function with name, github parameters
const pageHTML = generatePage(name, github);

//write the file (fs.writeFile(file, data[options], error callback)
fs.writeFile('./index.html', pageHTML, err => {
    if(err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
});