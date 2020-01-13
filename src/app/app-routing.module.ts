import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ProfileComponent } from './community/profile/components/profile.component';
import { SignInComponent } from './authentication/sign-in/components/sign-in.component';
import { PhotosComponent } from './photos/components/photos.component';
import { RequestsComponent } from './community/requests/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/messages/messages.component';
import { FollowingComponent } from './following/components/following.component';
import { MydiscussionsComponent } from './mydiscussions/components/mydiscussions.component';
import { DiscussionsComponent } from './community/discussions/categories/components/discussions.component';
import { SubcategoryComponent } from './community/discussions/subcategories/components/subcategory.component';
import { DiscussionslistComponent } from './community/discussions/discussionlist/components/discussionslist.component';
import { DiscussionDetailsComponent } from './community/discussions/discussiondetails/components/discussion-details.component';
import { NeighborsComponent } from './neighbors/components/neighbors.component';
import { CommunityComponent } from './community/community.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SignupComponent } from './authentication/signup/components/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/components/reset-password.component';
import { NearbyleasesComponent } from './nearbyleases/nearbyleases.component';
import { NearbyneighborsComponent } from './nearbyneighbors/nearbyneighbors.component';
import { MyaccountComponent } from './myaccount/components/myaccount.component';
import { ConfirmemailComponent } from './authentication/confirmemail/confirmemail.component';
import { NotificationComponent } from './notification/components/notification.component';
import { AuthGuard } from './authentication/Components/guards/auth.guards';
import { SettingsComponent } from './settings/components/settings.component';
import { ArchivesComponent } from './archives/archives.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { BookmarksComponent } from './bookmarks/components/bookmarks.component';
import { MvestUserComponent } from './mvest-user/components/mvest-user.component';
import { BlockedComponent } from './blocked/blocked.component';
import { MvestUserFollowingComponent } from './mvest-user-following/components/mvest-user-following.component';
import { MvestUserNeighborsComponent } from './mvest-user-neighbors/components/mvest-user-neighbors.component';
import { MvestUserPhotosComponent } from './mvest-user-photos/components/mvest-user-photos.component';
import { MvestUserProfileComponent } from './mvest-user-profile/components/mvest-user-profile.component';

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
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      //   canActivate: [AuthGuard]
      // },

      // {
      //   path: 'photos',
      //   component: PhotosComponent,
      //   canActivate: [AuthGuard]
      // },
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
      // {
      //   path: 'following',
      //   component: FollowingComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'mydiscussions',
      //   component: MydiscussionsComponent,
      //   canActivate: [AuthGuard]
      // },
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
      // {
      //   path: 'neighbors',
      //   component: NeighborsComponent,
      //   canActivate: [AuthGuard]

      // },
      // {
      //   path: 'community',
      //   component: CommunityComponent,
      //   canActivate: [AuthGuard]

      // },
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
      // {
      //   path: 'nearbyleases',
      //   component: NearbyleasesComponent,
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'nearbyneighbors',
      //   component: NearbyneighborsComponent,
      //   canActivate: [AuthGuard]
      // },
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
        path: 'archives',
        component: ArchivesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'searchresults',
        component: SearchresultsComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'bookmarks',
      //   component: BookmarksComponent,
      //   canActivate: [AuthGuard]
      // },


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



















  //////////////////////////////////////

  // {
  //   path: '',
  //   component: SignupComponent,
  //   pathMatch: 'full',
  //   children: [
  //     {
  //       path: 'signup',
  //       component: SignupComponent
  //     }
  //   ]
  // },




  // {
  //   path: '',
  //   component: HomeLayoutComponent,
  //   children: [
  //     {
  //       path: 'profile',
  //       component: ProfileComponent
  //     },

  //     {
  //       path: 'photos',
  //       component: PhotosComponent
  //     },
  //     {
  //       path: 'requests',
  //       component: RequestsComponent
  //     },
  //     {
  //       path: 'newsfeed',
  //       component: NewsfeedComponent
  //     },
  //     {
  //       path: 'messages',
  //       component: MessagesComponent
  //     },
  //     {
  //       path: 'following',
  //       component: FollowingComponent
  //     },
  //     {
  //       path: 'mydiscussions',
  //       component: MydiscussionsComponent
  //     },
  //     {
  //       path: 'discussions',
  //       component: DiscussionsComponent
  //     },
  //     {
  //       path: 'subcategory',
  //       component: SubcategoryComponent
  //     },
  //     {
  //       path: 'discussionslist',
  //       component: DiscussionslistComponent

  //     },
  //     {
  //       path: 'discussion-details',
  //       component: DiscussionDetailsComponent

  //     },
  //     {
  //       path: 'neighbors',
  //       component: NeighborsComponent

  //     },
  //     {
  //       path: 'community',
  //       component: CommunityComponent

  //     },
  //     {
  //       path: 'signup',
  //       component: SignupComponent
  //     }

  //   ]
  // }


  // {
  //   path:'',
  //   component: SigninLayoutComponent,
  //   pathMatch: 'full',
  //   children: [
  //     {
  //       path: '',
  //       component: SignInComponent
  //     }
  //   ]   
  // },

  // {
  //   path: '',
  //   component: HomeLayoutComponent,
  //   children: [
  //     {
  //       path: 'profile',
  //       component: ProfileComponent
  //     },

  //     {
  //       path: 'photos',
  //       component: PhotosComponent
  //     },
  //     {
  //       path: 'requests',
  //       component: RequestsComponent
  //     },
  //     {
  //       path: 'newsfeed',
  //       component: NewsfeedComponent
  //     },
  //     {
  //       path: 'messages',
  //       component: MessagesComponent
  //     },
  //     {
  //       path: 'following',
  //       component: FollowingComponent
  //     },
  //     {
  //       path: 'mydiscussions',
  //       component: MydiscussionsComponent
  //     },
  //     {
  //       path: 'discussions',
  //       component: DiscussionsComponent
  //     },
  //     {
  //       path: 'subcategory',
  //       component: SubcategoryComponent
  //     },
  //     {
  //       path: 'discussionslist',
  //       component: DiscussionslistComponent

  //     },
  //     {
  //       path: 'discussion-details',
  //       component: DiscussionDetailsComponent

  //     },
  //     {
  //       path: 'neighbors',
  //       component: NeighborsComponent

  //     },
  //     {
  //       path: 'community',
  //       component: CommunityComponent

  //     },
  //   ]
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
