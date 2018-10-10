const router = require('express').Router();
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path');

const Email = require('../config/emailConf');

router.get('/send', (req, res) => {
    let message = {
        to: 'ivan@geekshubsacademy.com',
        subject: 'Email de prueba',
        html: 'Hola es una prueba',
        attachments: [
            {
                filename: 'express.pdf',
                path: `${__dirname}/express.pdf`,
                content: 'Hello World!'
            }
        ]
    };
    Email.transporter.sendMail(message, (error, info) => {
        if(error) 
            return res.status(500).send(error);
        else {
            Email.transporter.close();
            res.status(200).send('Respuesta "%s"' + info.response);
        }
    });
});

router.get('/send/hbs', (req, res) => {
    Email.transporter.use('compile', Hbs({
        viewEngine: 'hbs',
        extName: '.hbs',
        viewPath: Path.join(__dirname, '../views/email-templates')
    }));
    let message = {
        to: 'ivan@geekshubsacademy.com',
        subject: 'Email de prueba hbs',
        template: 'email',
        context: {
            titulo: 'Handlabars Emailer',
            texto: 'Enviamos una prueba por handlebars'
        },
        attachments:[
            {
                filename: 'text1.txt',
                content: 'Hello World!'
            }
        ]
    }

    Email.transporter.sendMail(message,(error,info) =>{
        if(error){
            return res.status(500).send(error);
        } else {
            console.log('FUNCIONA');
            Email.transporter.close();
            res.status(200).send('Respuesta "%s"' + info.response);
        }
    });
})

module.exports = router;