import { EmailPayload } from "../../common/types/email-payload.type";
import { MailOptions } from "nodemailer/lib/json-transport";
import transporter from "../../config/mail.config";
import EmailReplacements from "../../common/interfaces/email-replacements.interface";
import path from "path";
import fs from "fs";

const loadTemplate = (templateName: string, replacements: EmailReplacements) => {
    const basePath = path.join(__dirname, "templates");

    // Load the base layout
    const baseTemplate = fs.readFileSync(path.join(basePath, "layout.html"), "utf-8");

    // Load the specific email content template
    const emailContent = fs.readFileSync(path.join(basePath, `${templateName}.html`), "utf-8");

    // Merge content into the base template
    let finalTemplate = baseTemplate.replace("{{content}}", emailContent);

    // Replace additional placeholders like {{resetLink}} and {{subject}}
    Object.keys(replacements).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        finalTemplate = finalTemplate.replace(regex, replacements[key]);
    });

    return finalTemplate;
};

const sendEmail = async (emailPayload: EmailPayload, replacements: EmailReplacements) => {
    let mailOptions: MailOptions = {
        from: process.env.GMAIL_USER,
        to: emailPayload.to.email,
        subject: emailPayload.subject,
    };

    const commonReplacements: EmailReplacements = {
        appName: process.env.APP_NAME!,
        appUrl: process.env.FRONTEND_URL!,
        title: emailPayload.subject,
        name: emailPayload.to.name || ''
    };

    mailOptions = emailPayload.htmlTemplate
        ? { ...mailOptions, html: loadTemplate(emailPayload.htmlTemplate, {...replacements, ...commonReplacements}) }
        : { ...mailOptions, text: emailPayload.text };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
