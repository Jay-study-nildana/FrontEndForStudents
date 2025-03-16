import http from "http"

/**
 * Example of using ES6 syntectic sugar to create Node JS server
 */
class NodeServer {
  constructor(hostname = process.env.LOCAL_HOST, port = process.env.DEFAULT_PORT3) {
    this.serverName = 'Node Server';
    this.hostname = hostname;
    this.port = port;

    //Auto Start Server
    this.initServer()
  }

  initServer = () => {
    //Create Server
    this.server = http.createServer((req, res) => {
      if (req.method === 'GET') {
        if (req.url === '/batman') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(this.getBatman()));
        } else if (req.url === '/superman') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(this.getSuperman()));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found');
        }
      } else if (req.method === 'POST' && req.url === '/add') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { num1, num2 } = JSON.parse(body);
          const result = num1 + num2;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ result }));
        });
      } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method Not Allowed');
      }
    });

    //Start Listening
    this.server.listen(this.port, this.hostname, () => {
      console.log(`${this.serverName} Started at http://${this.hostname}:${this.port}/`);
    });
  }

  sayHello = () => {
    return ` Hello World from ${this.serverName} Running at http://${this.hostname}:${this.port}/`;
  }

  getBatman = () => {
    return {
      name: 'Batman',
      realName: 'Bruce Wayne',
      city: 'Gotham',
      powers: ['Intelligence', 'Martial Arts', 'Stealth']
    };
  }

  getSuperman = () => {
    return {
      name: 'Superman',
      realName: 'Clark Kent',
      city: 'Metropolis',
      powers: ['Super Strength', 'Flight', 'X-ray Vision', 'Heat Vision']
    };
  }
}

//EXPORT MODULE
module.exports = NodeServer