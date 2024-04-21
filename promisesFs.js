const path = require('path');
const fsPromises = require('fs').promises;

const fsOperation = async () => {
    try{
        // ------------ Read file 
        const data = await fsPromises.readFile(path.join(__dirname,'file','text.txt'),'utf8');
        console.log(data);

        // ------------ Write file 
        const sampledata = 'Once you have verified all these points, you should have a better understanding of where the issue is occurring.'
        await fsPromises.writeFile(path.join(__dirname,'file','newtext.txt'), sampledata);

        // ------------ Append file 
        await fsPromises.appendFile(path.join(__dirname,'file','appendedFile.txt'), sampledata);

        // ------------ rename file 
        await fsPromises.rename(path.join(__dirname,'file','appendedFile.txt'),path.join(__dirname,'file','rename.txt'));

        // ------------ delete file
        await fsPromises.unlink(path.join(__dirname,'file','text.txt'));
    }catch(err){
        process.on('uncaughtException', err => {
            console.error(`Uncaught Exception: ${err}`);
            process.exit(1)}
        );
    }
}

// to check pull request

fsOperation();
