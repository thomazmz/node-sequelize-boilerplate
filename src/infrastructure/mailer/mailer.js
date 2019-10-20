const sgMail = require('@sendgrid/mail');
const config = require('./config');

sgMail.setApiKey(config[process.env.NODE_ENVIRONMENT]);

module.exports = {

    send : (email) => {
        sgMail.send({
            to: email.recipient,
            from: email.sender,
            subject: email.subject,
            text: email.text,
            html: emnail.html
        });
    }
}





var client = nodemailer.createTransport(sgTransport(options));

var email = {
  from: 'awesome@bar.com',
  to: 'mr.walrus@foo.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(error);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});


  

 