const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //1) Create a transporter
    console.log(options);
    const transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: 'smtp.mailtrap.io',
        port: 25,
        auth: {
            user: 'aa0cea7491a2ff',
            pass: 'a985d8784129eb'
        }
    });
    //2) Define the email options
    const mailOptions = {
        from: 'NgocHoa <nguyenngochoa3979@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
        //html:
    };
    //3) Actually send the email
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
