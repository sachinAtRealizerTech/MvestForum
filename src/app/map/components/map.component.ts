import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Map, LngLat, MapLayerMouseEvent } from 'mapbox-gl';
import { featureProperties } from '../models/featureProperties';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  selectedPoint: GeoJSON.Feature<GeoJSON.Point> | null;
  allLeases: string[] = [];
  allCounty: string[] = [];
  filterMenuVisiblity: boolean = false;
  cursorStyle = '';
  intrestNumber = '';
  countySearchText = '';
  layerId: string = 'xleases4-webmer-ceenzs'

  map: Map;
  constructor(private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {


  }

  onLoad(map: Map) {
    this.map = map;
    this.populateFilterData();
    this.map.on("mouseenter", this.layerId, (e: MapLayerMouseEvent) => {

      this.cursorStyle = 'pointer';
      //this.ChangeDetectorRef.detectChanges();
      // this.map.getCanvas().style.cursor = 'pointer';

    });

    this.map.on("mouseleave", this.layerId, (e: MapLayerMouseEvent) => {
      this.cursorStyle = '';
    });

    this.map.on("click", this.layerId, (e) => {
      this.selectedPoint = null;
      console.log(e)
      debugger;
      this.selectedPoint = (<any>e).features[0];
      this.ChangeDetectorRef.detectChanges();
      //console.log(this.selectedPoint.geometry.coordinates[0][0])
    })
  }

  claimLease() {
    if (this.intrestNumber) {
      alert(`Thanks for claiming lease!`)
    } else {
      alert(`Please inter valid interest to claim`);
    }
  }

  populateFilterData() {
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


  ngOnDestroy() {
    this.map = null;
  }
}
