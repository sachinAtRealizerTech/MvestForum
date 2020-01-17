import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DiscussionsComponent } from './discussions/categories/components/discussions.component';
import { DiscussionsModule } from '../community/discussions/discussions.module';
//import { LoadingcircleComponent } from '../shared/loadingcircle/loadingcircle.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AddeddiscussionlistComponent } from './mydiscussions/addeddiscussionlist/components/addeddiscussionlist.component';
import { MydiscussionsComponent } from './mydiscussions/components/mydiscussions.component';
import { ProfileComponent } from './profile/components/profile.component';
import { PhotosComponent } from './photos/components/photos.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FollowingComponent } from './following/components/following.component';
import { NeighborsComponent } from '../neighbors/components/neighbors.component';
import { CommunityComponent } from './components/community.component';
import { NearbyleasesComponent } from '../neighbors/nearbyleases/components/nearbyleases.component';
import { NearbyneighborsComponent } from '../neighbors/nearbyneighbors/components/nearbyneighbors.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MvestUserComponent } from '../mvest-user-profile/mvest-user/components/mvest-user.component';
import { MvestUserFollowingComponent } from '../mvest-user-profile/mvest-user-following/components/mvest-user-following.component';
import { MvestUserNeighborsComponent } from '../mvest-user-profile/mvest-user-neighbors/components/mvest-user-neighbors.component';
import { MvestUserProfileComponent } from '../mvest-user-profile/components/mvest-user-profile.component';
import { MvestUserPhotosComponent } from '../mvest-user-profile/mvest-user-photos/components/mvest-user-photos.component';

// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { GalleryModule } from '@ngx-gallery/core';
// import { MatButtonModule, MatToolbarModule } from '@angular/material';
// import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    //DiscussionsComponent,
    // LoadingcircleComponent
    MydiscussionsComponent,
    AddeddiscussionlistComponent,
    ProfileComponent,
    PhotosComponent,
    NewsfeedComponent,
    FollowingComponent,
    NeighborsComponent,
    CommunityComponent,
    NearbyleasesComponent,
    NearbyneighborsComponent,
    MvestUserComponent,
    MvestUserFollowingComponent,
    MvestUserNeighborsComponent,
    MvestUserPhotosComponent,
    MvestUserProfileComponent,
  ],
  imports: [
    CommonModule,
    DiscussionsModule,
    ImageCropperModule,
    NgxPaginationModule,


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
    NgxPaginationModule
    // LightboxModule,
    // BrowserAnimationsModule,
    // GalleryModule,
    // MatButtonModule,
    // MatToolbarModule,
    // OverlayModule
  ]
})
export class CommunityModule { }
