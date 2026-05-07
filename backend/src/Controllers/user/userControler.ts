import { AuthenticatedRequestHandler } from "../../config/passportJwtStrategy";
import User from "../../model/userSchema";
import { sendResponse } from "../../Utils/sendResponse";

export const getUserDetails: AuthenticatedRequestHandler = async (req, res) => {
  try {
    if (req.user instanceof User) {
      const userId = req.user._id;
      if (!userId) {
        sendResponse(res, 400, false, "Please sign in to continue");
      }
      const user = await User.findById(userId).select("-password"); //password skiped for frontend so that frontend cant see it.
      if (!user) {
        sendResponse(res, 404, false, "User not found");
      }
      sendResponse(res, 200, true, "User details found", { user });
    }
  } catch (error) {
    console.error(`Error in sending user details ${error}`);
    sendResponse(res, 500, false, "Internal server error");
  }
};

export const updateuser: AuthenticatedRequestHandler = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name) {
      return sendResponse(res, 400, false, "Name is required");
    }
    if (!email) {
      return sendResponse(res, 400, false, "Email is required");
    }
    if (req.user instanceof User) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, false, "User id not found");
      }
      const user = await User.findByIdAndUpdate(userId, {name, email});
      if (!user) {
        return sendResponse(res, 400, false, "User not found");
      }
      sendResponse(res, 200, true, "Successfully updated your details", { name, email });
    }
  } catch (error) {
    console.error(`Error in updating user ${error}`);
    sendResponse(res, 500, false, "Internal server error");
  }
};
