import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  showModalDataNotCmr: boolean = false;
  showModalDataCmr: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
  
  openModalRulesNotCmr() {
    console.log(this.showModalDataNotCmr);
    this.showModalDataNotCmr = true;
    console.log(this.showModalDataNotCmr);
  }
  onModalClosedNotCmr(e) {
    this.showModalDataNotCmr = false;
    if (e == "accepted") {
      this.router.navigate(['./data-not-cmr'],{relativeTo: this.route});
    }
  }
  openModalRulesCmr() {
    this.showModalDataCmr = true;
  }
  onModalClosedCmr(e) {
    this.showModalDataCmr = false;
    if (e == "accepted") {
      this.router.navigate(['./data-cmr'],{relativeTo: this.route});
    }
  }
}
