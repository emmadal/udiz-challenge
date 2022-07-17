import * as jwt from "jsonwebtoken";
import { User } from "./models";

/*Func to generate a valid  token for user Authentication */
export const generateValidToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
  return token;
};

/*Func to verify the validity of token*/
export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload.userId;
  } catch (error) {
    return error.message;
  }
};

/*Func to return the user by Id*/
export const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};