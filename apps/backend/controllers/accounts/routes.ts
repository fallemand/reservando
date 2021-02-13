import Router from "koa-router";
import auth from "../../services/auth";
import { getSupplierAccounts } from "./controller";

const router = new Router();

router.post("/list", auth("admin"), getSupplierAccounts);

export default router;
