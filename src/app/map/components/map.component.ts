import { Component, ChangeDetectorRef,OnInit, OnDestroy } from '@angular/core';
import { Map, LngLat, MapLayerMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  selectedPoint:GeoJSON.Feature<GeoJSON.Point> | null;
  filterMenu: boolean = false;
  cursorStyle='';
  map: Map;
  constructor( private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {


  }

  onLoad(map: Map) {
    this.map = map;

    this.map.on("mouseenter", "xleases4-webmer-ceenzs", (e: MapLayerMouseEvent) => {
    
      this.cursorStyle='pointer';
       //this.ChangeDetectorRef.detectChanges();
     // this.map.getCanvas().style.cursor = 'pointer';
      
    });

    this.map.on("mouseleave", "xleases4-webmer-ceenzs", (e: MapLayerMouseEvent) => {
      this.cursorStyle='';
    });

    this.map.on("click", "xleases4-webmer-ceenzs", (e) => {
      this.selectedPoint = null;
      console.log(e)
      debugger;
      this.selectedPoint = (<any>e).features[0];
      this.ChangeDetectorRef.detectChanges();
      //console.log(this.selectedPoint.geometry.coordinates[0][0])
    })
  }
  claimLease(){
    alert(`Thanks for claiming lease!`)
  }
  ngOnDestroy() {
    this.map = null;
  }
}
