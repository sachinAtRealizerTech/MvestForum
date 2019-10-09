import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DiscussionslistService} from './Services/discussionslist.service';
import {FormBuilder,FormGroup} from '@angular/forms'

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  discussionId:number;
  discussionList:any;
  subCategoryId:any;
  discussionListQuestionForm:FormGroup;
  showDate:any;

  constructor(private discussionlistService:DiscussionslistService,private route:ActivatedRoute,
    private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.discussionListQuestionForm=this.formBuilder.group({
      discussionTitle:[],
      problemDescription:[]
    })

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
      this.discussionList=data['data'][0];
      console.log(this.discussionList)
    })
}

postQuestion(){
  debugger;
  let body={
    subCategoryId:this.subCategoryId,
    subcategory:"karnes",
    post_title:this.discussionListQuestionForm.controls.discussionTitle.value,
    post_msg:this.discussionListQuestionForm.controls.problemDescription.value,
    post_type:"Q",
    post_by:"Atul",
    no_of_post:0,
    likes:0
  }
  this.discussionlistService.postQuestion(body).subscribe(data=>{
  })
}

}
