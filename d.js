// node Main.js tree "directoryPath"

// node Main.js organize "directoryPath"

// node Main.js help

let path = require('path');
let fs = require('fs')


let input = process.argv.slice(2);
let command = input[0];

switch (command) {
    case "tree":
        treefn(input[1]);
        break;
    case "organize":
        organizefn(input[1]);

        break;
    case "help":
        helpfn();
        break;
    default:
        console.log("input right command");
}

function treefn(dirPath) {
    console.log("tree", dirPath);
}

function organize(src, dest) {
    let child=fs.readdirSync(src);
    for (let index = 0; index < child.length; index++) {
       let add= path.join(src, child[index]);
       let isfile=fs.lstatSync(add).isFile();
       if (isfile) {
           console.log(child[index]);
           
       }


    }
    
}

function organizefn(dirPath) {
    let newf;
    // console.log("organize", dirPath);
    if (dirPath == undefined) {
        console.log("enter the path");
    } else {
        let does = fs.existsSync(dirPath);
        if (does) {
           newf = path.join(dirPath, "Oraganized_folder")
            if (fs.existsSync(newf) == false) {
                fs.mkdirSync(newf)
               
            }
        }
    }
    organize(dirPath, newf);
}




function helpfn() {
    console.log(' List: \n'
        + '\t 1. node Main.js tree "directoryPath"\n'
        + ' \t 2.node Main.js organize "directoryPath"\n'
        + '\t 3.help'



    );
}