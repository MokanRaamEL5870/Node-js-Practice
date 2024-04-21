const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'file', 'text.txt');
console.log(`Attempting to read file at path: ${filePath}`);

// ------------ Read file 
if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
    });
} else {
    console.error(`File not found at path: ${filePath}`);
}

// ------------ Write file  
if (!fs.existsSync(path.join(__dirname,'file','newtext.txt'))) {
    const s = 'Once you have verified all these points, you should have a better understanding of where the issue is occurring. If the problem persists, consider the possibility that there may be a typo in the file name or that the file path has been modified elsewhere in the code or file system.'
    fs.writeFile(path.join(__dirname,'file','newtext.txt'), s, (err) => {
        if (err) {
            throw err;
        }
        console.log(`WRITING Successfull`);
    });
} else {
    console.error(`File not found at path: ${filePath}`);
}

// ------------ Append file  
if (fs.existsSync(path.join(__dirname,'file','newtext.txt'))) {
    fs.appendFile(path.join(__dirname,'file','newtext.txt'), '\n\nDemotic, Katharevousa, Pontic, Cappadocian, Mariupolitan, Southern Italian, Yevanic, Tsakonian and Greco-Australian.', (err) => {
        if (err) {
            throw err;
        }
        console.log(`Appending Successfull`);
    });
} else {
    console.error(`File not found at path: ${filePath}`);
}

// ------------ rename file 
if (fs.existsSync(path.join(__dirname,'file','newtext.txt'))) {
    fs.rename(path.join(__dirname,'file','newtext.txt'), path.join(__dirname,'file','text1.txt'), (err) => {
        if (err) {
            throw err;
        }
        console.log(`Appending Successfull`);
    });
} else {
    console.error(`File not found at path: ${filePath}`);
}
// Global error handling
process.on('uncaughtException', err => {
    console.error(`Uncaught Exception: ${err}`);
    process.exit(1);
});