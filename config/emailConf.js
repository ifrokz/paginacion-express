const NodeMailer = require('nodemailer');
let transporter = NodeMailer.createTransport({
    service:'gmail',
    auth: {
        user: 'ghnodemailer@gmail.com',
        pass: 'nodemailer'
    },
    tls:{ rejectUnauthorized: false}
},{
    from: 'ghnodemailer@gmail.com',
    headers: {}
})

const Email = {transporter};
module.exports = Email;