import fs from "fs";
import { Context } from "koa";

export const sendJson = (jsonResponse: { data: Record<string, unknown>; status: number }) => (
  ctx: Context,
): void => {
  ctx.body = jsonResponse.data;
  ctx.status = jsonResponse.status;
};

export const sendSuccess = () => (ctx: Context): void => {
  ctx.body = {
    status: "success",
  };
  ctx.status = 200;
};

export const sendError = (status = 500) => (ctx: Context): void => {
  ctx.body = {
    status: "error",
  };
  ctx.status = status;
};

export const sendPdf = () => (ctx: Context): void => {
  ctx.body = fs.createReadStream(`${__dirname}/data/pdf-export.pdf`);
  ctx.status = 200;
  ctx.set("Content-disposition", 'attachment; filename="pdf-export.pdf";');
  ctx.set("Content-type", "application/pdf");
};

export const sendExcel = () => (ctx: Context): void => {
  ctx.body = fs.createReadStream(`${__dirname}/data/xls-export.xlsx`);
  ctx.status = 200;
  ctx.set("Content-disposition", "attachment; filename=bookings-list-mock.xlsx");
  ctx.set("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
