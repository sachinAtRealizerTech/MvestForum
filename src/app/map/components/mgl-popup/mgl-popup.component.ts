import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mvest-mgl-popup',
  templateUrl: './mgl-popup.component.html',
  styleUrls: ['./mgl-popup.component.scss']
})
export class MglPopupComponent {
  @Input() selectedPoint: any;
  intrestNumber: number;

  constructor() { }


  claimLease() {
    if (this.intrestNumber) {
      alert(`Thanks for claiming lease! ${this.intrestNumber}`)
    } else {
      alert(`Please inter valid interest to claim`);
    }
  }

}
