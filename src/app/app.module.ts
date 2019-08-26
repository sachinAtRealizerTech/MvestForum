import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { DiscussionslistComponent } from './discussionslist/discussionslist.component';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';

@NgModule({
  declarations: [
    AppComponent,
    
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
    SubcategoryComponent,
    DiscussionslistComponent,
    DiscussionDetailsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
