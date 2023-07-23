import { Controller } from './controllers/controller';

function main(args){
    let host = '127.0.0.1';
    let port = 3000;
    const hIndex = args.indexOf('-h');
    if (hIndex >0 ) {
        host = args[hIndex+1]
    }
    const pIndex = args.indexOf('-p');
    if (pIndex >0 ) {
        port = args[pIndex+1]
    }
    
    const controller = new Controller(host,port);
    controller.run();
}

main(process.argv);




/*
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/login', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
*/








/*
const http = require('node:http');
const url = require('url');
const controllerComponent = require('./controllers/controller');

function main(){
    const hostname = '127.0.0.1';
    const port = 3000;
    const server = http.createServer((req, res) => {
        controllerComponent.run(req,res);
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    }); 

}
main();
*/







/* 

    const hostname = '127.0.0.1';
    const port = 3000;
    const server = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'application/json');

        let body = [];

        req.on('data', (data)=>{
            console.log('data', data);
            body.push(data);
        });

        req.on('end', ()=>{
            const jBody = JSON.parse(Buffer.concat(body).toString());
            console.log('end', jBody);
            //res.end(jBody);
        })
        
        res.end('aaaa');

    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    }); 


*/









/*    
    const server = http.createServer((req, res) => {
        
        let result = {
            status: 404,
            message: 'Not found'
        };
        res.setHeader('Content-Type', 'text/plain');

        if (req.method === 'GET') {
            switch (req.url) {
                case '/login':
                    result = {
                        status: 200,
                        message: 'GET' + req.url + req.headers["user-id"]
                    }
                    break;
                default:
                    break;
            }
        } else if (req.method === 'POST') {
            switch (req.url) {
                case '/login':
                    result = {
                        status: 200,
                        message: 'POST' + req.url
                    }
                    break;
                default:
                    break;
            }
        }
        res.statusCode = result.status;
        res.end(JSON.stringify(result));
    });    
    */    
