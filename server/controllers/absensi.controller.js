import Absensi from "../models/absensi.model.js";
import { sendFieldError } from "../helpers/error.js";
import { convertDate, DateFormat } from "../helpers/date.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { tanggal, statusHadir, idSiswa } = req.body;

  if (!tanggal)     { return sendFieldError("tanggal", res); }
  if (!statusHadir) { return sendFieldError("statusHadir", res); }
  if (!idSiswa)     { return sendFieldError("idSiswa", res); }

  const absensi = new Absensi({
    tanggal: tanggal,
    statusHadir: statusHadir,
    siswaId: idSiswa,
  });

  Absensi.create(absensi, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: absensi,
      records: data
    });
  });
}

const findAll = (req, res) => {
  const idSiswa = req.params.id;

  Absensi.getAll(idSiswa, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({ status: 200, message: "Data empty ..." });
    }

    data.forEach(
      (row) => row.tanggal = convertDate(row.tanggal, DateFormat.FromMysql.toString())
    );

    return res.status(200).json({ status: 200, message: "Success!", data: data });
  });
}

const update = (req, res) => {
  const idSiswa = req.params.id;

  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provied ..." });
  }

  const { tanggal, statusHadir } = req.body;

  if (!tanggal) {
    return sendFieldError("tanggal", res);
  }

  if (!statusHadir) {
    return sendFieldError("statusHadir", res);
  }

  Absensi.getByDate(tanggal, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    data[0].tanggalLahir = convertDate(data[0].tanggalLahir, DateFormat.ToMysql.toString());

    const currentData = data[0];
    const newData = new Absensi({
      tanggal: tanggal,
      statusHadir: statusHadir,
      siswaId: idSiswa,
    });

    Absensi.update(tanggal, newData, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json(
        {
          status: 200, message: "Success!",
          before: currentData,
          after: newData,
          records: data
        }
      );
    });
  });
}

export { create, findAll, update };
