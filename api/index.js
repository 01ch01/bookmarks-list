const URL = require('url');
const data = require('./urls.json');
const fs = require('fs');
const http = require('http');
const path = require('path');

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'), // path
    JSON.stringify(data, null, 2), // data
    //callback error
    err => {
      if (err) throw err;
      cb(JSON.stringify({ message: 'ok' }));
    }
  );
}

http
  .createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    // all resources
    if (!name || !url) {
      return res.end(JSON.stringify(data)); // show all
    }

    if (del) {
      // TODO: add name comparison as well
      data.urls = data.urls.filter(item => String(item.url) != String(url));

      return writeFile(message => {
        res.end(message);
      });
    }

    return res.end('create');
  })
  .listen(3000, () => {
    console.log('API is running...');
  });