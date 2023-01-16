import Router from "express";

import { keyController } from "../controller";

const router = Router();

router.post("/", keyController.genKey);

router.get("/verify", keyController.verifyKey);

router.post("/permission", keyController.getPermission);

export default router;