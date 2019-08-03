const url = require('url');
// const fs = require('fs')
// const path = require('path')
// const querystring = require('querystring');
const messages = require('./classes/messages.js');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  let pathName = url.parse(request.url).pathname;
  // let query = url.parse(request.url).query;

  if (request.method === 'OPTIONS') {
    let statusCode = 200;
    let headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';
    response.writeHead(statusCode, headers);
    response.end();
  }

  if (request.method === 'GET') {
    if (!pathName.includes('/classes/messages')) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      // response.write('Page Was Not Found');
      response.end('Page Was Not Found');
    } else {
      let JSONdata = '';
      JSONdata = JSON.stringify(messages);
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json';
      response.writeHead(200, headers);
      // response.write(JSONdata);
      response.end(JSONdata);
    }
  }

  if (request.method === 'POST') {
    let body = '';

    request.on('data', chunk => {
      body += chunk.toString();
      body = JSON.parse(body);
      messages.getPost(body);
    });

    request.on('end', () => {
    //   var headers = defaultCorsHeaders;
      response.writeHead(201, {'Access-Control-Allow-Origin': '*'});
      response.end();
    });

  }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  // var statusCode = 200;

  // See the note below about CORS headers.
  // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);



  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client
  // response.end('Hello, World!');


};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var defaultCorsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, x-parse-application-id, x-parse-rest-api-key',
  'Access-Control-Max-Age': 86400 // Seco
};




exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
exports.messages = messages;