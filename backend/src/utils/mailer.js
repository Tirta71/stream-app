import nodemailer from "nodemailer";
import env from "../config/env.js";

const hasSmtpConfig = Boolean(env.smtpHost && env.smtpUser && env.smtpPass);

const maskEmail = (email = "") => {
  const [name = "", domain = ""] = email.split("@");

  if (!domain) {
    return email ? "***" : "<empty>";
  }

  return `${name.slice(0, 2)}***@${domain}`;
};

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      auth: {
        pass: env.smtpPass,
        user: env.smtpUser,
      },
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
    })
  : nodemailer.createTransport({
      jsonTransport: true,
    });

const sendEmail = async ({ html, subject, text, to }) => {
  const info = await transporter.sendMail({
    from: env.mailFrom,
    html,
    subject,
    text,
    to,
  });

  if (!hasSmtpConfig) {
    console.info("Email dev transport:", info.message);
  } else {
    console.info("Email sent:", {
      accepted: info.accepted?.map(maskEmail) ?? [],
      messageId: info.messageId,
      rejected: info.rejected?.map(maskEmail) ?? [],
      subject,
    });
  }

  return info;
};

export default sendEmail;
