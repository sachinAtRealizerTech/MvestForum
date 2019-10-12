import { Component, OnInit } from '@angular/core';
import { DiscussiondetailsService } from './Services/discussiondetails.service';
import { ActivatedRoute } from '@angular/router';
import { DiscussionDetails } from '../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  replyForm:FormGroup;
  discussiondoc_Id:any;
  submitReply=false;

  constructor(private discussiondetailsService: DiscussiondetailsService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.replyForm= this.formBuilder.group({
      Description: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId']
      this.discussionId = params['discussionId'];
      this.discussionDetailsId = params['discussionDetailsId']
    });
    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  get g() { return this.replyForm.controls; }

  getDiscussionDeatils(id: string) {
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      this.discussionDetails = data;
      this.discussiondoc_Id= data['_id']
      console.log(this.discussionDetails)
    })
  }

  showCommentBox(){
    this.commentBox=true
  }

  sendReply(){
    debugger;
    this.submitReply=true;
    if(this.replyForm.invalid){
      return;
    }
   
    let body={
      userName: "Atul",
      Desc: this.replyForm.controls.Description.value,
      discussiondoc_Id:this.discussiondoc_Id
    }

    this.discussiondetailsService.sendReply(body).subscribe(data=>{
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.submitReply=false;
    })
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
