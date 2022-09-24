const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/addUser': jsonHandler.addUser,
  '/getUsers': jsonHandler.getUsers,
  notFound: jsonHandler.notFound,
};

// const parseBody = (request, response, handler) => {
//   const body = [];

//   request.on('error', (err) => {
//     console.dir(err);
//     response.statusCode = 400;
//     response.end();
//   });

//   request.on('data', (chunk) => {
//     body.push(chunk);
//   });

//   request.on('end', () => {
//     const bodyString = Buffer.concat(body).toString();
//     const bodyParams = query.parse(bodyString);
//     handler(request, response, bodyParams);
//   });
// };

// const handlePost = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/addUser') {
//     parseBody(request, response, jsonHandler.addUser);
//   }
// };

// const handleGet = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/style.css') {
//     htmlHandler.getCSS(request, response);
//   } else if (parsedUrl.pathname === '/getUsers') {
//     jsonHandler.getUsers(request, response);
//   } else if (parsedUrl.pathname === '/') {
//     htmlHandler.getIndex(request, response);
//   } else {
//     htmlHandler.notFound(request, response);
//   }
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const handlerFunction = urlStruct[parsedUrl.pathname];

  const { query } = parsedUrl;
  if (handlerFunction) {
    handlerFunction(request, response, query);
  } else {
    urlStruct.notFound(request, response, query);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
