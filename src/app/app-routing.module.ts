import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ProfileComponent } from './community/profile/components/profile.component';
import { SignInComponent } from './authentication/sign-in/components/sign-in.component';
import { PhotosComponent } from './community/photos/components/photos.component';
import { RequestsComponent } from './myaccount/requests/components/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/components/messages.component';
import { FollowingComponent } from './community/following/components/following.component';
import { MydiscussionsComponent } from './community/mydiscussions/components/mydiscussions.component';
import { DiscussionsComponent } from './community/discussions/categories/components/discussions.component';
import { SubcategoryComponent } from './community/discussions/subcategories/components/subcategory.component';
import { DiscussionslistComponent } from './community/discussions/discussionlist/components/discussionslist.component';
import { DiscussionDetailsComponent } from './community/discussions/discussiondetails/components/discussion-details.component';
import { NeighborsComponent } from './neighbors/components/neighbors.component';
import { CommunityComponent } from './community/components/community.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SignupComponent } from './authentication/signup/components/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './authentication/reset-password/components/reset-password.component';
import { NearbyleasesComponent } from './neighbors/nearbyleases/components/nearbyleases.component';
import { NearbyneighborsComponent } from './neighbors/nearbyneighbors/components/nearbyneighbors.component';
import { MyaccountComponent } from './myaccount/components/myaccount.component';
import { ConfirmemailComponent } from './authentication/confirmemail/confirmemail.component';
import { NotificationComponent } from './myaccount/notification/components/notification.component';
import { AuthGuard } from './authentication/Components/guards/auth.guards';
import { SettingsComponent } from './myaccount/settings/components/settings.component';
import { SearchresultsComponent } from './searchresults/components/searchresults.component';
import { MvestUserComponent } from './mvest-user-profile/mvest-user/components/mvest-user.component';
import { MvestUserFollowingComponent } from './mvest-user-profile/mvest-user-following/components/mvest-user-following.component';
import { MvestUserNeighborsComponent } from './mvest-user-profile/mvest-user-neighbors/components/mvest-user-neighbors.component';
import { MvestUserPhotosComponent } from './mvest-user-profile/mvest-user-photos/components/mvest-user-photos.component';
import { MvestUserProfileComponent } from './mvest-user-profile/components/mvest-user-profile.component';
import { BookmarksComponent } from './community/bookmarks/components/bookmarks.component';
import { AddeddiscussionlistComponent } from './community/mydiscussions/addeddiscussionlist/components/addeddiscussionlist.component';
import { FieldReportsComponent } from './field-reports/field-reports.component';
import { LeaseReportComponent } from './lease-report/lease-report.component';
import { MapComponent } from './map/components/map.component';

const routes: Routes = [

  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirmemail', component: ConfirmemailComponent },
  // {
  //   path: '',
  //   component: SigninLayoutComponent,
  //   //pathMatch: 'full',
  //   children: [
  //     {
  //       path: 'signup',
  //       component: SignupComponent
  //     },
  //     {
  //       path: 'signin',
  //       component: SignInComponent
  //     }
  //   ]
  // },


  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'requests',
        component: RequestsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'newsfeed',
        component: NewsfeedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'discussions',
        component: DiscussionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'subcategory',
        component: SubcategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'discussionslist',
        component: DiscussionslistComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'discussion-details',
        component: DiscussionDetailsComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'myaccount',
        component: MyaccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        component: NotificationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'searchresults',
        component: SearchresultsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'field-reports',
        component: FieldReportsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'lease-report',
        component: LeaseReportComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'map',
        component: MapComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'community',
        component: CommunityComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'profile',
            component: ProfileComponent,

          },
          {
            path: 'bookmarks',
            component: BookmarksComponent,

          },
          {
            path: 'nearbyleases',
            component: NearbyleasesComponent,

          },
          {
            path: 'nearbyneighbors',
            component: NearbyneighborsComponent,

          },
          {
            path: 'neighbors',
            component: NeighborsComponent,

          },
          {
            path: 'following',
            component: FollowingComponent,

          },
          {
            path: 'mydiscussions',
            component: MydiscussionsComponent,
          },
          {
            path: 'addedDiscussionsList',
            component: AddeddiscussionlistComponent,
          },
          {
            path: 'photos',
            component: PhotosComponent,
          }
        ]
      },

      {
        path: 'mvest-user-profile',
        component: MvestUserProfileComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'mvest-user',
            component: MvestUserComponent,
          },
          {
            path: 'mvest-user-following',
            component: MvestUserFollowingComponent,
          },
          {
            path: 'mvest-user-neighbors',
            component: MvestUserNeighborsComponent,
          },
          {
            path: 'mvest-user-photos',
            component: MvestUserPhotosComponent,
          },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
