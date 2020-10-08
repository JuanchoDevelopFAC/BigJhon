import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ListVehiclesComponent } from "./components/list-vehicles/list-vehicles.component";

const appRoutes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent, pathMatch: "full" },
  { path: "vehiculos", component: ListVehiclesComponent, pathMatch: "full" },
];

export const routing = RouterModule.forRoot(appRoutes);
