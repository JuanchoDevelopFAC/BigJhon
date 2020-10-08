"use strict";

const connection = require("./models/empleadoModel");
const port = 5000;

//Cargar módulos de node para crear servidor
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multiPart = require("connect-multiparty");

//Ejecutar express
var app = express();

//Configuración middleware
const multiPartMiddleware = multiPart({
  uploadDir: "./subidas",
});

//Cargar fichero de rutas
var rutasEmpleado = require("./routes/empleados");
var rutasVehiculo = require("./routes/vehiculos");

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/empleados", rutasEmpleado);
app.use("/vehiculos", rutasVehiculo);

connection.connect((err) => {
  if (!err) {
    console.log("Conexión establecida satisfactoriamente");
    app.listen(port, () => {
      console.log("Servidor corriendo en http://localhost:" + port);
    });
  } else console.log("Conexión fallida" + JSON.stringify(err, undefined, 2));
});
