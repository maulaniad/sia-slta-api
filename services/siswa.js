const db = require('./_db');
const helper = require('../helper');


async function getSiswa() {
  const rows = await db.query(
    `
      SELECT id_user AS id, nisn, name AS nama, email, classname AS kelas,
             concentration_name AS konsentrasi FROM users
      JOIN classes ON classes.id_class = users.id_class
      JOIN concentrations ON concentrations.id_concentration = classes.id_concentration;
    `
  );

  const data = helper.emptyOrRows(rows);

  return {
    message: 'OK',
    data: data
  }
}

async function getOneSiswa(requestParams) {
  const rows = await db.query(
    `
      SELECT id_user AS id, nisn, name AS nama, email, classname AS kelas,
             concentration_name AS konsentrasi FROM users
      JOIN classes ON classes.id_class = users.id_class
      JOIN concentrations ON concentrations.id_concentration = classes.id_concentration
      WHERE id_user = '${requestParams.id}';
    `
  );

  const data = helper.emptyOrRows(rows);

  return {
    message: 'OK',
    data: data
  }
}

async function getLengthSiswa() {
  const rows = await db.query(
    `SELECT COUNT(*) AS length FROM users WHERE id_role = 'ROL02';`
  );

  const data = helper.emptyOrRows(rows);

  return data[0].length;
}

async function createSiswa(requestBody) {
  const length = await getLengthSiswa();
  let parsedLength = parseInt(length) + 1;

  if (parsedLength < 10) {
    parsedLength = `0${parsedLength}`
  }

  const result = await db.query(
    `
      INSERT INTO users VALUES(
        'USR${parsedLength}', '${requestBody.nisn}', '${requestBody.name}',
        '${requestBody.email}', '${requestBody.password}', 'ROL02', '${requestBody.classId}'
      )
    `
  );

  let message = "Error Menambahkan Data Siswa...";

  if (result.affectedRows) {
    message = "Sukses Menambahkan Data Siswa!";
  }

  return { message: message };
}

async function updateSiswa(requestParams, { nisn, name, email, password, classId }) {
  const dataSiswa = helper.emptyOrRows(
    await db.query(
      `SELECT * FROM users WHERE id_user = '${requestParams.id}';`
    )
  )[0];

  nisn = nisn ?? dataSiswa.nisn;
  name = name ?? dataSiswa.name;
  email = email ?? dataSiswa.email;
  password = password ?? dataSiswa.password;
  classId = classId ?? dataSiswa.id_class;

  const rows = await db.query(
    `
      UPDATE users SET nisn = '${nisn}', name = '${name}', email = '${email}',
        password = '${password}', id_class = '${classId}'
      WHERE id_user = '${requestParams.id}';
    `
  );

  let message = "Gagal Mengubah Data Siswa...";

  if (rows.affectedRows) {
    message = "Sukses Mengubah Data Siswa!";
  }

  return { message: message };
}

async function deleteSiswa(requestParams) {
  let dataSiswa = helper.emptyOrRows(
    await db.query(
      `SELECT * FROM users WHERE id_user = '${requestParams.id}';`
    )
  )[0];
  const rows = await db.query(
    `
      DELETE FROM users WHERE id_user = '${requestParams.id}';
    `
  );

  let message = "Sukses Menghapus Data Siswa!";

  if (!rows.affectedRows) {
    message = "Gagal Menghapus Data Siswa...";

    dataSiswa = {};
  }

  return { message: message, terhapus: dataSiswa };
}

module.exports = {
  getSiswa,
  getOneSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa
}
