import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [MapComponent],
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
