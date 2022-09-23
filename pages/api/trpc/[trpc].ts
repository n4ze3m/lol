import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { CourierClient } from "@trycourier/courier";
import { database } from "utils/database";
import { randomEmailSubject } from "utils/fun";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("findAllMessages", {
    input: z
      .object({
        userId: z.string().nullish(),
      })
      .nullish(),
    resolve: async ({ input }) => {
      if (!input?.userId) {
        return [];
      }
      const messages = await database.message.findMany({
        where: {
          user_id: input.userId,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return messages;
    },
  })
  .query("findUserProfile", {
    input: z
      .object({
        userId: z.string().nullish(),
      })
      .nullish(),
    resolve: async ({ input }) => {
      if (!input?.userId) {
        return null;
      }
      const user = await database.profile.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    },
  })
  .mutation("updateQuestion", {
    input: z.object({
      userId: z.string(),
      question: z.string(),
    }),
    resolve: async ({ input }) => {
      const user = await database.profile.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await database.profile.update({
        where: {
          id: input.userId,
        },
        data: {
          question: input.question,
        },
      });

      return {
        message: "ok",
      };
    },
  }).query("questionAnswer", {
    input: z.object({
      userId: z.string().nullish(),
      questionId: z.string().nullish(),
    }).nullish(),
    resolve: async ({ input }) => {
      if (!input?.userId || !input?.questionId) {
        return null;
      }

      const answer = await database.message.findFirst({
        where: {
          user_id: input.userId,
          id: input.questionId,
        },
      });

      if (!answer) {
        return null;
      }

      await database.message.update({
        where: {
          id: input.questionId,
        },
        data: {
          opened: true,
        }
      })

      return answer;
    }
  }).query("getProfileByUsername", {
    input: z
      .object({
        username: z.string().nullish(),
      })
      .nullish(),
    resolve: async ({ input }) => {
      if (!input?.username) {
        return null;
      }
      const user = await database.profile.findFirst({
        select: {
          id: true,
          username: true,
          question: true,
          pause: true,
        },
        where: {
          username: input.username,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    },
  }).mutation("answerQuestion", {
    input: z
      .object({
        userId: z.string().nullish(),
        question: z.string().nullish(),
        answer: z.string().nullish(),
      })
      .nullish(),
    resolve: async ({ input }) => {
      if (!input?.userId || !input?.question || !input?.answer) {
        return null;
      }

      const user = await database.profile.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const answer = await database.message.create({
        data: {
          message: input.answer,
          user_id: input.userId,
          question: input.question,
        },
      });
      // check if user enabled email notifications
      if (user.email_notify) {
        const courier = CourierClient({
          authorizationToken:
            process.env.COURIER_API_KEY
        });

        const url = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/me/a`
          : "http://localhost:3000/me/a";

        await courier.send({
          message: {
            to: {
              email: user.email,
            },
            template: process.env.COURIER_TEMPLATE_ID as string,
            data: {
              subject: randomEmailSubject(),
              username: user.username,
              url: `${url}/${answer.id}`,
              question: input.question,
            },
          },
        });
      }

      return {
        message: "ok",
      }
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
