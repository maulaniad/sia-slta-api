const express = require("express");
const app = express();
const port = 3000;
const jadwalRouter = require("./routes/jadwal");
const siswaRouter = require("./routes/siswa");


app.use(express.json());

app.use(
  express.urlencoded({ extended: true })
);

app.get(
  "/", (req, res) => {
    res.json({ message: "OK" });
  }
);

app.use("/jadwal", jadwalRouter);

app.use("/siswa", siswaRouter);

app.use(
  (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
  }
);

app.get('*', function(req, res) {
  res.json({ message: "Penggunaan Rute Salah, Harap Periksa Ulang..." })
})

app.listen(
  port, () => {
    console.log(`App Listening at http://localhost:${port}`);
  }
);
