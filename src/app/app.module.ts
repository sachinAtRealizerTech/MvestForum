import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ProfileComponent } from './community/profile/profile.component';
import { PhotosComponent } from './photos/photos.component';
import { RequestsComponent } from './community/requests/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/messages.component';
import { FollowingComponent } from './following/following.component';
import { MydiscussionsComponent } from './mydiscussions/mydiscussions.component';
import { NeighborsComponent } from './neighbors/neighbors.component';
import { CommunityComponent } from './community/community.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommunityModule } from './community/community.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NearbyleasesComponent } from './nearbyleases/nearbyleases.component';
import { NearbyneighborsComponent } from './nearbyneighbors/nearbyneighbors.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthenticationModule } from './authentication/authentication.module';
//import { LoadingcircleComponent } from './shared/loadingcircle/loadingcircle.component';
import { CanActivate } from '@angular/router'
import { AuthGuard } from './authentication/Components/guards/auth.guards';
import { SettingsComponent } from './settings/settings.component';
import { ArchivesComponent } from './archives/archives.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
//import { HighlightText } from './shared/pipes/highlightText.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    SigninLayoutComponent,
    SideNavComponent,
    TopNavComponent,
    ProfileComponent,
    PhotosComponent,
    RequestsComponent,
    NewsfeedComponent,
    MessagesComponent,
    FollowingComponent,
    MydiscussionsComponent,
    NeighborsComponent,
    CommunityComponent,
    DashboardComponent,
    ResetPasswordComponent,
    NearbyleasesComponent,
    NearbyneighborsComponent,
    MyaccountComponent,
    NotificationComponent,
    SettingsComponent,
    ArchivesComponent,
    SearchresultsComponent,
    // HighlightText
    //LoadingcircleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommunityModule,
    NgbModule,
    AuthenticationModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    [AuthGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
