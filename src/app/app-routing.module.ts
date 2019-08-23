import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PhotosComponent } from './photos/photos.component';


const routes: Routes = [
  { path: 'sign-in', 
  component: SignInComponent
}, 
  
{ path: 'profile', 
  component: ProfileComponent 
},
{ path: 'photos', 
  component: PhotosComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
