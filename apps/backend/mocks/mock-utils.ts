// @ts-nocheck
import fs from "fs";

export const sendJson = (jsonResponse) => (ctx) => {
  ctx.body = jsonResponse.data;
  ctx.status = jsonResponse.status;
};

export const sendSuccess = () => (ctx) => {
  ctx.body = {
    status: "success",
  };
  ctx.status = 200;
};

export const sendError = (status = 500) => (ctx) => {
  ctx.body = {
    status: "error",
  };
  ctx.status = status;
};

export const sendPdf = () => (ctx) => {
  ctx.body = fs.createReadStream(`${__dirname}/data/pdf-export.pdf`);
  ctx.status = 200;
  ctx.set("Content-disposition", 'attachment; filename="pdf-export.pdf";');
  ctx.set("Content-type", "application/pdf");
};

export const sendExcel = () => (ctx) => {
  ctx.body = fs.createReadStream(`${__dirname}/data/xls-export.xlsx`);
  ctx.status = 200;
  ctx.set("Content-disposition", "attachment; filename=bookings-list-mock.xlsx");
  ctx.set("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};
