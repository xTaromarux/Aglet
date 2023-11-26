import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const countriesRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.countries.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.countries.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        imageSrc: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.countries.create({ data: input });
    }),
});
