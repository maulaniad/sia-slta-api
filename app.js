import "dotenv/config";
import express from "express";
import authRouter from "./server/routes/auth.routes.js";
import userRouter from "./server/routes/user.routes.js";
import siswaRouter from "./server/routes/siswa.routes.js";
import guruRouter from "./server/routes/guru.routes.js";
import mapelRouter from "./server/routes/mapel.routes.js";
import kelasRouter from "./server/routes/kelas.routes.js";
import absensiRouter from "./server/routes/absensi.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Success!" });
});

app.use("/login-sek", authRouter);
app.use("/user", userRouter);
app.use("/siswa", siswaRouter);
app.use("/guru", guruRouter);
app.use("/mapel", mapelRouter);
app.use("/kelas", kelasRouter);
app.use("/absensi", absensiRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Express runs at http://127.0.0.1:${process.env.SERVER_PORT}`);
});
