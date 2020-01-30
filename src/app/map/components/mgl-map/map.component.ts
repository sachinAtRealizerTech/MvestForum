import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Map, LngLat, MapLayerMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  selectedPoint: GeoJSON.Feature<GeoJSON.Point> | null;
  cursorStyle = '';
  layerId: string = 'xleases4-webmer-ceenzs'

  map: Map;
  isMapLoad = false;
  constructor(private ChangeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() { }

  onLoad(map: Map) {
    this.map = map;
    this.isMapLoad = true;
    this.map.on("mouseenter", this.layerId, (e: MapLayerMouseEvent) => {
      this.cursorStyle = 'pointer';
    });

    this.map.on("mouseleave", this.layerId, (e: MapLayerMouseEvent) => {
      this.cursorStyle = '';
    });

    this.map.on("click", this.layerId, (e) => {
      this.selectedPoint = null;
      this.selectedPoint = (<any>e).features[0];
      this.ChangeDetectorRef.detectChanges();
    })
  }

  ngOnDestroy() {
    this.map = null;
  }
}
