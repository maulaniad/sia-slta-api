import moment from "moment";
import Siswa from "../models/siswa.model.js";

const findAll = (req, res) => {
  const keyword = req.query.keyword;

  Siswa.getAll(keyword, (error, data) => {
    if (error) {
      res.status(500).json({
        status: 500,
        message: `Error : ${error.message}`
      })
    }

    data.forEach((row) => {
      const mysqlDate = row.tanggal_lahir;
      const convertedDate = moment.utc(mysqlDate).toDate();
      row.tanggal_lahir = moment(convertedDate).format("DD-MM-YYYY");
    });

    res.status(200).json(data);
  });
}

export { findAll };
