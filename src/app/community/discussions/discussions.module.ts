import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeAgoPipe} from 'time-ago-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubcategoryComponent } from '../discussions/subcategory.component';
import { DiscussionslistComponent } from '../discussions/discussionslist.component';
import { DiscussionDetailsComponent } from '../discussions/discussion-details.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    SubcategoryComponent,
    DiscussionslistComponent,
    DiscussionDetailsComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DiscussionsModule { }
