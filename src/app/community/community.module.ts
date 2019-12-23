import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DiscussionsComponent } from './discussions/categories/components/discussions.component';
import { DiscussionsModule } from '../community/discussions/discussions.module';
//import { LoadingcircleComponent } from '../shared/loadingcircle/loadingcircle.component';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    //DiscussionsComponent,
    // LoadingcircleComponent
  ],
  imports: [
    CommonModule,
    DiscussionsModule,
    ImageCropperModule,

  ],
  exports: [
    DiscussionsModule,
    ImageCropperModule,

  ]
})
export class CommunityModule { }
