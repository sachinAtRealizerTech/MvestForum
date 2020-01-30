import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/mgl-map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MglPopupComponent } from './components/mgl-popup/mgl-popup.component';
import { MglMapFilterComponent } from './components/mgl-map-filter/mgl-map-filter.component';



@NgModule({
  declarations: [MapComponent, MglPopupComponent, MglMapFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOXTOKEN
    }),
  ]
})
export class MapModule { }
