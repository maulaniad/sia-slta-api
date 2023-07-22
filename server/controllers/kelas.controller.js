import { sendFieldError } from "../helpers/error.js";
import Kelas from "../models/kelas.model.js";

const create = (req, res) => {
  if (!req.body) {
    res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { namaKelas, idKonsentrasi } = req.body;

  if (!namaKelas)     { return sendFieldError("namaKelas", res); }
  if (!idKonsentrasi) { return sendFieldError("idKonsentrasi", res); }

  const kelas = new Kelas({
    namaKelas: namaKelas,
    idKonsentrasi: idKonsentrasi
  });

  Kelas.create(kelas, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: kelas,
      records: result
    });
  });
}

const findAll = (req, res) => {
  Kelas.getAll(
    (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      if (result.length === 0) {
        return res.status(200).json({
          status: 200,
          message: "Data empty ..."
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Success!",
        data: result
      });
    }
  );
}

const findAllSiswa = (req, res) => {
  const idKelas = req.params.id;

  Kelas.getSiswa(idKelas, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(200).json({
      status: 200,
      message: "Success!",
      data: result
    });
  });
}

const update = (req, res) => {
  const id = req.params.id;

  Kelas.getById(id, (error, result) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (result.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const currentKelasData = result[0];
    const { namaKelas, idKonsentrasi } = req.body;

    const kelas = new Kelas({
      namaKelas: namaKelas,
      idKonsentrasi: idKonsentrasi,
    });

    Kelas.update(id, kelas, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200,
        message: "Success!",
        before: currentKelasData,
        after: kelas,
        records: data
      });
    });
  });
}

const deleteById = (req, res) => {
  const id = req.params.id;

  Kelas.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedKelasData = data[0];

    Kelas.delete(id, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200, message: "Success!",
        deletedData: deletedKelasData,
        records: data
      });
    });
  });
}

export { create, findAll, findAllSiswa, update, deleteById };
