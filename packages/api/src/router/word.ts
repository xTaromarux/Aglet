import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const wordRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.words.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.words.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        personId: z.string(),
        word: z.string(),
        wordFromCountry: z.string(),
        translation: z.string(),
        translationFromCountry: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.words.create({ data: input });
    }),
});
