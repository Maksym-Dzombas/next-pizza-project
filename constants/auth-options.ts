import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginValues } from "@/components/shared/auth-modal/forms/schemas";
import { prisma } from "@/prisma/prisma-client";
import bcrypt, { hashSync } from "bcryptjs";
import { UserRole } from "@prisma/client";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole
        }
      }
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as LoginValues;

        const user = await prisma.user.findFirst({
          where: {
            email: email
          }
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        if (!user.verified) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role
        };
      }
    })
  ],
  secret: process.env.NEXTJWT_SECRET!,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn(data) {
      try {
        // Проверка на наличие провайдера и email
        const conditions = [];
        if (data.account?.provider && data.account?.providerAccountId) {
          conditions.push({ provider: data.account.provider, providerId: data.account.providerAccountId });
        }
        if (data.user.email || data.profile?.email) {
          conditions.push({ email: data.user.email || data.profile?.email });
        }
        if (conditions.length === 0) {
          console.error("Ошибка при поиске пользователя: Не указан провайдер или email");
          return false;
        }

        // Если провайдер credentials, то пропускаем
        if (data.account?.provider === "credentials") {
          return true;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: conditions
          }
        });

        // Если пользователь не найден, то создаем его
        if (!findUser) {
          await prisma.user.create({
            data: {
              email: data.user.email || "",
              fullName: data.user.name || "User #" + data.user.id + Math.random(),
              password: hashSync(data.user.id.toString(), 10),
              verified: new Date(),
              provider: data.account!.provider,
              providerId: data.account!.providerAccountId,
            }
          });

          return true;
        } else { // Если пользователь найден, то обновляем провайдер
          await prisma.user.update({
            where: {
              id: findUser.id
            },
            data: {
              provider: data.account!.provider,
              providerId: data.account!.providerAccountId
            }
          });

          return true;
        }
      } catch (error) {
        console.error("Error [SIGN_IN]:", error);
        return false;
      }
    },
    async jwt({ token, account }) {
      let user;
      if (token.email) {
        user = await prisma.user.findFirst({
          where: {
            email: token.email
          }
        });
      }
      if (!token.email && account?.provider && account?.providerAccountId) {
        user = await prisma.user.findFirst({
          where: {
            provider: account.provider,
            providerId: account.providerAccountId
          }
        });
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.fullName;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role;
      }

      return session;
    }
  }
}