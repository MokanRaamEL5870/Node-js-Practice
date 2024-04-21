// const http = require('http')
// const fs = require('fs')
// const PORT = process.env.PORT || 3500;

// const server = http.createServer((req,res) => {
//     res.writeHead(200, {'Content-Type':'text/html'});
//     fs.readFile('index.html', (err,data) => {
//         if(err){
//             res.writeHead(200);
//             res.write('Page Not Found');
//         }
//         else{
//             res.write(data);
//         }
//         res.end();
//     })
// })

// server.listen(PORT, (err) => {
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log(`Server is running in port:- ${PORT}`);
//     }
// })


const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvent = require('./logEvent');
const EventEmitter = require('events');
class MyClass extends EventEmitter { };

const myEmitter = new MyClass();
myEmitter.on('log', (message, fileName) => logEvents(message, fileName));
const PORT = process.env.PORT || 3500;

