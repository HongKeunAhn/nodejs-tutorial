const http = require('http');

const options = {
  host: 'localhost',
  port: '8081',
  path: '/index.html',
};

const callback = (response) => {
  let body = '';

  response.on('data', (data) => {
    body += data;
  });

  response.on('end', () => {
    console.log(body);
  });
};

const request = http.request(options, callback);
request.end();
