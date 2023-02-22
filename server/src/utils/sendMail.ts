import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const sendMail = async (to: string, html: string) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_RF_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      // @ts-ignore
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_SENDER_ADDRESS as string,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        refreshToken: process.env.MAIL_RF_TOKEN as string,
        accessToken,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_SENDER_ADDRESS,
      to,
      subject: "Instagram-Clone by an678-mhg",
      html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};

export default sendMail;
