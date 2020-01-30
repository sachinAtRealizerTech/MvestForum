import { Component, OnInit, Input } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'mgl-map-filter',
  templateUrl: './mgl-map-filter.component.html',
  styleUrls: ['./mgl-map-filter.component.scss']
})
export class MglMapFilterComponent implements OnInit {

  constructor() { }
  ngOnInit() {
      this.populateFilterData()
  }
  @Input() map: Map;
  @Input() layerId: string;

  filterMenuVisiblity: boolean = true;
  allLeases: string[] = [];
  allCounty: string[] = [];
  countySearchText = '';

  populateFilterData() {
    debugger;
    let allFeatures = this.map.queryRenderedFeatures(this.layerId);

    this.allLeases = allFeatures
      .map(p => p.properties.LEASE_NAME)
      .filter((value, index, self) => value && self.indexOf(value) === index)

    this.allCounty = allFeatures
      .map(p => p.properties.COUNTY)
      .filter((value, index, self) => value && self.indexOf(value) === index)
  }

  FilterByLease(leaseName) {
    leaseName != "0" ?
      this.map.setFilter(this.layerId, ["==", "LEASE_NAME", leaseName]) :
      this.map.setFilter(this.layerId, null);

    // debugger;
    // let filteredLease = this.map.queryRenderedFeatures(this.layerId,["==", "LEASE_NAME", leaseName]);
    // this.map.flyTo({
    //   center: [filteredLease],
    //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
    //   });
  }
}
