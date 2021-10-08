const profileDataArgs = process.argv.slice(2);

// Regular Function
// const printProfileData = function(profileDataArr) {
//     console.log(profileDataArr);
// };

// Arrow Function
const printProfileData = profileDataArr => 
    // //this...
    // for (let i = 0; i < profileDataArr.length; i++) {
    //     console.log(profileDataArr[i]);
    // }
    // console.log('================');

    //is the same as this...
    profileDataArr.forEach(profileItem => console.log(profileItem));

printProfileData(profileDataArgs);