import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DiscussionsComponent } from './discussions/categories/components/discussions.component';
import { DiscussionsModule } from '../community/discussions/discussions.module';
//import { LoadingcircleComponent } from '../shared/loadingcircle/loadingcircle.component';
import { ImageCropperModule } from 'ngx-image-cropper';

// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GalleryModule } from '@ngx-gallery/core';
// import { MatButtonModule, MatToolbarModule } from '@angular/material';
// import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    //DiscussionsComponent,
    // LoadingcircleComponent

  ],
  imports: [
    CommonModule,
    DiscussionsModule,
    ImageCropperModule,

    // LightboxModule,
    // BrowserAnimationsModule,
    // GalleryModule,
    // MatButtonModule,
    // MatToolbarModule,
    // OverlayModule
  ],
  exports: [
    DiscussionsModule,
    ImageCropperModule,

    // LightboxModule,
    // BrowserAnimationsModule,
    // GalleryModule,
    // MatButtonModule,
    // MatToolbarModule,
    // OverlayModule
  ]
})
export class CommunityModule { }
