import express, { Router } from "express";
import http from "http";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import compression from "compression";
import helmet from "helmet"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import router from "./router/index";

dotenv.config({
  path : path.resolve(__dirname , "../.env")
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/restAPI";
  
const app = express();  

const mongoDBConnection = mongoose.connect("mongodb://localhost:27017/restAPI");

mongoDBConnection
  .then(() => console.log("Mongo DB connected"))
  .catch((eror: Error) => console.log(`Error occured ${eror}`));

app.use(
  cors({
    credentials: true,
  })
);

// app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// const server = http.createServer(app);

app.use('/', router());

app.listen(PORT, () => {
  console.log(`Server started at https://localhost:${PORT}`);
});


