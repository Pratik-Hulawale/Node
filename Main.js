// node Main.js tree "directoryPath"

// node Main.js organize "directoryPath"

// node Main.js help

let path = require('path');
let fs = require('fs')


let input = process.argv.slice(2);
let command = input[0];

let types={
    media: ["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","iso","ar","xz"],
    documents:["docx","doc","pdf","PDF","epub","xlsx","xls","txt","crdownload","md","ePub"],
    app:["exe","apk","xapk","pkg"],
    images:["jpeg","jpg","png","ico","PNG","giff"]
}

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

function sendfile(srcfile, dest, cat) {
    let catpath= path.join(dest,cat);
    if (fs.existsSync(catpath)==false) {
        fs.mkdirSync(catpath);
        
    }
    console.log(catpath);
    let filenm=path.basename(srcfile);
    let destf=path.join(catpath,filenm);
    fs.copyFileSync(srcfile,destf);
    
}

function organize(src, dest) {
    let add;
    let getc
    let child=fs.readdirSync(src);
    for (let index = 0; index < child.length; index++) {
       add= path.join(src, child[index]);
       let isfile=fs.lstatSync(add).isFile();
       if (isfile) {
           getc=getcategory(child[index])
           sendfile(add, dest, getc);
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

function getcategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let ctype=types[type];
        for (let i = 0; i < ctype.length; i++) {

            if (ext==ctype[i]) {
                return type
            }
        }
    }
    return "others";
    
}


function helpfn() {
    console.log(' List: \n'
        + '\t 1.node Main.js tree "directoryPath"\n'
        + ' \t 2.node Main.js organize "directoryPath"\n'
        + '\t 3.help'



    );
}