import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { CmrService } from './../../../services/cmr.service';
import { DatatableComponent } from "@swimlane/ngx-datatable/release";
import { MapService } from "@geonature_common/map/map.service";

@Component({
  selector: "studyarea-list",
  templateUrl: "./studyarea-list.component.html",
  styleUrls: ['./../../../styles.css'],
  providers: [CmrService]
})
export class StudyAreaListComponent implements OnInit {
    cardContentHeight: any;
  public areasList = [];
  @ViewChild("table")
  table: DatatableComponent;
  constructor(
    private _cmrService: CmrService,
    private _mapService: MapService
    ) {
    }
  ngOnInit() {}
  
  ngAfterViewInit() {
    setTimeout(() => this.calcCardContentHeight(), 300);
    this._cmrService.getAllStudyAreas().subscribe(data => {
        this.areasList = data;
    });
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.calcCardContentHeight();
  }
  calcCardContentHeightParent(minusHeight?) {
    const windowHeight = window.innerHeight;
    const tbH = document.getElementById("app-toolbar")
      ? document.getElementById("app-toolbar").offsetHeight
      : 0;
    const height = windowHeight - tbH - (minusHeight || 0);
    return height >= 350 ? height : 350;
  }
  calcCardContentHeight() {
    let minusHeight = 50;

    this.cardContentHeight = this.calcCardContentHeightParent(minusHeight + 20)

    // resize map after resize container
    if (this._mapService.map) {
      setTimeout(() => {
        this._mapService.map.invalidateSize();
      }, 10);
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}