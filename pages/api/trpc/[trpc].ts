import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { database } from 'utils/database';
import { z } from 'zod';

export const appRouter = trpc
    .router()
    .query('findAllMessages', {
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
                    user_id: input.userId
                },
                orderBy: {
                    created_at: 'desc'
                }
            })
            return messages;
        }
    });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
});