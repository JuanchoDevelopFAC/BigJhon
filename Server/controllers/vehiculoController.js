"use strict";

var connection = require("../models/vehiculoModel");

function isNullOrEmpty(value) {
  var validator = value === null || value === undefined ? true : false;
  return validator;
}

var vehiculoController = {
  //Método para obtener todos los vehiculos por idEmpleado
  getAllVehiculos: (req, res) => {
    var parametros = req.body;
    connection.query(
      "SELECT * FROM vehiculos WHERE idEmpleado = ?",
      parametros.idEmpleado,
      (err, results) => {
        if (err) throw err;
        else if (results.length > 0) {
          return res.status(202).send({
            status: "success",
            message: "existe",
            objeto: results,
          });
        } else {
          return res.status(202).send({
            status: "success",
            message: "No existen vehiculos",
          });
        }
      }
    );
  },

  //Método para obtener vehiculo por placa
  getVehiculo: (req, res) => {
    var parametros = req.body;
    connection.query(
      "SELECT * FROM vehiculos WHERE placa=?",
      parametros.placa,
      (err, results) => {
        if (err) throw err;
        else if (results.length === 0) {
          return res.status(202).send({
            status: "success",
            message: "No existe",
          });
        } else if (results.length === 1) {
          return res.status(202).send({
            status: "success",
            message: "existe",
            objeto: results,
          });
        }
      }
    );
  },

  //Método para eliminar todos los vehiculos
  delete: (req, res) => {
    connection.query("DELETE FROM vehiculos", (err) => {
      if (err) throw err;
      else
        return res.status(202).send({
          status: "success",
          message: "Vehículo eliminado",
        });
    });
  },

  //Método para guardar imágen
  saveImage: (req, res) => {
    var parametros = req.formData;
    console.log("parametros: ");
    console.log(parametros);
  },

  //Método para actualizar vehículo al ingresar
  updateIngreso: (req, res) => {
    var parametros = req.body;
    var vehiculo = {
      placa: parametros.placa,
      fechaIngreso: parametros.fechaIngreso,
    };
    connection.query(
      "UPDATE vehiculos SET fechaIngreso = ? WHERE placa = ?",
      [vehiculo.fechaIngreso, vehiculo.placa],
      (err) => {
        if (err) throw err;
        else {
          return res.status(202).send({
            status: "success",
            message: "vehiculo ingresado",
          });
        }
      }
    );
  },

  //Método para obtener información del vehículo
  info: (req, res) => {
    var parametros = req.body;
    connection.query(
      "SELECT fechaIngreso FROM vehiculos WHERE placa = ?",
      parametros.placa,
      (err, results) => {
        if (err) throw err;
        else {
          return res.status(202).send({
            status: "success",
            data: results,
          });
        }
      }
    );
  },

  //Método para guardar los vehículos
  save: (req, res) => {
    //Recoger los parámetros por POST
    var parametros = req.body;
    //Crear objeto Empleado
    var vehiculo = {
      cilindraje: parametros.cilindraje,
      tiempos: parametros.tiempos,
      placa: parametros.placa,
      modelo: parametros.modelo,
      cantidadPuertas: parametros.cantidadPuertas,
      foto: parametros.foto,
      tipo: parametros.tipo,
      fechaIngreso: parametros.fechaIngreso,
      idEmpleado: parametros.idEmpleado,
    };

    if (isNullOrEmpty(vehiculo.idEmpleado)) {
      return res.status(202).send({
        status: "error",
        message: "Faltan ingresar datos",
      });
    } else {
      //Validar que el vehiculo no existe por medio de placa
      connection.query(
        "SELECT * FROM vehiculos WHERE placa=?",
        vehiculo.placa,
        (err, results) => {
          if (err) throw err;
          else if (results.length === 0) {
            //Guardar vehiculo
            connection.query("INSERT INTO vehiculos SET ?", vehiculo, (err) => {
              if (err) {
                return res.status(404).send({
                  status: "error",
                  message: "El vehículo no se ha guardado",
                });
              } else {
                return res.status(202).send({
                  status: "success",
                  message: "Guardado",
                });
              }
            });
          } else if (results.length === 1) {
            return res.status(202).send({
              status: "success",
              message: "El vehículo ya existe",
              empleado: results,
            });
          }
        }
      );
    }
  },
};

module.exports = vehiculoController;
