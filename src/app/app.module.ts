import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PhotosComponent } from './photos/photos.component';
import { RequestsComponent } from './requests/requests.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import{ MessagesComponent } from './messages/messages.component';
import { FollowingComponent } from './following/following.component';
import { MydiscussionsComponent } from './mydiscussions/mydiscussions.component';
import { DiscussionsComponent } from './discussions/discussions.component';
// import { SubcategoryComponent } from './discussions/subcategory.component';
// import { DiscussionslistComponent } from './discussions/discussionslist.component';
// import { DiscussionDetailsComponent } from './discussions/discussion-details.component';
import { NeighborsComponent } from './neighbors/neighbors.component';
import { CommunityComponent } from './community/community.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
//import {TimeAgoPipe} from 'time-ago-pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DiscussionsModule } from './discussions/discussions.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    SigninLayoutComponent,
    
    SideNavComponent,
    TopNavComponent,
    ProfileComponent,
    SignInComponent,
    PhotosComponent,
    RequestsComponent,
    NewsfeedComponent,
    MessagesComponent,
    FollowingComponent,
    MydiscussionsComponent,
    DiscussionsComponent,
    // SubcategoryComponent,
    // DiscussionslistComponent,
    // DiscussionDetailsComponent,
    NeighborsComponent,
    CommunityComponent,
    //TimeAgoPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //Ng2SearchPipeModule,
    DiscussionsModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
