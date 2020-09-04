import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "modal-rules",
  templateUrl: "./modal_rules.component.html"
})
export class ModalRulesComponent implements OnInit {
  acceptChecked: boolean = false;
  @Input()
  visible: boolean = false;
  @Output() closed = new EventEmitter();


  
  constructor() {}

  ngOnInit() {}

  onClose() {
    this.visible = false;
    this.closed.emit('closed');
  }

  onAccept() {
    this.visible = false;
    this.closed.emit('accepted');
  }
}
