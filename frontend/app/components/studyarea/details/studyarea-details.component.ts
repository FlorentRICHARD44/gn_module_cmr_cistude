import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { CmrService } from './../../../services/cmr.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { MapService } from "@geonature_common/map/map.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "studyarea-details",
  templateUrl: "./studyarea-details.component.html",
  styleUrls: ['./../../../styles.css'],
  providers: [CmrService]
})
export class StudyAreaDetailsComponent implements OnInit {
    showCampaigns = true;
    showIndividus = false;
    private _studyAreaId;
    private _studyAreaData = {};
    public campaignsList = [];
  @ViewChild("table")
  table: DatatableComponent;
  
  get studyArea() {
    return this._studyAreaData;
  }
  constructor(
    private _cmrService: CmrService,
    private _mapService: MapService,
    private route: ActivatedRoute
    ) {
    }

  ngOnInit() {
      this.route.params.subscribe(params => {this._studyAreaId = params.id});
  }
  
  ngAfterViewInit() {
    this._cmrService.getOneStudyArea(this._studyAreaId).subscribe(data => {this._studyAreaData = data;});
    this._cmrService.getAllCampaignsByArea(this._studyAreaId).subscribe(data => {this.campaignsList = data});
  }
}