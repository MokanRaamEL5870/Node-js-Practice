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

const logEvent = require('./logEvent'); // Fixed typo in the import
const EventEmitter = require('events');
class MyClass extends EventEmitter {}

const myEmitter = new MyClass();
myEmitter.on('log', (message, fileName) => logEvent(message, fileName)); // Fixed function name

const PORT = process.env.PORT || 3500;

const serverFile = async (filePath, ContentType, res) => {
    try {
        const rawData = await fsPromises.readFile(filePath, !ContentType.includes('image') ? 'utf8' : '');
        const data = ContentType === 'application/json' ? JSON.parse(rawData) : rawData;
        res.writeHead(filePath.includes('404.html') ? 404 : 200, { 'Content-Type': ContentType });
        res.end(ContentType === 'application/json' ? JSON.stringify(data) : data);
    } catch (err) {
        console.error(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        res.statusCode = 500;
        res.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const ext = path.extname(req.url);
    let ContentType;

    switch (ext) {
        case '.css':
            ContentType = 'text/css';
            break;
        case '.json':
            ContentType = 'application/json';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.jpg':
            ContentType = 'image/jpeg';
            break;
        case '.png':
            ContentType = 'image/png';
            break;
        case '.txt':
            ContentType = 'text/plain';
            break;
        default:
            ContentType = 'text/html';
    }

    let filePath = ContentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'index.html')
        : ContentType === 'text/html' ? path.join(__dirname, req.url)
            : path.join(__dirname, req.url);

    if (!ext && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        serverFile(filePath, ContentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': './newPage.html' });
                res.end();
                break;
            case 'home.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serverFile(path.join(__dirname, 'views', '404.html'), 'text/html', res); // Fixed path
        }
    }
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

server.listen(PORT, () => console.log(`Server running on port :- ${PORT}`));
