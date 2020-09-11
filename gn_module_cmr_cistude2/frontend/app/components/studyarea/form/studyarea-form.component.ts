import { Component, HostListener, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MapService } from "@geonature_common/map/map.service";
import { CmrService } from './../../../services/cmr.service';
import { StudyAreaService } from './../studyarea.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "studyarea-form",
  templateUrl: "./studyarea-form.component.html",
  providers: [StudyAreaService, CmrService]
})
export class StudyAreaFormComponent implements OnInit {
  public areaForm: FormGroup;
  cardContentHeight: any;

  constructor(
    public studyareaService: StudyAreaService,
    private _mapService: MapService,
    private _cmrService: CmrService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  ngOnInit() {
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
    }
        /*{this.areaForm.setValue({
      id_area: result.id_area,
      area_name: result.area_name,
      city_name: result.city_name,
      postal_code: result.postal_code,
      polygon_name: result.polygon_name
    })*/ );
  }
  recomputePolygonName(event) {
      console.log("recompute");
      var formValue = this.areaForm.value;
      var polygonName = "";
      console.log(formValue);
      console.log(formValue.area_name);
      console.log(formValue.area_name.value);
      if (formValue.area_name && formValue.city_name && formValue.postal_code) {
          polygonName = formValue.area_name.replace(" ", "_") + "_" + formValue.city_name.replace(" ", "_") + "_" + formValue.postal_code; 
      }
      console.log(polygonName);
      this.areaForm.patchValue({polygon_name: polygonName});
  }
}
