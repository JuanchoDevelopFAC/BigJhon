import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { routing } from "./app.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterComponent } from "./components/register/register.component";
import { RegisterVehiclesComponent } from "./components/register-vehicles/register-vehicles.component";
import { ListVehiclesComponent } from "./components/list-vehicles/list-vehicles.component";
import { BillComponent } from './components/bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    RegisterVehiclesComponent,
    ListVehiclesComponent,
    BillComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
