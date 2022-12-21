import { Router } from "express";
import authorizeRouter from "./authorizeRouter";
import noAuthorizeRouter from "./noAuthorizeRouter";

const apiRouter = Router();
apiRouter.use(noAuthorizeRouter);
apiRouter.use(authorizeRouter);

export default apiRouter