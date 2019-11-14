import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearbyleases',
  templateUrl: './nearbyleases.component.html',
  styleUrls: ['./nearbyleases.component.scss']
})
export class NearbyleasesComponent implements OnInit {
  filterGroup = true;
  constructor() { }

  ngOnInit() {
  }

  toggleFilterGroup(){
    this.filterGroup = !this.filterGroup;
  
  }

}
