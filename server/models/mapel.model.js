import database from "../config/db.js";

class Mapel {
  constructor(mapel) {
    this.namaMapel = mapel.namaMapel;
    this.jam = mapel.jam;
    this.hari = mapel.hari;
  }
}

Mapel.create = (mapel, resultHandler) => {
  database.query(
    `
      INSERT INTO mapel (namaMapel, jam, hari)
      VALUES (?, ?, ?)
    `, [mapel.namaMapel, mapel.jam, mapel.hari],
    (error, result) => {
      if (error) {
        console.log(`Error creating Mapel: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

Mapel.getAll = (resultHandler) => {
  database.query("SELECT idMapel, namaMapel, jam, hari FROM mapel",
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

Mapel.getById = (idMapel, resultHandler) => {
  database.query(
    `
      SELECT idMapel, namaMapel, jam, hari FROM mapel
      WHERE idMapel = ?
    `, [idMapel],
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

Mapel.update = (idMapel, newMapel, resultHandler) => {
  database.query(
    `
      UPDATE mapel SET namaMapel = ?,
      jam = ?, hari = ? FROM mapel
      WHERE idMapel = ?
    `, [newMapel.namaMapel, newMapel.jam, newMapel.hari, idMapel],
    (error, result) => {
      if (error) {
        console.log(`Error updating Mapel: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

Mapel.delete = (idMapel, resultHandler) => {
  database.query(
    "DELETE FROM mapel WHERE idMapel = ?", [idMapel],
    (error, result) => {
      if (error) {
        console.log(`Error deleting Mapel: ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default Mapel;
