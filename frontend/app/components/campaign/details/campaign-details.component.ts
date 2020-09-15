import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { CmrService } from './../../../services/cmr.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { MapService } from "@geonature_common/map/map.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "campaign-details",
  templateUrl: "./campaign-details.component.html",
  styleUrls: ['./../../../styles.css'],
  providers: [CmrService]
})
export class CampaignDetailsComponent implements OnInit {
  private _studyAreaId;
  private _campaignId;
  private _campaignData = {};
  private _studyAreaData = {};
  public pointVisitList = [];
  cardContentHeight: any;
  @ViewChild("table")
  table: DatatableComponent;
  
  get studyArea() {
    return this._studyAreaData;
  }
  get campaign() {
    return this._campaignData;
  }
  constructor(
    private _cmrService: CmrService,
    private _mapService: MapService,
    private route: ActivatedRoute
    ) {
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._studyAreaId = params.id_area;
      this._campaignId = params.id_campaign;
    });
  }
  
  ngAfterViewInit() {
    this._cmrService.getOneStudyArea(this._studyAreaId).subscribe(data => {this._studyAreaData = data;});
    this._cmrService.getOneCampaign(this._campaignId).subscribe(data => {this._campaignData = data});
  }
}