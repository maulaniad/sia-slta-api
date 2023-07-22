import database from "../config/db.js";

class Kelas {
  constructor(kelas) {
    this.namaKelas = kelas.namaKelas;
    this.idKonsentrasi = kelas.idKonsentrasi;
  }
}

Kelas.create = (newKelas, resultHandler) => {
  database.query(
    `
      INSERT INTO kelas (namaKelas, idKonsentrasi)
      VALUES (?, ?)
    `, [newKelas.namaKelas, newKelas.idKonsentrasi],
    (error, result) => {
      if (error) {
        console.log(`Error creating Kelas: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

Kelas.getAll = (keyword, resultHandler) => {
  let sql = `SELECT idKelas, namaKelas, namaKonsentrasi FROM kelas
             JOIN konsentrasi
             ON konsentrasi.idKonsentrasi = kelas.idKonsentrasi`;
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
      ON konsentrasi.idKonsentrasi = kelas.idKonsentrasi
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
      JOIN konsentrasi ON konsentrasi.idKonsentrasi = kelas.idKonsentrasi
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
      UPDATE kelas SET namaKelas = ?, idKonsentrasi = ?,
      WHERE idKelas = ?
    `, [
      newKelas.namaKelas,
      newKelas.idKonsentrasi,
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
