import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./sendEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
  await sendEmail({
    to: user.email,
    subject: "Vérifie ton adresse email — DevLinks",
    html: `
      <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        
        <div style="background: #0f172a; padding: 32px; text-align: center;">
          <p style="color: white; font-size: 20px; font-weight: 600; margin: 0;">DevLinks</p>
        </div>

        <div style="padding: 32px 40px;">
          <p style="font-size: 22px; font-weight: 600; color: #0f172a; margin: 0 0 12px;">Vérifie ton adresse email</p>
          <p style="font-size: 15px; color: #64748b; line-height: 1.7; margin: 0 0 32px;">
            Merci de t'être inscrit ! Clique sur le bouton ci-dessous pour confirmer ton adresse email et activer ton compte.
          </p>

          <div style="text-align: center; margin: 0 0 32px;">
            <a href="${url}" style="display: inline-block; background: #0f172a; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 500;">
              Vérifier mon email →
            </a>
          </div>

          <p style="font-size: 13px; color: #94a3b8; margin: 0 0 8px;">Si tu n'as pas créé de compte, ignore cet email.</p>
          <p style="font-size: 13px; color: #94a3b8; margin: 0;">Ce lien expire dans <strong>1 heure</strong>.</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding: 20px 40px; background: #f8fafc;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">
            Si le bouton ne fonctionne pas, copie ce lien :<br>
            <a href="${url}" style="color: #3b82f6; word-break: break-all;">${url}</a>
          </p>
        </div>

      </div>
    `,
  });
},
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          if (!userData.username) {
            const base = userData.email.split("@")[0]
            const suffix = Math.floor(Math.random() * 9999) 
            userData.username = `${base}_${suffix}`      
          }
          return { data: userData }
        },
      },
    },
  },
  plugins: [nextCookies()],
});
