import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("api-key");

  if (!token) {
    return res.status(401).json(
      {
        status: 401, message: "Access denied. No token provided ..."
      }
    );
  }

  try {
    const decodedToken = jwt.verify(token, "private-key");
    req.user = decodedToken;
  }
  catch (error) {
    return res.status(401).json(
      {
        status: 401,
        message: "Access denied. Token expired ..."
      }
    );
  }

  next();
}

export default auth;
