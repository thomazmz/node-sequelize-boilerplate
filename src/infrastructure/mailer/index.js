const sgMail = require('@sendgrid/mail');
const config = require('./config');

// sgMail.setApiKey(config[process.env.NODE_ENVIRONMENT]);

sgMail.setApiKey("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");

module.exports = {

    send : (message) => {
        sgMail.send({
            to: 'thomaz.zandonotto@gmail.com',
            from: 'mailer@zandonotto.com',
            subject: 'Sign Up Validation',
            text: message,
            html: message
        });
    }
}





// var client = nodemailer.createTransport(sgTransport(options));

// var email = {
//   from: 'awesome@bar.com',
//   to: 'mr.walrus@foo.com',
//   subject: 'Hello',
//   text: 'Hello world',
//   html: '<b>Hello world</b>'
// };

// client.sendMail(email, function(err, info){
//     if (err ){
//       console.log(error);
//     }
//     else {
//       console.log('Message sent: ' + info.response);
//     }
// });


  

 