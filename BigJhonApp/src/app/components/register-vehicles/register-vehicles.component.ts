import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VehiculoService } from "../../services/vehiculo.service";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-register-vehicles",
  templateUrl: "./register-vehicles.component.html",
  styleUrls: ["./register-vehicles.component.css"],
})
export class RegisterVehiclesComponent implements OnInit {
  formVehiculo: FormGroup;
  submitted = false;
  titulo = "Registrar vehículos";
  placa: String;
  modelo: String;
  cilindraje: String;
  tiempos: String;
  cantidadPuertas: String;
  foto: String;
  idEmpleado: Number;
  vehiculoExistente = false;
  vehiculoCreado = false;
  selectedFile: any;
  file: any;

  tipos = ["Carro", "Moto", "Bicicleta"];

  constructor(
    public vehiculoService: VehiculoService,
    public router: Router,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public dataService: DataService
  ) {}

  ngOnInit() {
    this.formVehiculo = this.formBuilder.group({
      tipo: ["", Validators.required],
      placa: ["", Validators.required],
      modelo: ["", Validators.required],
      cilindraje: ["", Validators.required],
      tiempos: ["", Validators.required],
      cantidadPuertas: ["", Validators.required],
      foto: ["", Validators.required],
    });
  }

  get f() {
    return this.formVehiculo.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function load() {
        this.selectedFile = reader.result;
      }.bind(this);

      this.file = file;
    }
  }

  crear() {
    this.submitted = true;
    var vehiculo = {
      idEmpleado: this.dataService.empleado[0].id,
      tipo: this.formVehiculo.value.tipo,
      placa: this.formVehiculo.value.placa,
      modelo: this.formVehiculo.value.modelo,
      cilindraje: this.formVehiculo.value.cilindraje,
      tiempos: this.formVehiculo.value.tiempos,
      cantidadPuertas: this.formVehiculo.value.cantidadPuertas,
      foto: null,
      fechaIngreso: null,
      fechaSalida: null,
    };
    this.vehiculoService.save(vehiculo).subscribe(
      (data) => {
        if (data.message === "El vehículo ya existe") {
          this.vehiculoExistente = true;
          setTimeout(() => {
            this.vehiculoExistente = false;
          }, 3000);
        }
        if (data.message === "Guardado") {
          this.vehiculoCreado = true;
          setTimeout(() => {
            this.vehiculoCreado = false;
          }, 3000);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
