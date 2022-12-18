import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";


import Router from "./routes";
const mongoConnect: (callback: () => void) => void = require('./utils/database').mongoConnect;

const PORT = process.env.PORT || 8002;

const app: Application = express();

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

