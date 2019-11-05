import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './community/profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PhotosComponent } from './photos/photos.component';
import { RequestsComponent } from './community/requests/requests.component';
import { NewsfeedComponent } from './community/newsfeed/newsfeed.component';
import { MessagesComponent } from './community/messages/messages.component';
import { FollowingComponent } from './following/following.component';
import { MydiscussionsComponent } from './mydiscussions/mydiscussions.component';
import { DiscussionsComponent } from './community/discussions/categories/components/discussions.component';
import { SubcategoryComponent } from './community/discussions/subcategories/components/subcategory.component';
import { DiscussionslistComponent } from './community/discussions/discussionlist/components/discussionslist.component';
import { DiscussionDetailsComponent } from './community/discussions/discussiondetails/components/discussion-details.component';
import { NeighborsComponent } from './neighbors/neighbors.component';
import { CommunityComponent } from './community/community.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [

  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SignInComponent },

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
        path: 'profile',
        component: ProfileComponent
      },

      {
        path: 'photos',
        component: PhotosComponent
      },
      {
        path: 'requests',
        component: RequestsComponent
      },
      {
        path: 'newsfeed',
        component: NewsfeedComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      },
      {
        path: 'mydiscussions',
        component: MydiscussionsComponent
      },
      {
        path: 'discussions',
        component: DiscussionsComponent
      },
      {
        path: 'subcategory',
        component: SubcategoryComponent
      },
      {
        path: 'discussionslist',
        component: DiscussionslistComponent

      },
      {
        path: 'discussion-details',
        component: DiscussionDetailsComponent

      },
      {
        path: 'neighbors',
        component: NeighborsComponent

      },
      {
        path: 'community',
        component: CommunityComponent

      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }

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
  imports: [RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
