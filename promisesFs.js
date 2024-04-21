const path = require('path');
const fsPromises = require('fs').promises;

const fsOperation = async () => {
    try{
        // Read File
        const data = await fsPromises.readFile(path.join(__dirname,'file','text.txt'),'utf8');
        console.log(data);

        // Write File
        const sampledata = 'Once you have verified all these points, you should have a better understanding of where the issue is occurring.'
        await fsPromises.writeFile(path.join(__dirname,'file','newtext.txt'), sampledata);
        await fsPromises.appendFile(path.join(__dirname,'file','appendedFile.text'), sampledata);
    }catch(err){
        process.on('uncaughtException', err => {
            console.error(`Uncaught Exception: ${err}`);
            process.exit(1)}
        );
    }
}

// to check pull request

fsOperation();
