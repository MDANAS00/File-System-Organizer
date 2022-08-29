const fs = require('fs')
const path = require('path')


let input = process.argv.slice(2)
let inputArr = input
let command = inputArr[0]

switch(command)
{
    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organize':
        organizeFn(inputArr[1])
        break;
    case 'help' :
        helpFn()
        break; 
    default:
        console.log('Default')
        break;
}

// It will list all the ways by which you can run the commands of this project...
function helpFn(){
    console.log(`List of all the commands ->
    1) Tree - node FO.js tree <dirPath>
    2) Organize - node FO.js organize <dirPath>
    3) Help - node FO.js help`)
}

function organizeFn(dirPath){
    let destPath
    if(dirPath==undefined){
        console.log('Please enter a valid Directory Path')
        return
    }

    let doesexist = fs.existsSync(dirPath)

    if(doesexist==true){
        destPath = path.join(dirPath, 'organized_Files')

        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath)
        }

        else{
            console.log('Folder Already Exist')
        }
    }
}