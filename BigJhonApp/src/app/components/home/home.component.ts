import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterComponent } from "../register/register.component";
import { EmpleadoService } from "../../services/empleado.service";
import { VehiculoService } from "../../services/vehiculo.service";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  formConsulta: FormGroup;
  titulo = "Buscar empleado por cédula o placa";
  cedula: String;

  existe = false;
  verVehiculos = false;
  crearVehiculos = false;
  noExiste = false;

  constructor(
    public empleadoService: EmpleadoService,
    public vehiculoService: VehiculoService,
    public dataService: DataService,
    private modalService: NgbModal,
    public config: NgbModalConfig,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.formConsulta = this.formBuilder.group({
      dato: ["", Validators.required],
    });
  }

  open() {
    this.modalService.open(RegisterComponent);
  }

  buscar() {
    if (parseInt(this.formConsulta.value.dato)) {
      const empleado = {
        cedula: this.formConsulta.value.dato,
      };
      this.empleadoService.getEmpleado(empleado).subscribe(
        (data) => {
          if (data.message == "existe") {
            this.dataService.busqueda = "empleado";
            this.dataService.empleado = data.objeto;
            this.router.navigate(["/vehiculos"]);
            this.noExiste = false;
          } else {
            this.noExiste = true;
            setTimeout(() => {
              this.noExiste = false;
            }, 2000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      const vehiculo = {
        placa: this.formConsulta.value.dato.toUpperCase(),
      };
      this.vehiculoService.getVehiculo(vehiculo).subscribe(
        (data) => {
          if (data.message == "existe") {
            this.dataService.busqueda = "vehiculo";
            this.dataService.vehiculo = data.objeto;
            var empleado = {
              id: data.objeto[0].idEmpleado,
            };
            this.getEmpleadoById(empleado);
          } else {
            this.noExiste = true;
            setTimeout(() => {
              this.noExiste = false;
            }, 2000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getEmpleadoById(empleado) {
    this.empleadoService.getEmpleadoById(empleado).subscribe(
      (data) => {
        this.dataService.empleado = data.objeto;
        this.router.navigate(["/vehiculos"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
