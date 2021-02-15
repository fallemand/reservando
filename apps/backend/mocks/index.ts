import Router from "@koa/router";
import { sendJson } from "./mock-utils";
import Permissions from "./data/roles.json";

// Mocks
const router = new Router();
router.post("/roles", sendJson(Permissions));

export default router;
