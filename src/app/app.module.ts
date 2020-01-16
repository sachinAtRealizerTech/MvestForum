import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/components/side-nav.component';
import { TopNavComponent } from './top-nav/components/top-nav.component';
import { ProfileComponent } from './community/profile/components/profile.component';
import { PhotosComponent } from './community/photos/components/photos.component';
import { RequestsComponent } from './myaccount/requests/components/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/messages/messages.component';
import { ScrollToBottomDirective } from './community/messages/ScrollToBottomDirective';
import { FollowingComponent } from './community/following/components/following.component';
import { NeighborsComponent } from './neighbors/components/neighbors.component';
import { CommunityComponent } from './community/components/community.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommunityModule } from './community/community.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './authentication/reset-password/components/reset-password.component';
import { NearbyleasesComponent } from './neighbors/nearbyleases/components/nearbyleases.component';
import { NearbyneighborsComponent } from './neighbors/nearbyneighbors/components/nearbyneighbors.component';
import { MyaccountComponent } from './myaccount/components/myaccount.component';
import { NotificationComponent } from './myaccount/notification/components/notification.component';
import { AuthenticationModule } from './authentication/authentication.module';
//import { LoadingcircleComponent } from './shared/loadingcircle/loadingcircle.component';
import { CanActivate } from '@angular/router'
import { AuthGuard } from './authentication/Components/guards/auth.guards';
import { SettingsComponent } from './myaccount/settings/components/settings.component';
import { SearchresultsComponent } from './searchresults/components/searchresults.component';
import { ClickOutsideModule } from 'ng-click-outside';
//import { HighlightText } from './shared/pipes/highlightText.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MvestUserComponent } from './mvest-user-profile/mvest-user/components/mvest-user.component';
import { MvestUserFollowingComponent } from './mvest-user-profile/mvest-user-following/components/mvest-user-following.component';
import { MvestUserNeighborsComponent } from './mvest-user-profile/mvest-user-neighbors/components/mvest-user-neighbors.component';
import { MvestUserPhotosComponent } from './mvest-user-profile/mvest-user-photos/components/mvest-user-photos.component';
import { MvestUserProfileComponent } from './mvest-user-profile/components/mvest-user-profile.component';
import { BookmarksComponent } from './community/bookmarks/components/bookmarks.component';
import { CustomDatePipe } from './community/messages/custom.datepipe';

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
    NeighborsComponent,
    CommunityComponent,
    DashboardComponent,
    ResetPasswordComponent,
    NearbyleasesComponent,
    NearbyneighborsComponent,
    MyaccountComponent,
    NotificationComponent,
    SettingsComponent,
    SearchresultsComponent,
    BookmarksComponent,
    MvestUserComponent,
    MvestUserFollowingComponent,
    MvestUserNeighborsComponent,
    MvestUserPhotosComponent,
    MvestUserProfileComponent,
    CustomDatePipe
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
