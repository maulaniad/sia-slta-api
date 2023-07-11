import moment from "moment";
import Siswa from "../models/siswa.model.js";

const convertDate = (mysqlDate) => {
  const convertedDate = moment.utc(mysqlDate).toDate();

  return moment(convertedDate).format("DD-MM-YYYY");
}

const sendFieldError = (fieldName, res) => {
  res.status(400).json(
    {
      status: 400,
      message: `Field ${fieldName} cannot be empty! and All fields should use Encoded-form`
    }
  );
}

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "Request cannot be empty!" });
  }

  const {
    nisn, namaSiswa, email, jenisKelamin, tanggalLahir, alamat, userId, kelasId
  } = req.body;

  if (!nisn)         { return sendFieldError(Object.keys({nisn})[0], res); }
  if (!namaSiswa)    { return sendFieldError(Object.keys({namaSiswa})[0], res); }
  if (!email)        { return sendFieldError(Object.keys({email})[0], res); }
  if (!jenisKelamin) { return sendFieldError(Object.keys({jenisKelamin})[0], res); }
  if (!tanggalLahir) { return sendFieldError(Object.keys({tanggalLahir})[0], res); }
  if (!alamat)       { return sendFieldError(Object.keys({alamat})[0], res); }
  if (!userId)       { return sendFieldError(Object.keys({userId})[0], res); }

  const siswa = new Siswa({
    nisn,
    namaSiswa,
    email,
    jenisKelamin,
    tanggalLahir,
    alamat,
    userId,
    kelasId
  });

  Siswa.create(siswa, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({ status: 201, message: "Success!", data: data[0]});
  });
}

const findAll = (req, res) => {
  const keyword = req.query.keyword;

  Siswa.getAll(keyword, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    data.forEach((row) => row.tanggal_lahir = convertDate(row.tanggal_lahir));

    return res.status(200).json({ status: 200, message: "Success", data: data });
  });
}

const findById = (req, res) => {
  const id = req.params.id;

  Siswa.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({ status: 200, message: "Data not found ..." });
    }
  
    data[0].tanggal_lahir = convertDate(data[0].tanggal_lahir);
    return res.status(200).json({ status: 200, message: "Success", data: data[0] });
  });
}

export { create, findAll, findById };
