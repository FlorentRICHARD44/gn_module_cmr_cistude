import { Component, HostListener, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MapService } from "@geonature_common/map/map.service";
import { UserDataService } from "@geonature/userModule/services/user-data.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User } from "@geonature/components/auth/auth.service";
import { CmrService } from './../../../services/cmr.service';
import { CampaignService } from './../campaign.service';

@Component({
  selector: "campaign-form",
  templateUrl: "./campaign-form.component.html",
  styleUrls: ['./../../../styles.css'],
  providers: [CampaignService, CmrService, AuthService]
})
export class CampaignFormComponent implements OnInit {
  public campaignForm: FormGroup;
  private _studyAreaId;
  public studyArea = {id_area:null,area_name:""};
  cardContentHeight: any;
  public currentUser: User;

  constructor(
    public campaignService: CampaignService,
    private _mapService: MapService,
    private _cmrService: CmrService,
    private _auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.currentUser = this._auth.getCurrentUser();
      this.route.params.subscribe(params => {this._studyAreaId = params.id_area});
    }
  ngOnInit() {
    this.campaignForm = this.campaignService.form;
    var initValues = this._computeInitData(1);
    var area_name = "";
    this._cmrService.getOneStudyArea(this._studyAreaId).subscribe(data => {
      this.studyArea = data;
      this._cmrService.getAllCampaignsByArea(this._studyAreaId).subscribe(
        data => {
          this.campaignForm.patchValue(this._computeInitData(data.length + 1));
        },
        error => {
          // let session at 1 by default (result error 404 if no campaign alreay created)
          this.campaignForm.patchValue(this._computeInitData(1));
        });
    });
  }
  _computeInitData( session) {
    var year = (new Date()).getFullYear();
    return {
      session: session,
      year: year,
      id_area: this.studyArea.id_area,
      name: this.studyArea.area_name.replace(" ", "_") + "_Session" + session + "_" + year
    };
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
    let minusHeight = <HTMLScriptElement>(
      (<any>document.querySelector("pnx-occtax-form .tab"))
    )
      ? (<HTMLScriptElement>(
        (<any>document.querySelector("pnx-occtax-form .tab"))
      )).offsetHeight
      : 0;

    this.cardContentHeight = this.calcCardContentHeightParent(minusHeight + 20)

    // resize map after resize container
    if (this._mapService.map) {
      setTimeout(() => {
        this._mapService.map.invalidateSize();
      }, 10);
    }
  }

  onSave() {
    this._cmrService.saveCampaign(this.campaignForm.value).subscribe(result => {
      this.router.navigate(['..'],{relativeTo: this.route});
    });
  }
}
