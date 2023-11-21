import { Router } from "express";
import validateAuthorizationRequest from "../middlewares/auth/validateAuthorizationRequest";
import loginPageMiddleware from "../middlewares/auth/loginPageMiddleware";
import checkIfUserIsLoggedInMiddleware from "../middlewares/auth/checkIfUserIsAlreadyLoggedInMiddleware";
import testMiddleware from "../middlewares/testMiddleware";
import tokenRequestValidationMiddleware from "../middlewares/auth/tokenRequestValidationMiddleware";

const router = Router();

router.get(
        "/authorize",
        validateAuthorizationRequest,
        checkIfUserIsLoggedInMiddleware
);

router.post("/token", tokenRequestValidationMiddleware);

router.get("/login", loginPageMiddleware);

router.post("/login", loginPageMiddleware);

router.get("/consent");
router.get("/test", testMiddleware);

export default router;
