import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { database } from "utils/database";
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
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
