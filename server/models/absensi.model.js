import database from "../config/db.js";

class Absensi {
  constructor(absensi) {
    this.tanggal = absensi.tanggal;
    this.statusHadir = absensi.statusHadir;
    this.siswaId = absensi.siswaId;
  }
}

Absensi.create = (newAbsensi, resultHandler) => {
  database.query(
    `
      INSERT INTO absensi (tanggal, statusHadir, siswaId)
      VALUES (?, ?, ?)
    `, [newAbsensi.tanggal, newAbsensi.statusHadir, newAbsensi.siswaId],
    (error, result) => {
      if (error) {
        console.log(`Error creating Absensi: ${error}`);
        resultHandler(error, null);
        return;
      }

      const dataAbsensi = { id: result.insertId, ...newAbsensi };

      resultHandler(null, dataAbsensi);
    }
  );
}

Absensi.getAll = (idSiswa, resultHandler) => {
  database.query(
    `
      SELECT tanggal, statusHadir, siswaId FROM absensi
      WHERE siswaId = ?
    `, [idSiswa],
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

Absensi.getById = (idAbsensi, resultHandler) => {
  database.query(
    `
      SELECT tanggal, statusHadir, siswaId
      FROM absensi
      WHERE idAbsensi = ?
    `, [idAbsensi],
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

Absensi.getByDate = (tanggal, resultHandler) => {
  database.query(
    `
      SELECT tanggal, statusHadir, idSiswa, namaSiswa, idKelas, namaKelas
      FROM absensi
      JOIN siswa ON siswa.idSiswa = absensi.siswaId
      JOIN kelas ON kelas.idKelas = siswa.kelasId
      WHERE tanggal = ?
    `, [tanggal],
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

Absensi.update = (idAbsensi, newAbsensi, resultHandler) => {
  database.query(
    `
      UPDATE absensi SET statusHadir = ?
      WHERE idAbsensi = ?
    `, [newAbsensi.statusHadir, idAbsensi],
    (error, result) => {
      if (error) {
        console.log(`Error updating Absensi: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default Absensi;
