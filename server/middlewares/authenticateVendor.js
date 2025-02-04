import jwt from "jsonwebtoken";
const authenticateVendor = (req, res, next) => {
  try {
    const access_token = req.cookies?.access_token;
    const { id, email } = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.id = id;
    req.email = email;
    next();
  } catch (err) {
    res.status(401).json({ message: "You are unauthorized" });
  }
};
export default authenticateVendor;
