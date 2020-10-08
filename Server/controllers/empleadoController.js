"use strict";

var connection = require("../models/empleadoModel");

function isNullOrEmpty(value) {
  var validator = value === null || value === undefined ? true : false;
  return validator;
}

var empleadoController = {
  //Método para obtener todos los empleados
  getAllEmpleados: (req, res) => {
    connection.query("SELECT * FROM empleados", (err, results) => {
      if (err) throw err;
      else if (results.length > 0) {
        return res.status(202).send({
          status: "success",
          message: results,
        });
      } else {
        return res.status(202).send({
          status: "success",
          message: "No existen empleados",
        });
      }
    });
  },

  //Método para obtener empleado por cédula o por placa
  getEmpleado: (req, res) => {
    var parametros = req.body;
    connection.query(
      "SELECT * FROM empleados WHERE cedula=?",
      parametros.cedula,
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

  //Método para obtener empleado por id
  getEmpleadoById: (req, res) => {
    var parametros = req.body;
    connection.query(
      "SELECT * FROM empleados WHERE id=?",
      parametros.id,
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

  //Método para eliminar todos los usuarios
  delete: (req, res) => {
    connection.query("DELETE FROM empleados", (err) => {
      if (err) throw err;
      else
        return res.status(202).send({
          status: "success",
          message: "Empleado eliminado",
        });
    });
  },

  //Método para guardar los empleados
  save: (req, res) => {
    //Recoger los parámetros por POST
    var parametros = req.body;

    //Crear objeto Empleado
    var empleado = {
      nombre: parametros.nombre,
      apellidos: parametros.apellidos,
      cedula: parametros.cedula,
    };

    if (
      isNullOrEmpty(empleado.nombre) ||
      isNullOrEmpty(empleado.apellidos) ||
      isNullOrEmpty(empleado.cedula)
    ) {
      return res.status(202).send({
        status: "error",
        message: "Faltan ingresar datos",
      });
    } else {
      //Validar que el usuario no existe por medio de cedula
      connection.query(
        "SELECT * FROM empleados WHERE cedula=?",
        empleado.cedula,
        (err, results) => {
          if (err) throw err;
          else if (results.length === 0) {
            //Guardar empleado
            connection.query("INSERT INTO empleados SET ?", empleado, (err) => {
              if (err) {
                return res.status(404).send({
                  status: "error",
                  message: "El empleado no se ha guardado",
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
              message: "El empleado ya existe",
              empleado: results,
            });
          }
        }
      );
    }
  },
};

module.exports = empleadoController;
