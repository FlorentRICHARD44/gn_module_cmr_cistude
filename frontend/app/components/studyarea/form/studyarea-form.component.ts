import { Component, HostListener, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MapService } from "@geonature_common/map/map.service";
import { CmrService } from './../../../services/cmr.service';
import { CmrMapService } from './../../../services/crm-map.service';
import { StudyAreaService } from './../studyarea.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "studyarea-form",
  templateUrl: "./studyarea-form.component.html",
  providers: [StudyAreaService, CmrService, CmrMapService]
})
export class StudyAreaFormComponent implements OnInit {
  public leafletDrawOptions: any;
  public areaForm: FormGroup;
  cardContentHeight: any;

  constructor(
    public studyareaService: StudyAreaService,
    private _mapService: MapService,
    private _cmrService: CmrService,
    private _cmrMapService: CmrMapService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.leafletDrawOptions = this._cmrMapService.getLeafletDrawOptionDrawPolygon();
    this.areaForm = this.studyareaService.form;
  }
  ngAfterViewInit() {
    setTimeout(() => this.calcCardContentHeight(), 500);
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

  onSave() {
    this._cmrService.saveStudyArea(this.areaForm.value).subscribe(result => {
        this.router.navigate(['..'],{relativeTo: this.route});
    });
  }

  recomputePolygonName(event) {
      var formValue = this.areaForm.value;
      var polygonName = "";
      if (formValue.area_name && formValue.city_name && formValue.postal_code) {
          polygonName = formValue.area_name.replace(" ", "_") + "_" + formValue.city_name.replace(" ", "_") + "_" + formValue.postal_code; 
      }
      this.areaForm.patchValue({polygon_name: polygonName});
  }

  setNewGeometry(geojson) {
    console.log(geojson)
    this.areaForm.patchValue({
      geom: geojson ? geojson.geometry : undefined
    });
  }
}
