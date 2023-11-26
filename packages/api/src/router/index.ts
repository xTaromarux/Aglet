import { router } from "../trpc";
import { wordRouter } from "./word";
import { countriesRouter } from "./countries";
import { authRouter } from "./auth";

export const appRouter = router({
  word: wordRouter,
  countries: countriesRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
