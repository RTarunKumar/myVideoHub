import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JWT, ExtractJwt, StrategyOptions } from "passport-jwt";
import User from "../model/userSchema";
import { Request, RequestHandler } from "express";
import { Types } from "mongoose";

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user: {
    _id: Types.ObjectId;
  };
}

export type AuthenticatedRequestHandler = RequestHandler<
  any,
  any,
  any,
  any,
  AuthenticatedRequest
>;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
};

passport.use(
  new JWT(opts, async (jwtPayload, middleware) => {
    try {
      const user = await User.findById(jwtPayload._id).select("-password");
      if (!user) middleware(null, false); //takes error and user
      return middleware(null, user);
    } catch (error) {
      console.error(error);
    }
  }),
);

export default passport;
