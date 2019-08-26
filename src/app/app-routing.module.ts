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
import { DiscussionsComponent } from './discussions/discussions.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';


const routes: Routes = [

  { path: 'sign-in', 
  component: SignInComponent
}, 
  
{ path: 'profile', 
  component: ProfileComponent 
},
{ path: 'photos', 
  component: PhotosComponent
},
{ path: 'requests', 
  component: RequestsComponent
},
{ path: 'newsfeed', 
  component: NewsfeedComponent
},
{ path: 'messages', 
  component: MessagesComponent
},
{ path: 'following', 
  component: FollowingComponent
},
{ path: 'mydiscussions', 
  component: MydiscussionsComponent
},
{ path: 'discussions', 
  component: DiscussionsComponent
},
{ path: 'subcategory', 
  component: SubcategoryComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
