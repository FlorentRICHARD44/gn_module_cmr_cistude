import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CmrService } from './../../services/cmr.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";

@Component({
  selector: "campaign-list",
  templateUrl: "./campaign-list.component.html",
  providers: [CmrService]
})
export class CampaignListComponent implements OnInit {
  @Input()
  public campaignsList;

  @ViewChild("table")
  table: DatatableComponent;
  constructor(
    private _cmrService: CmrService
    ) {
    }
  ngOnInit() {}

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}