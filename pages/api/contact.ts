// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require('nodemailer');

type Data = {
  success: boolean
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true, //ssl
  auth: {
      user: process.env.MAIL,
      pass: process.env.MAILPW
  }
});
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let mailOptions = {
    from: '"Contact - robertseghedi.dev" <office@seghedi.com>', // sender address (who sends)
    to: 'contact@robertseghedi.dev', // list of receivers (who receives)
    subject: `Contact Form Submission`, // Subject line
    html: `<b>Name: </b>${req.body.name}<br><b>email: </b>${req.body.email}<br><b>IP: </b>${req.headers['x-real-ip']} <br><b>Message: </b><p>${req.body.message}</p>` // html body
};
  console.log(req.body)
  console.log()
  transporter.sendMail(mailOptions, function(error : any, info : any){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({success: true})
    }
  });
  
}
