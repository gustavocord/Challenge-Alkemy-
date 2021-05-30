 const sgMail  =require('@sendgrid/mail')
 require('dotenv').config()



 const sgMailing = sgMail.setApiKey(process.env.API_KEY);

 module.exports= sgMail