const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname,'file','bigfile.txt'), {encoding: 'utf8'});

const ws = fs.createWriteStream(path.join(__dirname,'file','text.txt'));

// rs.on('data', (datapackets) => {
//     ws.write(datapackets);
// })

rs.pipe(ws);