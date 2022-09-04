const helpModule = require('../File System Organizer/commands/help');
const organizeModule = require('../File System Organizer/commands/organize')
const treeModule = require('../File System Organizer/commands/tree')

let input = process.argv.slice(2);
let inputArr = input;
let command = inputArr[0];

switch (command) {
    case 'tree':
        treeModule.treeFnKey(inputArr[1])
        break;
    case 'organize':
        organizeModule.organizeFnKey(inputArr[1])
        break;
    case 'help':
        helpModule.helpFnKey()
        break;
    default:
        console.log('Default')
        break;
}