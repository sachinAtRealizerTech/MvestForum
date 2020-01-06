import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/components/top-nav.component';
import { ProfileComponent } from './community/profile/components/profile.component';
import { PhotosComponent } from './photos/components/photos.component';
import { RequestsComponent } from './community/requests/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/messages/messages.component';
import { ScrollToBottomDirective } from './community/messages/ScrollToBottomDirective';
import { FollowingComponent } from './following/components/following.component';
import { MydiscussionsComponent } from './mydiscussions/components/mydiscussions.component';
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
import { SettingsComponent } from './settings/components/settings.component';
import { ArchivesComponent } from './archives/archives.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { ClickOutsideModule } from 'ng-click-outside';
//import { HighlightText } from './shared/pipes/highlightText.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookmarksComponent } from './bookmarks/components/bookmarks.component';
import { MvestUserComponent } from './mvest-user/mvest-user.component'; 
import { BlockedComponent } from './blocked/blocked.component';
import { MvestUserFollowingComponent } from './mvest-user-following/mvest-user-following.component';
import { MvestUserNeighborsComponent } from './mvest-user-neighbors/mvest-user-neighbors.component';
import { MvestUserPhotosComponent } from './mvest-user-photos/mvest-user-photos.component';

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
    ScrollToBottomDirective,
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
    BookmarksComponent,
    MvestUserComponent,
    MvestUserFollowingComponent,
    BlockedComponent,
    MvestUserNeighborsComponent,
    MvestUserPhotosComponent,
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
    AuthenticationModule,
    ClickOutsideModule,
    NgxPaginationModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    [AuthGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
