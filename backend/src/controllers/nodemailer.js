require('dotenv').config();

const nodemailer = require('nodemailer');
const oauth2Client = require('./oauth');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const MY_EMAIL = process.env.MY_EMAIL;

const sendEmail = async (to, storeName, userPassword) => {
   try {
      const ACCESS_TOKEN = await oauth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            type: 'OAuth2',
            user: MY_EMAIL,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: ACCESS_TOKEN.token, // Adicionar .token para pegar o valor correto
         },
         tls: {
            rejectUnauthorized: false, // Para evitar problemas de certificação SSL
         },
      });

      const mailOptions = {
         from: MY_EMAIL,
         to,
         subject: `Dados de Autenticação da tua conta crida pela loja ${storeName}`,
         html: `
            <p>Não compartilhe os teus dados de acesso com outras pessoas.</p>
            <p>Teu Email de acesso: <strong>${to}</strong></p>
            <p>Tua senha de acesso: <strong>${userPassword}</strong></p>
            <p>Recomendamos que alteres a tua senha, obrigado!</p>
         `,
      };

      const info = await transport.sendMail(mailOptions);
      return info;
   } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
   }
};

module.exports = sendEmail;
