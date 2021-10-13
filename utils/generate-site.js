const fs = require("fs");

const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      //if theres an error, reject the promise and send the error to the Promise's `.catch()` methoc
      if (err) {
        reject(err);
        //return out of the function here to makr sure the promise doesnt accidentally execute the resolve() function as well
        return;
      }
      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: "File created!"
      })
    })
  })
};


//create a copyFole function with no parameters
const copyFile = () => {
    //return new promise object
    return new Promise ((resolve, reject) => {
        fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
            //if theres an error, reject the error and return out of the function
            if(err) {
                reject(err);
                return;
            }
            //if successful, resolve it with the success message
            resolve({
                ok: true,
                message: "file copied!"
            })
        })
    })
};

module.exports = {writeFile, copyFile};