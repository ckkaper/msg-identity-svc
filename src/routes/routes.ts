import { Router } from "express";
import validateAuthorizationRequest from "../middlewares/validateAuthorizationRequest";
import checkIfUserIsLoggedIn from "../middlewares/checkUserAlreadyLoggedIn";
import loginPageMiddleware from "../middlewares/loginPageMiddleware";

const router = Router();

router.get("/authorize", validateAuthorizationRequest, checkIfUserIsLoggedIn);

router.get("/token");

router.get("/login", loginPageMiddleware);

router.post("/login", loginPageMiddleware);

router.get("/consent");
export default router;
