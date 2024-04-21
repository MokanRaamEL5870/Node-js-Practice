const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvent = require('./logEvent')

const EventEmitter = require('events')

class MyClass extends EventEmitter{}

const myEmitter = new MyClass();

myEmitter.on('log', (message) => {
    logEvent(message,'eventFile.txt')
});

myEmitter.emit('log', 'log event emitter begins');

