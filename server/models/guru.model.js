import database from "../config/db.js";

class Guru {
  constructor(guru) {
    this.nip = guru.nip;
    this.namaGuru = guru.namaGuru;
    this.email = guru.email;
    this.jenisKelamin = guru.jenisKelamin;
    this.tanggalLahir = guru.tanggalLahir;
  }
}

Guru.create = (newGuru, resultHandler) => {
  database.query(
    `
      INSERT INTO guru (nip, namaGuru, email, jenisKelamin, tanggalLahir)
      VALUES (?, ?, ?, ?, ?)
    `, [
      newGuru.nip,
      newGuru.namaGuru,
      newGuru.email,
      newGuru.jenisKelamin,
      newGuru.tanggalLahir
    ], (error, result) => {
      if (error) {
        console.log(`Error creating Guru: ${error}`);
        resultHandler(error, null);
      }

      const dataGuru = { id: result.insertId, ...result };

      resultHandler(null, dataGuru);
    }
  );
}

Guru.getAll = (keyword, resultHandler) => {
  let filter = keyword;
  let sql = `SELECT idGuru, nip, namaGuru, email, jenisKelamin, tanggalLahir
             FROM guru`;

  if (filter) {
    filter = `%${keyword}%`;
    sql += " WHERE namaGuru LIKE ?";
  }

  database.query(sql, [filter], (error, result) => {
    if (error) {
      console.log(`Error querying the DB: ${error}`);
      resultHandler(error, null);
      return;
    }

    resultHandler(null, result);
  });
}

Guru.getById = (idGuru, resultHandler) => {
  database.query(
    `SELECT idGuru, nip, namaGuru, email, jenisKelamin, tanggalLahir
     FROM guru WHERE idGuru = ?`, [idGuru],
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

Guru.update = (idGuru, newGuru, resultHandler) => {
  database.query(
    `
      UPDATE guru SET nip = ?, namaGuru = ?,
      email = ?, jenisKelamin = ?, tanggalLahir = ?
      WHERE idGuru = ?
    `, [
      newGuru.nip,
      newGuru.namaGuru,
      newGuru.email,
      newGuru.jenisKelamin,
      newGuru.tanggalLahir,
      idGuru
    ], (error, result) => {
      if (error) {
        console.log(`Error updating Guru: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

Guru.delete = (idGuru, resultHandler) => {
  database.query(
    "DELETE FROM guru WHERE idGuru = ?", [idGuru],
    (error, result) => {
      if (error) {
        console.log(`Error deleting Guru: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

export default Guru;
