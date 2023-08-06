import database from "../config/db.js";

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }
}

User.create = (newUser, resultHandler) => {
  database.query(
    `
      INSERT INTO user (username, password, roleId)
      VALUES (?, ?, ?)
    `, [newUser.username, newUser.password, newUser.role],
    (error, result) => {
      if (error) {
        console.log(`Error creating User: ${error}`);
        resultHandler(error, null);
        return;
      }

      const dataUser = { id: result.insertId, ...newUser };

      resultHandler(null, dataUser);
    }
  );
}

User.getAll = (roleFilter, resultHandler) => {
  let sql = "SELECT idUser, username, password, roleId FROM user";

  if (roleFilter) {
    sql += ` WHERE roleId = ?`;
  }

  database.query(
    sql, [roleFilter], (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

User.getUnusedUsers = (resultHandler) => {
  database.query(
    `
      SELECT idUser, username, password, roleId
      FROM user
      LEFT JOIN siswa ON user.idUser = siswa.userId
      WHERE siswa.userId IS NULL AND user.roleId = 0
    `,
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

User.getById = (idUser, resultHandler) => {
  database.query(
    `
      SELECT idUser, username, password, namaRole as role FROM user
      JOIN role ON role.idRole = user.roleId
      WHERE idUser = ?
    `, [idUser],
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

User.getByUsername = (username, resultHandler) => {
  database.query(
    `
      SELECT idUser, username, password, namaRole as role FROM user
      JOIN role ON role.idRole = user.roleId
      WHERE username = ?
    `, [username],
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

User.update = (idUser, newUser, resultHandler) => {
  database.query(
    `
      UPDATE user SET username = ?, password = ?
      WHERE idUser = ?
    `, [newUser.username, newUser.password, idUser],
    (error, result) => {
      if (error) {
        console.log(`Error updating User: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

User.delete = (idUser, resultHandler) => {
  database.query(
    "DELETE FROM user WHERE idUser = ?", [idUser],
    (error, result) => {
      if (error) {
        console.log(`Error deleting User; ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default User;
