import Router from "@koa/router";
import { sendJson, sendSuccess } from "./mock-utils";
import Permissions from "./data/permissions.json";
import AccountsGet from "./data/accounts-get.json";

// Frontend-api mocks
const router = new Router();

/**
 * Frontend-api mocks
 */
router.get("/api/roles/list", sendJson(Permissions));

// Accounts
router.get("/suppliers/*/accounts", sendJson(AccountsGet));
router.post("/suppliers/*/accounts", sendSuccess());
router.put("/accounts/*", sendSuccess());
router.delete("accounts/*", sendSuccess());

export default router;
