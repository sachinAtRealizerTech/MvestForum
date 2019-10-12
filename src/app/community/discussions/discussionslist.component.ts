import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionslistService } from './Services/discussionslist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DiscussionsList,Discussions } from '../../models/discussions'

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  discussionId: string;
  discussionList:any;
  //discussionList: DiscussionsList[] = [];
  //Discussions:Discussions[]=[];
  subCategoryId: any;
  discussionListQuestionForm: FormGroup;
  showDate: any;
  searchText:any;
  categoryName:any;
  categoryId:any;
  subCategoryIdDD:any;
  subCategoryName:any;
  submitQuestion=false;


  constructor(private discussionlistService: DiscussionslistService, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.discussionListQuestionForm = this.formBuilder.group({
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.discussionId = params['discussionId'];
      this.subCategoryId = params['subCategoryId']
    });
    this.getDiscussionList(this.discussionId)
    console.log(this.discussionId)
  }

  get g() { return this.discussionListQuestionForm.controls; }

  getDiscussionList(id) {
    debugger;
    this.discussionlistService.getAllDiscussionsList(id).subscribe(data => {
      this.discussionList = data;
      // this.categoryName=data['category'];
      // this.categoryId=data['category_id'];
      // this.subCategoryIdDD=data['sub_category_id'];
      // this.subCategoryName=data['sub_category'];

      console.log('Discussion List: ', this.discussionList)
    })
  }

  postQuestion() {
    debugger;
    this.categoryName=sessionStorage.getItem("category_name");
    this.categoryId=sessionStorage.getItem("category_id");
    this.subCategoryIdDD=sessionStorage.getItem("subcat_id");
    this.subCategoryName=sessionStorage.getItem("subCatName");

    this.submitQuestion=true;
    if(this.discussionListQuestionForm.invalid){
      return
    }
    this.submitQuestion=false;
    let body = {
      category:this.categoryName,
      category_id: this.categoryId,

      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,

      post_title: this.discussionListQuestionForm.controls.discussionTitle.value,
      Desc: this.discussionListQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.discussionlistService.postQuestion(body).subscribe(data => {
      alert("Question Posted Successfully");
      this.getDiscussionList(this.discussionId);
    })
  }

}
