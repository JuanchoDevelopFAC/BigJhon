import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  url = "http://localhost:5000/vehiculos";

  constructor(private http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  httpOptionImage = {
    headers: new HttpHeaders({
      "Content-Type": "multipart/form-data",
    }),
  };

  saveImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(
      this.url + "/saveImage",
      formData,
      this.httpOptionImage
    );
  }

  save(vehiculo: any): Observable<any> {
    return this.http.post(this.url + "/save", vehiculo, this.httpOption);
  }

  getVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(this.url + "/getVehiculo", vehiculo, this.httpOption);
  }

  getAllVehiculos(vehiculo: any): Observable<any> {
    return this.http.post(
      this.url + "/getAllVehiculos",
      vehiculo,
      this.httpOption
    );
  }

  updateVehiculo(vehiculo: any): Observable<any> {
    return this.http.put(
      this.url + "/updateIngreso",
      vehiculo,
      this.httpOption
    );
  }

  getInfo(vehiculo: any): Observable<any> {
    return this.http.post(this.url + "/getInfo", vehiculo, this.httpOption);
  }
}
