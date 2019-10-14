import { Component, OnInit } from '@angular/core';
import { DiscussiondetailsService } from './Services/discussiondetails.service';
import { ActivatedRoute } from '@angular/router';
import { DiscussionDetails } from '../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title }     from '@angular/platform-browser';

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
  discussionDetailsQuestionForm:FormGroup;
  categoryName:any;
  categoryId:any;
  subCategoryIdDD:any;
  subCategoryName:any;
  submitQuestion=false;
  loading:boolean;

  constructor(private discussiondetailsService: DiscussiondetailsService, private route: ActivatedRoute,
    private formBuilder: FormBuilder,private titleService: Title) { }

  ngOnInit() {
    this.replyForm= this.formBuilder.group({
      Description: ['',Validators.required]
    })

    this.discussionDetailsQuestionForm=this.formBuilder.group({
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId']
      this.discussionId = params['discussionId'];
      this.discussionDetailsId = params['discussionDetailsId']
    });
    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  get g() { return this.replyForm.controls; }

  get f() { return this.discussionDetailsQuestionForm.controls; }

  getDiscussionDeatils(id: string) {
    this.loading=true;
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      this.discussionDetails = data;
      this.loading=false;
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
      this.replyForm.reset();
    })
  }


  postQuestion() {
    debugger;
    this.categoryName=sessionStorage.getItem("category_name");
    this.categoryId=sessionStorage.getItem("category_id");
    this.subCategoryIdDD=sessionStorage.getItem("subcat_id");
    this.subCategoryName=sessionStorage.getItem("subCatName");

    this.submitQuestion=true;
    if(this.discussionDetailsQuestionForm.invalid){
      return
    }
    this.submitQuestion=false;
    let body = {
      category:this.categoryName,
      category_id: this.categoryId,

      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,

      post_title: this.discussionDetailsQuestionForm.controls.discussionTitle.value,
      Desc: this.discussionDetailsQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.discussiondetailsService.postQuestion(body).subscribe(data => {
      alert("Question Posted Successfully");
      this.discussionDetailsQuestionForm.reset();
      this.getDiscussionDeatils(this.discussionDetailsId);
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
