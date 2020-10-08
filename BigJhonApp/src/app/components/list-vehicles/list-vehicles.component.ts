import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { VehiculoService } from "src/app/services/vehiculo.service";
import { EmpleadoService } from "../../services/empleado.service";
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router";
import { RegisterVehiclesComponent } from "../register-vehicles/register-vehicles.component";
import { BillComponent } from "../bill/bill.component";

@Component({
  selector: "app-list-vehicles",
  templateUrl: "./list-vehicles.component.html",
  styleUrls: ["./list-vehicles.component.css"],
})
export class ListVehiclesComponent implements OnInit {
  vehiculos: Array<Object>;
  sinVehiculos = false;
  tieneFecha = false;
  ingresado = false;
  noParqueadero = false;
  celda = 0;

  constructor(
    public empleadoService: EmpleadoService,
    public vehiculoService: VehiculoService,
    public dataService: DataService,
    public router: Router,
    private modalService: NgbModal,
    public config: NgbModalConfig
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.getVehiculos();
  }

  getVehiculos() {
    if (this.dataService.busqueda == "empleado") {
      var empleado = {
        idEmpleado: this.dataService.empleado[0].id,
      };
      this.vehiculoService.getAllVehiculos(empleado).subscribe(
        (data) => {
          if (data.message == "No existen vehiculos") {
            this.sinVehiculos = true;
          } else {
            this.vehiculos = data.objeto;
            this.sinVehiculos = false;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.dataService.busqueda == "vehiculo") {
      var vehiculo = {
        placa: this.dataService.vehiculo[0].placa,
      };
      this.vehiculoService.getVehiculo(vehiculo).subscribe(
        (data) => {
          this.vehiculos = data.objeto;
          this.sinVehiculos = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  open() {
    this.modalService.open(RegisterVehiclesComponent);
  }

  ingresar(vehiculo: any) {
    this.vehiculoService.getInfo(vehiculo).subscribe(
      (data) => {
        if (data.data[0].fechaIngreso == null) {
          this.tieneFecha = false;
          var fecha = new Date();
          var datos = {
            placa: vehiculo.placa,
            fechaIngreso:
              fecha.getFullYear() +
              "-" +
              fecha.getMonth() +
              "-" +
              fecha.getDate(),
            celda: this.celda,
          };
          this.vehiculoService.updateVehiculo(datos).subscribe(
            (data) => {
              this.ingresado = true;
              setTimeout(() => {
                this.ingresado = false;
              }, 3000);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.tieneFecha = true;
          setTimeout(() => {
            this.tieneFecha = false;
          }, 3000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verFactura(vehiculo: any) {
    this.vehiculoService.getInfo(vehiculo).subscribe((data) => {
      if (data.data[0].fechaIngreso == null) {
        this.noParqueadero = true;
        setTimeout(() => {
          this.noParqueadero = false;
        }, 3000);
      } else {
        console.log(vehiculo);
        this.dataService.factura = {
          nombre: this.dataService.empleado[0].nombre,
          apellidos: this.dataService.empleado[0].apellidos,
          cedula: this.dataService.empleado[0].cedula,
          placa: vehiculo.placa,
          fechaIngreso: vehiculo.fechaIngreso,
        };
        this.modalService.open(BillComponent);
      }
    });
  }
}
