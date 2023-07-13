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

Siswa.create = (newSiswa, resultHandler) => {
  const placeholders = Object.keys(newSiswa).map(() => "?").join(", ");

  database.query(`
    INSERT INTO siswa (
      nisn, nama_siswa, email, jenis_kelamin, tanggal_lahir, alamat,
      user_id, kelas_id
    ) VALUES (${placeholders})`, [
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
  let sql = `SELECT nisn, nama_siswa, email, jenis_kelamin, tanggal_lahir,
             alamat, user_id, kelas_id FROM siswa`;

  if (keyword) {
    sql += ` WHERE nama_siswa LIKE '%${keyword}%';`;
  }

  database.query(sql, (error, result) => {
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
    `SELECT nisn, nama_siswa, email, jenis_kelamin, tanggal_lahir,
     alamat, user_id, kelas_id FROM siswa WHERE id_siswa = ${idSiswa}`,
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
      UPDATE siswa SET nisn = '${newSiswa.nisn}', nama_siswa = '${newSiswa.namaSiswa}',
      email = '${newSiswa.email}', jenis_kelamin = '${newSiswa.jenisKelamin}',
      tanggal_lahir = '${newSiswa.tanggalLahir}', alamat = '${newSiswa.alamat}',
      user_id = ${newSiswa.userId}, kelas_id = ${newSiswa.kelasId}
      WHERE id_siswa = ${idSiswa}
    `,
    (error, result) => {
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
    `DELETE FROM siswa WHERE id_siswa = ${idSiswa}`,
    (error, result) => {
      if (error) {
        console.log(`Error deleting Siswa: ${error}`);
        resultHandler(error, null);
        return;
      }

      resultHandler(null, result);
    }
  )
}

export default Siswa;
