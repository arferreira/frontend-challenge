import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import jwt from "jsonwebtoken";
import { env } from "~/env";
import { emailApi } from "~/utils/emailApi";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const token = jwt.sign(
        { email: input.email },
        env.EMAIL_SECRET + input.email,
        { expiresIn: "1d" },
      );

      const hashedPassword = bcrypt.hashSync(input.password, 10);
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          verifyEmail: token,
          role: "USER",
        },
      });

      if (user) {
        const response = await emailApi.post("/email/send", {
          service_id: process.env.EMAIL_SERVICE_ID,
          template_id: process.env.EMAIL_TEMPLATE_ID,
          user_id: process.env.EMAIL_PUBLIC_KEY,
          template_params: {
            to_name: input.name,
            email_from: input.email,
            message: token,
            link: `${process.env.NEXTAUTH_URL}/auth/verifyEmail?email=${input.email}&token=${token}`,
          },
        });
        if (response.status === 200) return user;
      }

      return null;
    }),

  VerifyEmail: publicProcedure
    .input(z.object({ email: z.string(), token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const token = input.token;
      const isValid = await new Promise((resolve) => {
        jwt.verify(token, env.EMAIL_SECRET + input.email, (err) => {
          if (err) resolve(false);
          if (!err) resolve(true);
        });
      });
      if (isValid) {
        const user = await ctx.db.user.findUnique({
          where: { email: input.email },
        });
        if (user) {
          await ctx.db.user.update({
            where: { email: input.email },
            data: {
              emailVerified: new Date(),
            },
          });
        }
        return user;
      }

      return;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
