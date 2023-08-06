import { sendFieldError } from "../helpers/error.js";
import User from "../models/user.model.js";
import { RoleFormat, convertRole } from "../helpers/role.js";

const create = (req, res) => {
  if (!req.body) {
    res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { username, password } = req.body;
  const roleId = convertRole(req.body.role, RoleFormat.ToID);

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
  let roleId = req.query.id;

  if (roleId !== "0" && roleId !== "1") {
    roleId = null;
  }

  User.getAll(
    roleId, (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      if (result.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "Data empty ..."
        });
      }

      result.forEach((element) => {
        element.roleId = convertRole(element.roleId, RoleFormat.ToString);
      });

      return res.status(200).json({
        status: 200,
        message: "Success!",
        data: result
      });
    }
  );
}

const findAllUnused = (req, res) => {
  User.getUnusedUsers(
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      if (result.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "Data empty ...",
          data: [],
        });
      }

      result.forEach((element) => {
        element.roleId = convertRole(element.roleId, RoleFormat.ToString);
      });

      return res.status(200).json({
        status: 200,
        message: "Success!",
        data: result
      });
    }
  );
}

const findById = (req, res) => {
  const id = req.params.id;

  User.getById(id, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (result.length === 0) {
      return res.status(200).json({ status: 200, message: "Data not found ..." });
    }

    return res.status(200).json({ status: 200, message: "Success!", data: result[0] });
  });
}

const update = (req, res) => {
  const id = req.params.id;

  User.getById(id, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (result.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const currentUserData = result[0];
    const { username, password } = req.body;

    const user = new User({
      username: username,
      password: password,
      role: 1
    });

    User.update(id, user, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200,
        message: "Success!",
        before: currentUserData,
        after: user,
        records: data
      });
    });
  });
}

const deleteById = (req, res) => {
  const id = req.params.id;

  User.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedUserData = data[0];

    User.delete(id, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200, message: "Success!",
        deletedData: deletedUserData,
        records: data
      });
    });
  });
}

export { create, findAll, findAllUnused, findById, update, deleteById };
