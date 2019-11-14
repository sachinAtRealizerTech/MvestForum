import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-neighbors',
  templateUrl: './neighbors.component.html',
  styleUrls: ['./neighbors.component.scss']
})
export class NeighborsComponent implements OnInit {
  AdditionalFilterPage=false;
  additionalfilterflag=false;
  filterGroup = true;
  showFilter= true;
  newListGroup= true;
  newNeighborGroup= true;
  
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
  
  
  toggleFilterGroup(){
    this.filterGroup = !this.filterGroup;
  }

  toggleNewListGroup(){
    this.newListGroup = !this.newListGroup;
  }

  toggleNewNeighborGroup(){
    this.newNeighborGroup = !this.newNeighborGroup;
  }
  

  showSelectedFilter(){
this. showFilter= false;
  }

  
}
