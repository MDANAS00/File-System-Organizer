const fs = require('fs')
const path = require('path')

let input = process.argv.slice(2)
let inputArr = input
let command = inputArr[0]

switch (command) {
    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organize':
        organizeFn(inputArr[1])
        break;
    case 'Help':
        helpFn()
        break;
    default:
        console.log('Please enter a valid command')
        break;
}

function helpFn() {
    console.log(`List of all the commands->
                            1) Tree - node FO.js tree <dir path>
                            2) Organize - node FO.js organize <dirPath>
                            3) Help - node FO.js help`)
}

function organizeFn(dirPath) {  //This function will organize all target folder files in different folder according to their extension.
    let destPath
    if(dirPath==undefined){    //This function checks whether the path is passed or not, If not then return.
        console.log('Please enter avalid Directory Path')
        return;
    }

    //DoesExist function checks whether the target folder exists or not...
    let doesExist = fs.existsSync(dirPath) 
    if(doesExist==true){  
    destPath = path.join(dirPath, 'organized_Files')
    
    //Created a path for organized_Files folder

    //Check whether in the given destPath, a folder exist or not with the same name.
    //If yes then we create a folder using mkdir
    
    if(fs.existsSync(destPath==false))
    {
        fs.mkdir(destPath)
    }
    else
    {
        console.log('Folder Already Exist')
    }
  }
}