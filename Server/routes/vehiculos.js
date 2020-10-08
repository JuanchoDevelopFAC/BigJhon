"use strict";

const express = require("express");
const vehiculoController = require("../controllers/vehiculoController");
const router = express.Router();

router.post("/getAllVehiculos", vehiculoController.getAllVehiculos);
router.post("/getVehiculo", vehiculoController.getVehiculo);
router.delete("/delete", vehiculoController.delete);
router.post("/save", vehiculoController.save);
router.post("/saveImage", vehiculoController.saveImage);
router.put("/updateIngreso", vehiculoController.updateIngreso);
router.post("/getInfo", vehiculoController.info);

module.exports = router;
