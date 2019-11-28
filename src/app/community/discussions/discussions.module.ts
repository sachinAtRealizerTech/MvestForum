import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubcategoryComponent } from './subcategories/components/subcategory.component';
import { DiscussionslistComponent } from './discussionlist/components/discussionslist.component';
import { DiscussionDetailsComponent } from './discussiondetails/components/discussion-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SummaryPipe } from 'src/app/shared/pipes/summary.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DiscussionsComponent } from './categories/components/discussions.component';
//import { DiscussionsComponent } from '../../../../discussions/categories/components/discussions.component';
import { LoadingcircleComponent } from '../../shared/loadingcircle/loadingcircle.component';
import { HighlightText } from 'src/app/shared/pipes/highlightText.pipe';
// import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [
    DiscussionsComponent,
    SubcategoryComponent,
    DiscussionslistComponent,
    DiscussionDetailsComponent,
    LoadingcircleComponent,
    TimeAgoPipe,
    SummaryPipe,
    HighlightText,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularEditorModule,
    // NgxEditorModule,
    FlashMessagesModule.forRoot(),
  ],
  exports: [
    Ng2SearchPipeModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularEditorModule,
    FlashMessagesModule,
    TimeAgoPipe,
    HighlightText,
    LoadingcircleComponent
    // NgxEditorModule
  ]
})
export class DiscussionsModule { }
