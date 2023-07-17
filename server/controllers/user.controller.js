import { sendFieldError } from "../helpers/error.js";
import User from "../models/user.model.js";

const convertRole = (string) => {
  if (!string) { return 0; }

  if (string.toLowerCase() === "admin") {
    return 1;
  }

  return 0;
}

const create = (req, res) => {
  if (!req.body) {
    res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { username, password } = req.body;
  const roleId = convertRole(req.body.role);
  console.log(roleId);

  if (!username) { return sendFieldError("username", res); }
  if (!password) { return sendFieldError("password", res); }

  const user = new User({
    username: username,
    password: password,
    role: roleId
  });

  User.create(user, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: `Success!`,
      data: user,
      records: result
    });
  });
}

const findAll = (req, res) => {

}

const findById = (req, res) => {

}

const update = (req, res) => {

}

const deleteById = (req, res) => {
  
}

export { create, findAll, findById, update, deleteById };
