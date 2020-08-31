const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const emitter = new EventEmitter();

emitter.on('log', (msg) => {
  fs.appendFile(path.join(__dirname, 'log.txt'), msg, (err) => {
    if (err) throw err;
  });
});

function log(msg) {
  emitter.emit('log', msg);
}

module.exports = log;
