import { Router } from "express";
import validateAuthorizationRequest from "../middlewares/auth/validateAuthorizationRequest";
import checkIfUserIsLoggedIn from "../middlewares/auth/checkUserAlreadyLoggedIn";
import loginPageMiddleware from "../middlewares/auth/loginPageMiddleware";

const router = Router();

router.get("/authorize", validateAuthorizationRequest, checkIfUserIsLoggedIn);

router.get("/token");

router.get("/login", loginPageMiddleware);

router.post("/login", loginPageMiddleware);

router.get("/consent");
export default router;
