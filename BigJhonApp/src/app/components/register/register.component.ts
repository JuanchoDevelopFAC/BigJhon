import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { EmpleadoService } from "../../services/empleado.service";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { RegisterVehiclesComponent } from "../register-vehicles/register-vehicles.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formEmpleado: FormGroup;
  submitted = false;
  titulo = "Registrar empleados";
  nombre: String;
  apellidos: String;
  cedula: String;
  empleadoExistente = false;
  empleadoCreado = false;
  verVehiculo = false;

  constructor(
    public empleadoService: EmpleadoService,
    private modalService: NgbModal,
    public config: NgbModalConfig,
    public router: Router,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.formEmpleado = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      cedula: ["", Validators.required],
    });
  }

  get f() {
    return this.formEmpleado.controls;
  }

  crear() {
    this.submitted = true;
    const empleado = {
      nombre: this.formEmpleado.value.nombre,
      apellidos: this.formEmpleado.value.apellidos,
      cedula: this.formEmpleado.value.cedula,
    };

    console.log(empleado);
    if (
      empleado.nombre != "" ||
      empleado.apellidos != "" ||
      empleado.cedula != ""
    ) {
      this.empleadoService.save(empleado).subscribe(
        (data) => {
          if (data.message === "El empleado ya existe") {
            this.empleadoExistente = true;
            setTimeout(() => {
              this.empleadoExistente = false;
            }, 3000);
          }
          if (data.message === "Guardado") {
            this.empleadoCreado = true;
            setTimeout(() => {
              this.empleadoCreado = false;
            }, 3000);
          }
          this.verVehiculo = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  abrirVehiculos() {
    this.modalService.open(RegisterVehiclesComponent);
    this.verVehiculo = false;
  }
}
