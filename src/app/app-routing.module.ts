import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PhotosComponent } from './photos/photos.component';
import { RequestsComponent } from './requests/requests.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MessagesComponent } from './messages/messages.component';
import { FollowingComponent } from './following/following.component';
import { MydiscussionsComponent } from './mydiscussions/mydiscussions.component';
import { DiscussionsComponent } from './community/discussions/discussions.component';
import { SubcategoryComponent } from './community/discussions/subcategory.component';
import { DiscussionslistComponent } from './community/discussions/discussionslist.component';
import { DiscussionDetailsComponent } from './community/discussions/discussion-details.component';
import { NeighborsComponent } from './neighbors/neighbors.component';
import { CommunityComponent } from './community/community.component';
//import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';


const routes: Routes = [
    
  {
      path: '',
      component: HomeLayoutComponent,
      children:[
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

      ]
    }


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
