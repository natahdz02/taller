const nodemailer = require("nodemailer");

class ServicioCorreo {
  constructor() {}

  async enviarCorreo(plantilla, destinatarios) {
    let transporter = nodemailer.createTransport({
            user: "dllo_web_udem",
            host: "saurmo.com",
            database: "el-taller",
            password: "bf5e722cc518fce3c4a57fdb1b6647b0434138370eb1c30f9293ec8e03062b78",
            port: 5432,
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "no-reply@saurmo.com", // sender address
      to: destinatarios, // list of receivers
      subject: "Bienvenido a node dllo web ✔", // Subject line
      text: "Hello world?", // plain text body
      html: plantilla, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return "Correo enviado";
  }
}

module.exports = ServicioCorreo;