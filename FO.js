const fs = require('fs')
const path = require('path');
const { getEnabledCategories } = require('trace_events');

let input = process.argv.slice(2);
let inputArr = input;
let command = inputArr[0];

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};

switch (command) {
    case 'tree':
        console.log('Tree Implemented')
        break;
    case 'organize':
        organizeFn(inputArr[1])
        break;
    case 'help':
        helpFn()
        break;
    default:
        console.log('Default')
        break;
}

// It will list all the ways by which you can run the commands of this project...
function helpFn() {
    console.log(`List of all the commands ->
    1) Tree - node FO.js tree <dirPath>
    2) Organize - node FO.js organize <dirPath>
    3) Help - node FO.js help`)
}

//Organize function will organize all your target folders files in a different folders acc to their extensions
function organizeFn(dirPath) {
    let destPath
    if (dirPath == undefined) {
        console.log('Please enter a valid Directory Path')
        return
    } //Check wheather directory path is passed or not and if not simply return

    let doesexist = fs.existsSync(dirPath)

    // this doesexist will tell the target folder exists or not

    if (doesexist == true) {
        destPath = path.join(dirPath, 'organized_Files')

        //We created a path for organized_Files Folder

        //Check wheather in the given destpath des a folder exist with a same name if not make a folder

        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath)
        }

        else {
            console.log('Folder Already Exist')
        }
    }
    else {
        console.log('Please enter a valid Path')
    }
    
    organizeHelper(dirPath, destPath)
}

function organizeHelper(src, dest){
    let childNames = fs.readdirSync(src)
    // console.log(childNames)

    for(let i=0;i<childNames.length;i++){
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()

        if(isFile==true){
            let fileCategory = getCategory(childNames[i])
            // console.log(childNames[i] + ' belongs to ' + fileCategory)

            sendfiles(childAddress,dest,fileCategory)
        }
    }
}

function getCategory(Filename){
    let ext = path.extname(Filename).slice(1)
    //We Extracted extension name of the target files
    for(let key in types){
          let cTypeArr = types[key]
          // We took out all the Category types Array
          // console.log(cTypeArr)

    for(let i=0;i<cTypeArr.length;i++){
        if(ext == cTypeArr[i]){
                return key
            }
        }
    }
    return 'others'
}

function sendfiles(srcFilePath, dest, fileCategory){
    // We will create path for each category type encountered to create folder of their names
    let catPath = path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }

    let filename = path.basename(srcFilePath)
    
    // We took out the basename of all the files

    let destFilePath = path.join(catPath,filename)

    fs.copyFileSync(srcFilePath,destFilePath)

    fs.unlinkSync(srcFilePath)

    console.log('Files Organized')
}