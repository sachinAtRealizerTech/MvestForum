import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOXTOKEN
    }),
  ]
})
export class MapModule { }
