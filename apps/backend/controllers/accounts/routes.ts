import Router from "koa-router";
import auth from "../../services/auth";
import {
  getSupplierAccounts,
  createSupplierAccount,
  updateSupplierAccount,
  deleteSupplierAccount,
} from "./controller";

const router = new Router();

router.get("/list", auth("account_manage"), getSupplierAccounts);
router.post("/create", auth("account_manage"), createSupplierAccount);
router.put("/update", auth("account_manage"), updateSupplierAccount);
router.delete("/delete", auth("account_manage"), deleteSupplierAccount);

export default router;
