import express from "express";

import seatRouter from "./seatRouter.js";

const appRouter = express.Router();

appRouter.use("/seats", seatRouter);

export default appRouter;
