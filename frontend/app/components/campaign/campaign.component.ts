import { Component, HostListener, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MapService } from "@geonature_common/map/map.service";
import { UserDataService } from "@geonature/userModule/services/user-data.service";
import { AuthService, User } from "@geonature/components/auth/auth.service";
import { CmrService } from './../../services/cmr.service';
import { CampaignService } from './campaign.service';

@Component({
  selector: "campaign",
  templateUrl: "./campaign.component.html",
  providers: [CampaignService, CmrService, AuthService]
})
export class CampaignComponent implements OnInit {
  public campaignForm: FormGroup;
  cardContentHeight: any;
  public currentUser: User;

  constructor(
    public campaignService: CampaignService,
    private _mapService: MapService,
    private _cmrService: CmrService,
    private _auth: AuthService
    ) {
      this.currentUser = this._auth.getCurrentUser();
    }
  ngOnInit() {
    this.campaignForm = this.campaignService.form;
    console.log(this.currentUser);
    this.campaignForm.patchValue({
      operators: [this.currentUser],
    });
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
    this._cmrService.saveCampaign(this.campaignForm.value).subscribe(result => {this.campaignForm.setValue({
      id_campaign: result.id_campaign,
      description: result.description,
      operators: result.operators,
      name: result.name,
    })});
  }
}
