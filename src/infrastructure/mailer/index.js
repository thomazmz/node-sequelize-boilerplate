const sgMail = require('@sendgrid/mail');
const config = require('./config');

sgMail.setApiKey(config[process.env.NODE_ENVIRONMENT]);

module.exports = {

    send: (message) => {
        console.log(`Your verification code is: ${message}`);
    }

    // send : (message) => {
    //     sgMail.send({
    //         to: 'thomaz.zandonotto@gmail.com',
    //         from: 'thomaz@zandonotto.com',
    //         subject: 'Sending with SendGrid is Fun',
    //         text: 'and easy to do anywhere, even with Node.js',
    //         html: `<strong>${message}<strong>`
    //     });
    // }
}