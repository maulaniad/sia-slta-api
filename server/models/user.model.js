import database from "../config/db.js";

class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }
}

User.getById = (idUser, resultHandler) => {
  database.query(
    `
      SELECT idUser, username, password, namaRole as role FROM user
      JOIN role ON role.idRole = user.roleId
      WHERE idUser = ${idUser}
    `,
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  )
}

User.getByUsername = (username, resultHandler) => {
  database.query(
    `
      SELECT idUser, username, password, namaRole as role FROM user
      JOIN role ON role.idRole = user.roleId
      WHERE username = '${username}'
    `,
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  )
}

export default User;
