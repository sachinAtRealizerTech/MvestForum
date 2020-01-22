import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  infoLngLat:any= [-96, 37.8]
  filterMenu:boolean=false;
  map:Map;
  constructor() { }

  ngOnInit() {
  }
  
  onLoad(map: Map) {
    console.log(map)
    this.map = map;

    const exists = this.map.getLayer('leases');

  }

  mapCliked(event){
    console.log(event)
  }
}
