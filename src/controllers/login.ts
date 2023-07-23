import { Postgres } from '../helpers/postgres';
import { SendEmail } from '../helpers/sendemail';
import { GeneralTools } from '../toolbox/generalTools';

export class Login {
    toolBox: GeneralTools
    constructor(){
        this.toolBox = new GeneralTools();
    }


    async login(data){
        const response = {
            status: 203,
            message: 'Fail, please check you user name and password',
            apiToken: null
        };

        const pg = new Postgres();
        const userData = await pg.UserByEmail(data['user']);
        if (userData['data']['rowCount'] <= 0 ){
            // nao encontrou usuario
            response.message = 'Access denied, please confirm you email and password.';
        } else {
            const uData = userData['data']['rows'][0].to_json;
            if (uData.confirmed == null){
                // Conta pendente de confirmacao
                const linkUrl = `${this.toolBox.hostAddress}/emailconfirmation?id=${uData.userid}`
                response.message = `This account is pending email confirmation, please check you email or click <a href="${linkUrl}">here</a> to resend a new confirmation email.`;
            } else if (uData.password !== data.password){
                // senha errada
                response.message = 'Access denied, please confirm you email and password.';
            } else {
                // login success
                response.status = 200;
                response.message = 'Success';
                response.apiToken = uData.userid;
            }
        }
        return response;
    }

    async signIn(data){
        const response = {
            status: 401,
            message: 'Fail, please check you user name and password',
            id: undefined
        };

        const pg = new Postgres();
        const dbResponse = await pg.addUser(data);
        if (dbResponse['status'] == 'OK') {
            const sendEmail = new SendEmail(data.user);
            sendEmail.sendSignInConfirmation(dbResponse);
            response.status = 200;
            response.message = dbResponse['message'];
            response.id = dbResponse['id'];
        } else {
            response.status = 208;
            response.message = dbResponse['message'];
        }
        return response;
    }

    async confirmSignIn(id) {
        const response = {
            status: 401,
            message: 'Fail, could not found the user, please try again.',
            confirmed: undefined
        };

        const pg = new Postgres();
        const dbResponse = await pg.confirmUser(id);
        if (dbResponse['status'] == 'OK') {
            response.status = 200;
            response.message = dbResponse['message'];
            response.confirmed = Date.now();
        } else {
            response.message = dbResponse['message'];
        }        
        return response;
    }

    sendEmailConfirmation(){
        //...
    }

    user(id){
        const response = {
            status: 200,
            message: 'user detail',
            data: {
                id: id,
                name: 'fulano de tal',    
            }
        };

        return response;
    }

    userList(){
        const response = {
            status: 200,
            message: 'users list',
            data: [
                {id: 123, name: 'teste'},
                {id: 124, name: 'teste2'}
            ]
        };

        return response;
    }
}






// exports.login = function(req) {

//     return {test: 'test'}
// };

// exports.user = (req) => {
//     return {
//         user: 123,
//         name: 'abc'
//     };
// }