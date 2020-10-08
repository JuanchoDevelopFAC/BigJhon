"use strict";

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Juancho.1995",
  database: "BigJhon",
});

module.exports = connection;
