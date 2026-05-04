import express from "express";
import authRouter from "./authRouter";
import passport, { session } from "passport";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter,
);

export default router;
