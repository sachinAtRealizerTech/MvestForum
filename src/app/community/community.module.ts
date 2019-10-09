import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionsComponent } from '../community/discussions/discussions.component';
import { DiscussionsModule } from '../community/discussions/discussions.module';


@NgModule({
  declarations: [
    DiscussionsComponent
  ],
  imports: [
    CommonModule,
    DiscussionsModule
  ],
  exports: [
    DiscussionsModule
  ]
})
export class CommunityModule { }
