import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neighbors',
  templateUrl: './neighbors.component.html',
  styleUrls: ['./neighbors.component.scss']
})
export class NeighborsComponent implements OnInit {
  AdditionalFilterPage=false;
  additionalfilterflag=false;
  constructor() { }

  ngOnInit() {
  }

  openAdditionalFilter(){
    this.AdditionalFilterPage=true;
    this.additionalfilterflag=true;
  }
 closeAdditionalFilter(){
   debugger;
    this.AdditionalFilterPage=false;
    this.additionalfilterflag=false;

  }
}
