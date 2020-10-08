"use strict";

const express = require("express");
const empleadoController = require("../controllers/empleadoController");
const router = express.Router();

router.get("/getAllEmpleados", empleadoController.getAllEmpleados);
router.post("/getEmpleado", empleadoController.getEmpleado);
router.delete("/delete", empleadoController.delete);
router.post("/save", empleadoController.save);
router.post("/getEmpleadoById", empleadoController.getEmpleadoById);

module.exports = router;
