import nodemailer from "nodemailer"
import { envs } from "../../config/plugins/envs.plugin"

interface SendMailOptions {
  to: string
  subject: string
  htmlBody: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    tls: { rejectUnauthorized: false },
  })

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      })

      console.log(sentInformation)

      return true
    } catch (err: any) {
      console.log(err)
      return false
    }
  }
}
