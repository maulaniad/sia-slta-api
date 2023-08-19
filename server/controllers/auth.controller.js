import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const login = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({status: 400, message: "No body provided ..."});
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 400, message: "Username or Password cannot be empty ..." });
  }

  User.getByUsername(username, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `Error: ${error.message}` });
    }

    if (!data[0]) {
      return res.status(400).json({ status: 400, message: "User not found ..." });
    }

    if (password !== data[0].password) {
      return res.status(400).json({ status: 400, message: "Invalid password ..." });
    }

    const token = jwt.sign({
      id: data[0].idUser,
      user: data[0].username,
      role: data[0].role,
    }, "private-key", { expiresIn: "24h" });
  
    return res.status(200).json({
      status: 200,
      message: "Login success!",
      user: data[0].username,
      role: data[0].role,
      token: token
    });
  });
}

export { login };
