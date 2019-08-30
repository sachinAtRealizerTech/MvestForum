import { Component, OnInit } from '@angular/core'
import { SubcategoryService } from '../subcategory/subcategory.service'
import { DiscussionlistService } from './discussionlist.service'
import { Discussion,DiscussionList,post } from '../models/discussion'
import {TimeAgoPipe} from 'time-ago-pipe';

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  subcategoryName: string;
discussionList:any;
post:post;

  constructor(private subcategoryService: SubcategoryService, private discussionlistService: DiscussionlistService) { }

  ngOnInit() {
    this.subcategoryName = this.subcategoryService.SelectedSuBcategory;
    this.getDiscussionList();
  }


  getDiscussionList() {
    debugger;
    this.discussionlistService.getDiscussionList(this.subcategoryName).subscribe(res => {
     this.discussionList =res;
    this.post=res[0].Posts;

    })
  }

}
