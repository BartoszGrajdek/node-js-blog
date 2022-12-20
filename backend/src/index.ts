import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
const cors = require("cors");

const mongoConnect: (callback: () => void) => void = require('./utils/database').mongoConnect;

const whitelist = ["http://localhost:8001", "http://localhost:8002", "http://mongodb:27017"]

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}


const PORT = process.env.PORT || 8002;

const app: Application = express();

app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

mongoConnect(() => {
  app.listen(PORT);
})

