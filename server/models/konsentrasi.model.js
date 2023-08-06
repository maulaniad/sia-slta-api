import database from "../config/db.js";

class Konsentrasi {
  constructor(konsentrasi) {
    this.idKonsentrasi = konsentrasi.idKonsentrasi;
    this.namaKonsentrasi = konsentrasi.namaKonsentrasi;
  }
}

Konsentrasi.getAll = (resultHandler) => {
  database.query(
    "SELECT idKonsentrasi, namaKonsentrasi FROM konsentrasi",
    (error, result) => {
      if (error) {
        console.log(`Error querying the DB ${error}`);
        resultHandler(error, null);
      }

      resultHandler(null, result);
    }
  );
}

export default Konsentrasi;
