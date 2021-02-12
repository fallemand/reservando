import { Context, Next } from "koa";

const requestLogger = async (ctx: Context, next: Next): Promise<void> => {
  await next();
  console.info(
    `[BACKEND] url: ${ctx.request.path} status: ${
      ctx.status
    } timestamp: ${new Date().toISOString()}`,
  );
};

export default requestLogger;
