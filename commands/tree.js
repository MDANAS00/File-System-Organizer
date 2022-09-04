const fs = require('fs')
const path = require('path');


function treefn(dirPath) {
    if (dirPath == undefined) {
        console.log("Please enter a valid Path")
        return
    }
    else {
        let doesexist = fs.existsSync(dirPath)
        if (doesexist == true) {
            treeHelper(dirPath, ' ')
        }
    }
}

function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile()

    if (isFile == true) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├── " + fileName)
    }
    else {
        let dirName = path.basename(targetPath)
        console.log(indent + '└── ' + dirName)

        let children = fs.readdirSync(targetPath)

        for (let i = 0; i < children.length; i++) {
            let childpath = path.join(targetPath, children[i])
            treeHelper(childpath, indent + '\t')
        }
    }
}

module.exports = {
    treeFnKey: treefn
}