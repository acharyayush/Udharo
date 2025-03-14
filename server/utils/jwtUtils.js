import jwt from "jsonwebtoken"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants/index.js"
export const generateJWT = (payload, type) => {
  if (type === REFRESH_TOKEN)
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "2h",
    });
  if (type === ACCESS_TOKEN)
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
  throw new Error("Unspecified token type");
};
export const setTokensInCookies = (res, accessToken, refreshToken) => {
    try {
      if(accessToken)
        res.cookie("access_token", accessToken, {
          httpOnly: true,
          maxAge: 2 * 60 * 60 * 1000, //2 hr for cookie to expire but 5m for token to expire (as we have access to refresh token map)
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
        });
      if(refreshToken)
        res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, //2 hrs
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/auth/refresh"
      });
    } catch (err) {
      throw err;
    }
  };