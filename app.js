import "dotenv/config";
import express from "express";
import siswaRouter from "./server/routes/siswa.routes.js";
import authRouter from "./server/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Success" });
});

app.use("/login-sek", authRouter);
app.use("/siswa", siswaRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Express runs at http://127.0.0.1:${process.env.SERVER_PORT}`)
});
