import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DiscussionslistService} from './Services/discussionslist.service';

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  discussionId:number;
  discussionList:any;
  subCategoryId:any;
  constructor(private discussionlistService:DiscussionslistService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.discussionId = params['discussionId'];
      this.subCategoryId=params['subCategoryId']
    });
    this.getDiscussionList(this.discussionId)
    console.log(this.discussionId)
  }

  getDiscussionList(id){
    debugger;
    this.discussionlistService.getAllDiscussionsList(id).subscribe(data=>{
      this.discussionList=data['data'];
      console.log(this.discussionList)
    })
}

}
