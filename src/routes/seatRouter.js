import express from "express";

import {
  createSeats,
  getSeatInfo,
  getSeats,
  OpenAllTickets,
  updateSingleSeat,
} from "../controllers/seatController.js";

const seatRouter = express.Router();

seatRouter.post("/create", createSeats);
seatRouter.put("/updateseat", updateSingleSeat);
seatRouter.get("/getseats", getSeats);
seatRouter.get("/getseatinfo", getSeatInfo);
seatRouter.get("/openall", OpenAllTickets);

export default seatRouter;
