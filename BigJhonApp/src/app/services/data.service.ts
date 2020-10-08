import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  busqueda: String;

  empleado = {
    id: Number,
    nombre: String,
    apellidos: String,
    cedula: Number,
  };

  vehiculo = {
    id: Number,
    cilindraje: String,
    tiempos: String,
    placa: String,
    modelo: String,
    cantidadPuertas: Number,
    tipo: String,
    fechaIngreso: Date,
    fechaSalida: Date,
    idEmpleado: Number,
  };

  factura = {
    nombre: "",
    apellidos: "",
    cedula: Number,
    placa: "",
    fechaIngreso: "",
  };

  constructor() {}
}
