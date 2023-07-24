import database from "../config/db.js";

class Kelas {
  constructor(kelas) {
    this.namaKelas = kelas.namaKelas;
    this.konsentrasiId = kelas.konsentrasiId;
  }
}

Kelas.create = (newKelas, resultHandler) => {
  database.query(
    `
      INSERT INTO kelas (namaKelas, konsentrasiId)
      VALUES (?, ?)
    `, [newKelas.namaKelas, newKelas.konsentrasiId],
    (error, result) => {
      if (error) {
        console.log(`Error creating Kelas: ${error}`);
        resultHandler(error, null);
      }

      const dataKelas = { id: result.insertId, ...newKelas };

      resultHandler(null, dataKelas);
    }
  );
}

Kelas.getAll = (keyword, resultHandler) => {
  let sql = `SELECT idKelas, namaKelas, namaKonsentrasi FROM kelas
             JOIN konsentrasi
             ON konsentrasi.idKonsentrasi = kelas.konsentrasiId`;
  let filter = keyword;

  if (filter) {
    sql += " WHERE namaKelas LIKE ?";
    filter = `%${keyword}%`;
  }

  database.query(sql, [filter], (error, result) => {
    if (error) {
      console.log(`Error querying the DB: ${error}`);
      resultHandler(error, null);
    }

    resultHandler(null, result);
  });
}

Kelas.getById = (idKelas, resultHandler) => {
  database.query(
    `
      SELECT idKelas, namaKelas, namaKonsentrasi FROM kelas
      JOIN konsentrasi
      ON konsentrasi.idKonsentrasi = kelas.konsentrasiId
      WHERE idKelas = ?
    `, [idKelas], (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    });
}

Kelas.getSiswa = (idKelas, resultHandler) => {
  database.query(
    `
      SELECT idKelas, namaKelas, namaKonsentrasi FROM kelas
      JOIN konsentrasi ON konsentrasi.idKonsentrasi = kelas.konsentrasiId
      WHERE idKelas = ?
    `, [idKelas], (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
      }

      database.query(
        `
          SELECT nisn, namaSiswa, email, jenisKelamin, tanggalLahir, alamat
          FROM siswa WHERE kelasId = ?
        `, [idKelas], (error, data) => {
          if (error) {
            console.log(`Error querying the DB: ${error}`);
            resultHandler(error, null);
          }

          const dataSiswa = {
            idKelas: result[0].idKelas,
            namaKelas: result[0].namaKelas,
            namaKonsentrasi: result[0].namaKonsentrasi,
            siswa: data
          };

          resultHandler(null, dataSiswa);
        }
      );
    }
  );
}

Kelas.update = (idKelas, newKelas, resultHandler) => {
  database.query(
    `
      UPDATE kelas SET namaKelas = ?, konsentrasiId = ?
      WHERE idKelas = ?
    `, [
      newKelas.namaKelas,
      newKelas.konsentrasiId,
      idKelas
    ], (error, result) => {
      if (error) {
        console.log(`Error updating Kelas: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

Kelas.delete = (idKelas, resultHandler) => {
  database.query("DELETE FROM kelas WHERE idKelas = ?", [idKelas],
    (error, result) => {
      if (error) {
        console.log(`Error deleting Kelas: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default Kelas;
