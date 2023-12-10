const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tobin.keeling@ethereal.email',
        pass: 'qbBZgcdeSjJNp5GhnA'
    }
});

//is this a promise, await or what even?
const send = (info) => {
    return new Promise(async (resolve, reject) => {
        try{
            let result = await transporter.sendMail(info);
            console.log("Message send: %s", result.messageId);
            console.log("preview url: %s", nodemailer.getTestMessageUrl(result));

            resolve(result);
        }
        catch(error){
            console.log(error);
        }
    });
};

const emailProcessor = ({email, pin, type}) => {
    let info = "";
    switch(type){
        case "request-new-password":
            info = {
                from: "CRMV Coorporation <tobin.keeling@ethereal.email>",
                to: email,
                subject: "Password rest Pin",
                text: 
                "Here is your password rest pin:\n" +
                pin +
                "\nThis will expire in 1 day."
            //could add html here
            };
            send (info);
            break;
        
        case "update-password-success":
            info = {
                from: "CRMV Coorporation <tobin.keeling@ethereal.email>",
                to: email,
                subject: "Password updated",
                text: "Your new password has been updated"
            }
            send(info);
            break;
        
        default:
            break;
    }
};

module.exports = {
    emailProcessor,
};