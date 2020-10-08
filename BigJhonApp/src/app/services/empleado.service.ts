import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmpleadoService {
  url = "http://localhost:5000/empleados";

  constructor(private http: HttpClient) {}

  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  save(empleado: any): Observable<any> {
    return this.http.post(this.url + "/save", empleado);
  }

  getEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.url + "/getEmpleado", empleado);
  }

  getEmpleadoById(empleado: any): Observable<any> {
    return this.http.post(this.url + "/getEmpleadoById", empleado);
  }
}
