import { DateFormat, convertDate } from "../helpers/date.js";
import { sendFieldError } from "../helpers/error.js";
import Siswa from "../models/siswa.model.js";

const create = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "No body provided ..." });
  }

  const {
    nisn, namaSiswa, email, jenisKelamin, tanggalLahir, alamat, idUser, idKelas
  } = req.body;

  if (!nisn)         { return sendFieldError("nisn", res); }
  if (!namaSiswa)    { return sendFieldError("namaSiswa", res); }
  if (!email)        { return sendFieldError("email", res); }
  if (!jenisKelamin) { return sendFieldError("jenisKelamin", res); }
  if (!tanggalLahir) { return sendFieldError("tanggalLahir", res); }
  if (!alamat)       { return sendFieldError("alamat", res); }
  if (!idUser)       { return sendFieldError("userId", res); }

  const siswa = new Siswa({
    nisn: nisn,
    namaSiswa: namaSiswa,
    email: email,
    jenisKelamin: jenisKelamin,
    tanggalLahir: tanggalLahir,
    alamat: alamat,
    userId: idUser,
    kelasId: idKelas
  });

  Siswa.create(siswa, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    return res.status(201).json({
      status: 201,
      message: "Success!",
      data: siswa,
      records: data
    });
  });
}

const findAll = (req, res) => {
  const keyword = req.query.keyword;

  Siswa.getAll(keyword, (error, data) => {
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

  Siswa.getById(id, (error, data) => {
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

const update = async (req, res) => {
  let id = await Siswa.getLinkedUserId(req.user.id);

  if (req.user.role.toLowerCase() === "admin") {
    id = req.params.id;
  }

  Siswa.getById(id, (error, data) => {
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
    const newData = new Siswa({
      nisn: currentData.nisn,
      namaSiswa: currentData.namaSiswa,
      email: currentData.email,
      jenisKelamin: currentData.jenisKelamin,
      tanggalLahir: currentData.tanggalLahir,
      alamat: currentData.alamat,
      userId: currentData.userId,
      kelasId: currentData.kelasId
    });

    const {
      nisn, namaSiswa, email, jenisKelamin, tanggalLahir, alamat, idUser, idKelas
    } = req.body;
  
    if (nisn)         { newData.nisn = nisn; }
    if (namaSiswa)    { newData.namaSiswa = namaSiswa; }
    if (email)        { newData.email = email; }
    if (jenisKelamin) { newData.jenisKelamin = jenisKelamin; }
    if (tanggalLahir) { newData.tanggalLahir = tanggalLahir; }
    if (alamat)       { newData.alamat = alamat; }
    if (idUser)       { newData.userId = idUser; }
    if (idKelas)      { newData.kelasId = idKelas; }

    Siswa.update(id, newData, (error, data) => {
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

  Siswa.getById(id, (error, data) => {
    if (error) {
      return res.status(500).json({ status: 500, message: `${error.message}` });
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: 200, message: "Data not found, therefore no action has been made ..."
      });
    }

    const deletedData = data[0];

    Siswa.delete(id, (error, data) => {
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
