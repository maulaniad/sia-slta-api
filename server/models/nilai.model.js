import database from "../config/db.js";

class Nilai {
  constructor(nilai) {
    this.tmt = nilai.tmt;
    this.tmtt = nilai.tmtt;
    this.uts = nilai.uts;
    this.uas = nilai.uas;
    this.siswaId = nilai.siswaId;
    this.mapelId = nilai.mapelId;
  }
}

Nilai.create = (newNilai, resultHandler) => {
  const placeholders = Object.keys(newNilai).map(() => "?").join(", ");

  database.query(
    `
      INSERT INTO nilai (
        tmt, tmtt, uts, uas, siswaId, mapelId
      ) VALUES (${placeholders})
    `, [
      newNilai.tmt,
      newNilai.tmtt,
      newNilai.uts,
      newNilai.uas,
      newNilai.siswaId,
      newNilai.mapelId,
      newNilai.semesterId
    ], (error, result) => {
      if (error) {
        console.log(`Error creating Nilai: ${error}`);
        resultHandler(error, null);
        return;
      }

      const dataNilai = { id: result.insertId, ...newNilai };

      resultHandler(null, dataNilai);
    }
  );
}

Nilai.getAll = async (idKelas, resultHandler) => {
  try {
    const dataSiswaResult = await new Promise((resolve, reject) => {
      database.query(
        `
          SELECT idSiswa, nisn, namaSiswa, namaKelas FROM siswa
          JOIN kelas ON kelas.idKelas = siswa.kelasId
          WHERE idKelas = ?
        `, [idKelas],
        (error, result) => {
          if (error) {
            console.log(`Error querying the DB: ${error}`);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });

    const dataNilaiSiswa = [];

    for (const value of dataSiswaResult) {
      const nilaiResult = await new Promise((resolve, reject) => {
        database.query(
          `
            SELECT tmt, tmtt, uts, uas, mapelId, namaMapel, tingkatSemester
            FROM nilai
            JOIN mapel ON mapel.idMapel = nilai.mapelId
            JOIN semester ON semester.idSemester = mapel.semesterId
            WHERE siswaId = ?
          `, [value.idSiswa],
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });

      const dataNilai = {
        nisn: value.nisn,
        namaSiswa: value.namaSiswa,
        namaKelas: value.namaKelas,
        mapel: nilaiResult.map((row) => ({
          tingkatSemester: row.tingkatSemester,
          namaMapel: row.namaMapel,
          mapelId: row.mapelId,
          nilai: {
            tmt: row.tmt,
            tmtt: row.tmtt,
            uts: row.uts,
            uas: row.uas,
          },
        })),
      };

      dataNilaiSiswa.push(dataNilai);
    }

    resultHandler(null, dataNilaiSiswa);
  }
  catch (error) {
    resultHandler(error, null);
  }
}

Nilai.getById = (idSiswa, resultHandler) => {
  database.query(
    `SELECT tmt, tmtt, uts, uas, namaMapel
     FROM nilai
     JOIN siswa ON siswa.idSiswa = nilai.siswaId
     JOIN mapel ON mapel.idMapel = nilai.mapelId
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

Nilai.getByIds = (idSiswa, idMapel, resultHandler) => {
  database.query(
    `SELECT tmt, tmtt, uts, uas, namaSiswa, namaMapel
     FROM nilai
     JOIN siswa ON siswa.idSiswa = nilai.siswaId
     JOIN mapel ON mapel.idMapel = nilai.mapelId
     WHERE siswaId = ? AND mapelId = ?
     `, [idSiswa, idMapel],
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

Nilai.update = (idSiswa, idMapel, newNilai, resultHandler) => {
  database.query(
    `
      UPDATE nilai SET tmt = ?, tmtt = ?,
      uts = ?, uas = ?
      WHERE siswaId = ? AND mapelId = ?
    `, [
      newNilai.tmt,
      newNilai.tmtt,
      newNilai.uts,
      newNilai.uas,
      idSiswa,
      idMapel,
    ],
    (error, result) => {
      if (error) {
        console.log(`Error updating Nilai: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

Nilai.delete = (idSiswa, idMapel, resultHandler) => {
  database.query(
    "DELETE FROM nilai WHERE siswaId = ? AND mapelId = ?", [idSiswa, idMapel],
    (error, result) => {
      if (error) {
        console.log(`Error deleting Nilai: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  );
}

export default Nilai;
