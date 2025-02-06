import jwt from "jsonwebtoken";
const authenticateVendor = (req, res, next) => {
  const access_token = req.cookies?.access_token;
  if(!access_token){
    res.status(401).json({message: "You are unauthorized", tokenStatus: "empty", isIntercepted: true})
    return;
  }
  try {
    const { id, email } = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.id = id;
    req.email = email;
    next();
  } catch (err) {
    res.status(401).json({ message: "You are unauthorized", tokenStatus: "invalid", isIntercepted: true });
  }
};
export default authenticateVendor;
