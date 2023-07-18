import database from "../config/db.js";

class Siswa {
  constructor(siswa) {
    this.nisn = siswa.nisn;
    this.namaSiswa = siswa.namaSiswa;
    this.email = siswa.email;
    this.jenisKelamin = siswa.jenisKelamin;
    this.tanggalLahir = siswa.tanggalLahir;
    this.alamat = siswa.alamat;
    this.userId = siswa.userId;
    this.kelasId = siswa.kelasId;
  }
}

Siswa.getLinkedUserId = async (idSiswa) => {
  return await database.promise().query(
    "SELECT userId FROM siswa WHERE idSiswa = ?", [idSiswa],
    (error) => {
      if (error) {
        return null;
      }
    }
  ).then((rows) => {
    return rows[0][0].userId;
  });
}

Siswa.create = (newSiswa, resultHandler) => {
  const placeholders = Object.keys(newSiswa).map(() => "?").join(", ");

  database.query(
    `
      INSERT INTO siswa (
        nisn, namaSiswa, email, jenisKelamin, tanggalLahir, alamat,
        userId, kelasId
      ) VALUES (${placeholders})
    `, [
      newSiswa.nisn,
      newSiswa.namaSiswa,
      newSiswa.email,
      newSiswa.jenisKelamin,
      newSiswa.tanggalLahir,
      newSiswa.alamat,
      newSiswa.userId,
      newSiswa.kelasId
    ], (error, result) => {
      if (error) {
        console.log(`Error creating Siswa: ${error}`);
        resultHandler(error, null);
        return;
      }

      const dataSiswa = {id: result.insertId, ...newSiswa}; 

      resultHandler(null, dataSiswa);
    }
  );
}

Siswa.getAll = (keyword, resultHandler) => {
  let filter = keyword;
  let sql = `SELECT idSiswa, nisn, namaSiswa, email, jenisKelamin, tanggalLahir,
             alamat, userId, kelasId FROM siswa`;
  
  if (filter) {
    filter = `%${keyword}%`;
    sql += ` WHERE namaSiswa LIKE ?`;
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

Siswa.getById = (idSiswa, resultHandler) => {
  database.query(
    `SELECT idSiswa, nisn, namaSiswa, email, jenisKelamin, tanggalLahir,
     alamat, userId, kelasId FROM siswa WHERE idSiswa = ?`, [idSiswa],
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

Siswa.update = (idSiswa, newSiswa, resultHandler) => {
  database.query(
    `
      UPDATE siswa SET nisn = ?, namaSiswa = ?,
      email = ?, jenisKelamin = ?,
      tanggalLahir = ?, alamat = ?,
      userId = ?, kelasId = ?
      WHERE idSiswa = ?
    `, [
      newSiswa.nisn,
      newSiswa.namaSiswa,
      newSiswa.email,
      newSiswa.jenisKelamin,
      newSiswa.tanggalLahir,
      newSiswa.alamat,
      newSiswa.userId,
      newSiswa.kelasId,
      idSiswa
    ], (error, result) => {
      if (error) {
        console.log(`Error updating Siswa: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

Siswa.delete = (idSiswa, resultHandler) => {
  database.query(
    "DELETE FROM siswa WHERE idSiswa = ?", [idSiswa],
    (error, result) => {
      if (error) {
        console.log(`Error deleting Siswa: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

export default Siswa;
