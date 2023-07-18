import Guru from "../models/guru.model.js";
import { sendFieldError } from "../helpers/error.js";
import { DateFormat, convertDate } from "../helpers/date.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const { nip, namaGuru, email, jenisKelamin, tanggalLahir } = req.body;

  if (!nip)          { return sendFieldError("nip", res); }
  if (!namaGuru)     { return sendFieldError("namaGuru", res); }
  if (!email)        { return sendFieldError("email", res); }
  if (!jenisKelamin) { return sendFieldError("jenisKelamin", res); }
  if (!tanggalLahir) { return sendFieldError("tanggalLahir", res); }

  const guru = new Guru({
    nip: nip,
    namaGuru: namaGuru,
    email: email,
    jenisKelamin: jenisKelamin,
    tanggalLahir: tanggalLahir,
  });

  Guru.create(guru, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: guru,
      records: data
    });
  });
}

const findAll = (req, res) => {
  const keyword = req.query.keyword;

  Guru.getAll(keyword, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({ status: 200, message: "Data empty ..." });
    }

    data.forEach(
      (row) => row.tanggalLahir = convertDate(row.tanggalLahir, DateFormat.FromMysql.toString())
    );

    return res.status(200).json({ status: 200, message: "Success!", data: data });
  });
}

const findById = (req, res) => {
  const id = req.params.id;

  Guru.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({ status: 200, message: "Data not found ..." });
    }
  
    data[0].tanggalLahir = convertDate(data[0].tanggalLahir, DateFormat.FromMysql.toString());
    return res.status(200).json({ status: 200, message: "Success!", data: data[0] });
  });
}

const update = (req, res) => {
  const id = req.params.id

  Guru.getById(id, (error, data) => {
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
    const newData = new Guru({
      nip: currentData.nip,
      namaGuru: currentData.namaGuru,
      email: currentData.email,
      jenisKelamin: currentData.jenisKelamin,
      tanggalLahir: currentData.tanggalLahir,
    });

    const { nip, namaGuru, email, jenisKelamin, tanggalLahir } = req.body;
  
    if (nip)          { newData.nip = nip; }
    if (namaGuru)     { newData.namaGuru = namaGuru; }
    if (email)        { newData.email = email; }
    if (jenisKelamin) { newData.jenisKelamin = jenisKelamin; }
    if (tanggalLahir) { newData.tanggalLahir = tanggalLahir; }

    Guru.update(id, newData, (error, data) => {
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

const deleteById = (req, res) => {
  const id = req.params.id;

  Guru.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(404).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedData = data[0];

    Guru.delete(id, (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: `${error.message}` });
      }

      return res.status(200).json({
        status: 200, message: "Success!",
        deletedData: deletedData,
        records: data
      });
    });
  });
}

export { create, findAll, findById, update, deleteById };
