import { Router } from "express";
import validateAuthorizationRequest from "../middlewares/validateAuthorizationRequest";
import checkIfUserIsLoggedIn from "../middlewares/checkUserAlreadyLoggedIn";


const router = Router();

router.get("/authorize", 
validateAuthorizationRequest,
checkIfUserIsLoggedIn);

router.get("/token");

router.get("/login");

router.get("/consent");
export default router;

