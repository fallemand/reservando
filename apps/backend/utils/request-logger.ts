import { Context, Next } from "koa";

const requestLogger = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
    console.info(
      `url: ${ctx.request.path} status: ${ctx.status} timestamp: ${new Date().toISOString()}`,
    );
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};

export default requestLogger;
