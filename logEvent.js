const {format} = require('date-fns')
const {v4: uuid} = require('uuid');

const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvent = async (message,fileName) =>{
    const datetime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
    const logItem = `${datetime}\t${uuid()}\t${message}\n\n`;
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs',fileName),logItem);
    }catch(err){
        console.error(err);
    }
}


module.exports = logEvent;