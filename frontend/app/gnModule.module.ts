import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'; 
import { GN2CommonModule } from "@geonature_common/GN2Common.module";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home.component";
import { ModalRulesComponent } from "./components/modal_rules.component";
import { DataCMRComponent } from "./components/data_cmr/data_cmr.component";
import { DataNotCMRComponent } from "./components/data_not_cmr/data_not_cmr.component";
import { RequestComponent } from "./components/requests/request.component";
import { CampaignFormComponent } from "./components/campaign/form/campaign-form.component";
import { CampaignListComponent } from "./components/campaign/list/campaign-list.component";
import { CampaignDetailsComponent } from "./components/campaign/details/campaign-details.component";
import { StudyAreaListComponent } from "./components/studyarea/list/studyarea-list.component";
import { StudyAreaFormComponent } from "./components/studyarea/form/studyarea-form.component";
import { StudyAreaDetailsComponent } from "./components/studyarea/details/studyarea-details.component";

// my module routing
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "data-cmr", component: DataCMRComponent },
  { path: "data-cmr/studyarea", component: StudyAreaFormComponent },
  { path: "data-cmr/studyarea/:id", component: StudyAreaDetailsComponent },
  { path: "data-cmr/studyarea/:id_area/campaign", component: CampaignFormComponent },
  { path: "data-cmr/studyarea/:id_area/campaign/:id_campaign", component: CampaignDetailsComponent },
  { path: "data-not-cmr", component: DataNotCMRComponent },
  { path: "request", component: RequestComponent }
] ;

@NgModule({
  declarations: [HomeComponent,DataCMRComponent, DataNotCMRComponent, RequestComponent, ModalRulesComponent, 
    StudyAreaListComponent, StudyAreaFormComponent, StudyAreaDetailsComponent, 
    CampaignFormComponent,CampaignListComponent, CampaignDetailsComponent],
  imports: [GN2CommonModule, CommonModule, RouterModule.forChild(routes)],
  providers: [],
  bootstrap: []
})
export class GeonatureModule {}
