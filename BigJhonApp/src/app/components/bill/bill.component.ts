import { Component, OnInit } from "@angular/core";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.css"],
})
export class BillComponent implements OnInit {
  factura = {
    nombre: "",
    apellidos: "",
    cedula: Number,
    placa: "",
    fechaIngreso: "",
  };

  dias: String;

  constructor(
    public config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    public dataService: DataService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.factura = this.dataService.factura;
    var fechaActual = new Date();
    var diaActual = fechaActual.getDate();
    var mesActual = fechaActual.getMonth();
    var añoActual = fechaActual.getFullYear();
    var diaIngresado = parseInt(
      this.factura.fechaIngreso.toString().substring(8, 10)
    );
    var mesIngresado = parseInt(
      this.factura.fechaIngreso.toString().substring(5, 7)
    );
    var añoIngresado = parseInt(
      this.factura.fechaIngreso.toString().substring(0, 4)
    );

    var cDia = Math.abs(diaActual - diaIngresado);
    var cMes = Math.abs(mesActual - mesIngresado);
    var cAño = Math.abs(añoActual - añoIngresado);

    this.dias = cDia + " días, " + cMes + " meses, " + cAño + " años.";
  }
}
