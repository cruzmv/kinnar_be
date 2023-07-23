import { GeneralTools } from '../toolbox/generalTools';
const nodemailer = require('nodemailer');

export class SendEmail {
    toolbox: GeneralTools;  
    emailAddress: string = '';
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kinnarsppt@gmail.com',
          pass: 'xdauybqtqnbxggex'
        }
      });    

    constructor(emailAddress: string){
        this.emailAddress = emailAddress;
        this.toolbox = new GeneralTools();
    }

    sendSignInConfirmation(dbResponse: any){
        const confirmUrl = `${this.toolbox.hostAddress}/signin?id=${dbResponse['id']}`
        const htmlString = this.toolbox.getSignInEmailTemplate(confirmUrl);
        const mailOptions = {
            from: 'kinnarsppt@gmail.com',
            to: 'cruz.mv@gmail.com',  //for tests purpouse   //this.emailAddress,
            subject: 'Sending Email using Node.js',
            html: htmlString
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
    }
}