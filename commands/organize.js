const fs = require('fs')
const path = require('path');

let types = {
    Media: ["mp4", "mkv", "mp3"],
    Images: ["png", "jpg", "heic",],
    Archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    Documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex", "dll",],
    Applications: ["exe", "dmg", "pkg", "deb"],
};


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
        destPath = path.join(dirPath, 'Organized_Files')  //We created a path for organized_Files Folder

        if (fs.existsSync(destPath) == false) {  //Check wheather in the given destpath does a folder exist with a same name if not make a folder
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

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src) //Read all files and folders
    // console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]) // Address of files and folders
        let isFile = fs.lstatSync(childAddress).isFile() // Check fort files and folders

        if (isFile == true) {
            let fileCategory = getCategory(childNames[i]) // Get category of files
            // console.log(childNames[i] + ' belongs to ' + fileCategory)

            sendfiles(childAddress, dest, fileCategory)
        }
        // if(childAddress!=dest) {
        //     let isDirectory = fs.lstatSync(childAddress).isDirectory()
        //     if(isDirectory==true){
        //         console.log(childAddress)
        //         organizeFn(childAddress)
        //     }
        // }
    }
}

function getCategory(Filename) {
    let ext = path.extname(Filename).slice(1)
    //We Extracted extension name of the target files
    for (let key in types) {
        let cTypeArr = types[key]
        // We took out all the Category types Array
        // console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return key
            }
        }
    }
    return 'others'
}

function sendfiles(srcFilePath, dest, fileCategory) {
    // We will create path for each category type encountered to create folder of their names
    let catPath = path.join(dest, fileCategory)

    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath)
    }
    let filename = path.basename(srcFilePath)

    // We took out the basename of all the files

    let destFilePath = path.join(catPath, filename)

    fs.copyFileSync(srcFilePath, destFilePath)

    fs.unlinkSync(srcFilePath)

    console.log('Files Organized')
}

module.exports = {
    organizeFnKey: organizeFn
}