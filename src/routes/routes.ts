import { Router } from "express";
import validateAuthorizationRequest from "../middlewares/auth/validateAuthorizationRequest";
import loginPageMiddleware from "../middlewares/auth/loginPageMiddleware";
import checkIfUserIsLoggedInMiddleware from "../middlewares/auth/checkUserAlreadyLoggedInMiddleware";
import testMiddleware from "../middlewares/testMiddleware";

const router = Router();

router.get("/authorize", validateAuthorizationRequest, checkIfUserIsLoggedInMiddleware);

router.get("/token");

router.get("/login", loginPageMiddleware);

router.post("/login", loginPageMiddleware);

router.get("/consent");
router.get("/test", testMiddleware);

export default router;
