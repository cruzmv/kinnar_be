import express from 'express';
import { Login } from './login';
import { GeneralTools } from '../toolbox/generalTools';

const cors = require('cors')
const bodyParser = require('body-parser');

export class Controller {
    port: string;
    host: string;
    toolbox: GeneralTools;


    constructor(host,port){
        this.host = host;
        this.port = port;
        this.toolbox = new GeneralTools();
    }

    run(){
        const app = express();
        app.use(cors())

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(bodyParser.raw());

        app.post('/login', async (req, res) => {
            console.log(`Login request: ${JSON.stringify(req.body)}`);
            const login = new Login();
            const response = await login.login(req.body);
            res.statusCode = response['status'];
            res.send(JSON.stringify(response));
        })
          
        app.post('/signin', async (req, res) => {
            console.log(`signin request: ${JSON.stringify(req.body)}`);
            const login = new Login();
            const response = await login.signIn(req.body);
            res.statusCode = response['status'];
            res.send(JSON.stringify(response));
        })
          
        app.get('/signin', async (req, res) => {
            console.log(`signin confirmation request`);
            const login = new Login();
            const response = await login.confirmSignIn(req.query['id']);
            res.statusCode = response['status'];
            const htmlResponse = this.toolbox.getSignInConfirmationTemplate(response);
            res.send(htmlResponse);
        });

        app.get('/emailconfirmation', async (req, res) => {
            console.log(`email confirmation request`);
            /*
            const login = new Login();
            const response = await login.confirmSignIn(req.query['id']);
            res.statusCode = response['status'];
            const htmlResponse = this.toolbox.getSignInConfirmationTemplate(response);
            */
            res.send('OK');

        });








        app.get('/userList', (req, res) => {
            console.log(`user list request`);
            const login = new Login();
            const response = login.userList();
            res.statusCode = response['status'];
            res.send(JSON.stringify(response));
        });
        
        app.get('/user', (req, res) => {
            console.log(`user request: ${req.headers["userid"]}`);
            const login = new Login();
            const response = login.user(req.headers["userid"]);
            res.statusCode = response['status'];
            res.send(response);
        });
          
        app.listen(this.port, () => {
            return console.log(`Express is listening at http://${this.host}:${this.port}`);
        });
          
    }
}




/*
loginController = require('./login')

exports.run = function(req,res) {
    const getsAndPosts = [
        {
            method: 'GET',
            calls: [
                {path: '/login', component: loginController}
            ]
        },
        {
            method: 'POST',
            calls: [
                {path: '/login',component: loginController }
            ]
        },
    ];
    const methodCalls = getsAndPosts.filter(x => x.method == req.method);
    if (methodCalls.length <= 0) {
        res.statusCode = 404;
        res.end(`Method ${req.method} not found`);
        return;
    }   
    const componentPath = methodCalls[0].calls.filter(x => x.path == req.url);
    if (componentPath.length <=0 ) {
        res.statusCode = 404;
        res.end(`Path ${req.method} not found`);
        return;
    }
    const component = componentPath[0].component;
    const data = component.run();
    res.statusCode = 200;
    res.end(JSON.stringify(data));
    
};
*/