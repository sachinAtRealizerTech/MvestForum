import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DiscussionsComponent } from './discussions/categories/components/discussions.component';
import { DiscussionsModule } from '../community/discussions/discussions.module';
//import { LoadingcircleComponent } from '../shared/loadingcircle/loadingcircle.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  declarations: [
    //DiscussionsComponent,
    // LoadingcircleComponent
  ],
  imports: [
    CommonModule,
    DiscussionsModule,
    ImageCropperModule,
    AvatarModule
  ],
  exports: [
    DiscussionsModule,
    ImageCropperModule,
    AvatarModule
  ]
})
export class CommunityModule { }
