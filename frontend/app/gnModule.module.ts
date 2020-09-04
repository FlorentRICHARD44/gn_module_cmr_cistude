import { NgModule } from "@angular/core";
import { GN2CommonModule } from "@geonature_common/GN2Common.module";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { ModalRulesComponent } from "./components/modal_rules.component";
import { DataCMRComponent } from "./components/data_cmr/data_cmr.component";
import { DataNotCMRComponent } from "./components/data_not_cmr/data_not_cmr.component";
import { RequestComponent } from "./components/requests/request.component";

// my module routing
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "data-cmr", component: DataCMRComponent },
  { path: "data-not-cmr", component: DataNotCMRComponent },
  { path: "request", component: RequestComponent }
] ;

@NgModule({
  declarations: [HomeComponent,DataCMRComponent, DataNotCMRComponent, RequestComponent, ModalRulesComponent],
  imports: [GN2CommonModule, RouterModule.forChild(routes)],
  providers: [],
  bootstrap: []
})
export class GeonatureModule {}
