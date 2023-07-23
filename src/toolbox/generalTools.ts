import * as fs from 'fs';

export class GeneralTools {
    hostAddress: string = 'http://localhost:3000';
    constructor(){}

    getSignInConfirmationTemplate(data: any){
        const htmlString = fs.readFileSync(`${process.cwd()}/assets/templates/signinConfirmation.html`, 'utf-8');
        const htmlStringFormated = htmlString.replace('{{MESSAGE}}',data['message']);
        return htmlStringFormated;
    }

    getSignInEmailTemplate(url: string){
        const htmlString = fs.readFileSync(`${process.cwd()}/assets/templates/signin.html`, 'utf-8');
        const htmlStringFormated = htmlString.replace('{{LINK_URL}}',url).replace('{{LINK_URL}}',url);
        return htmlStringFormated;
    }


}