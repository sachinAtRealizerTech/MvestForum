import { Component, OnInit } from '@angular/core';
import { DiscussiondetailsService } from './Services/discussiondetails.service';
import { ActivatedRoute } from '@angular/router';
import { DiscussionDetails } from '../../models/discussions'

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent implements OnInit {
  discussionId: string;
  //discussionDetails: DiscussionDetails[] = [];
  discussionDetails:any;
  discussionDetailsId: any;
  subCategoryId: any;
  showDate: any;
  searchText:any;
  commentBox=false;
  postCommentBox=false;
  public current_date = new Date();

  constructor(private discussiondetailsService: DiscussiondetailsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId']
      this.discussionId = params['discussionId'];
      this.discussionDetailsId = params['discussionDetailsId']
    });
    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  getDiscussionDeatils(id: string) {
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      this.discussionDetails = data;
      console.log(this.discussionDetails)
    })
  }

  showCommentBox(){
    this.commentBox=true
  }

  sendPost(){
  }

  postComment(){
    this.commentBox=false;
  }

  showPostCommentBox(){
    this.postCommentBox=true;
  }

  commentOnPost(){
  
    this.postCommentBox=false;
  }

  

}
