import { Component, OnInit, ViewChild } from "@angular/core";
import { CmrService } from './../../services/cmr.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: "campaign-list",
  templateUrl: "./campaign-list.component.html",
  providers: [CmrService]
})
export class CampaignListComponent implements OnInit {
  public campaignsList = [];
  @ViewChild("table")
  table: DatatableComponent;
  constructor(
    private _cmrService: CmrService
    ) {
    }
  ngOnInit() {}
  ngAfterViewInit() {
    this._cmrService.getAllCampaigns().subscribe(data => {
      data.campaignsList = []
        this.campaignsList = data;
    });
  }
  displayObservateursTooltip(row): string[] {
    let tooltip = [];
    for (let i = 0; i < row.observers.length; i++) {
      let obs = row.observers[i];
      tooltip.push([obs.prenom_role, obs.nom_role].join(" "));
    }
    return tooltip.sort();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}