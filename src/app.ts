import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import { config } from "./config/config";
import bodyParser from "body-parser";
import usersRouter from "./routes/usersRoute";
import { BaDRequestApiError } from "./utils/apiError";
import { logger } from "./config/logger";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/err", () => {
        throw new BaDRequestApiError("some bad request error");
});

app.use(router);
app.use(usersRouter);

app.use(errorHandler);

app.listen(config.port, () => {
        logger.log(
                "info",
                `${config.application_name} listening on port ${config.port}`
        );
});
