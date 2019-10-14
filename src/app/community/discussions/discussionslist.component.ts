import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionslistService } from './Services/discussionslist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  discussionId: string;
  discussionList: any;
  subCategoryId: any;
  discussionListQuestionForm: FormGroup;
  showDate: any;
  searchText: any;
  categoryName: any;
  categoryId: any;
  subCategoryIdDD: any;
  subCategoryName: any;
  submitQuestion = false;
  loading: boolean;
  readMore: boolean = false;
  pageNotFound = false;

  constructor(private discussionlistService: DiscussionslistService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private titleService: Title) { }

  ngOnInit() {
    this.discussionListQuestionForm = this.formBuilder.group({
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.discussionId = params['discussionId'];
      this.subCategoryId = params['subCategoryId']
    });
    this.getDiscussionList(this.discussionId)
    console.log(this.discussionId)
  }

  get g() { return this.discussionListQuestionForm.controls; }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getDiscussionList(id) {
    debugger;
    this.loading = true;
    //  setTimeout(() => {
    //   this.loading = false;
    // }, 2000)
    this.discussionlistService.getAllDiscussionsList(id).subscribe(data => {
      this.discussionList = data;
      this.loading = false;
      this.pageNotFound = false;
      console.log('Discussion List: ', this.discussionList)
    },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.pageNotFound = true
        }
      }
    )
  }

  postQuestion() {
    debugger;
    this.categoryName = sessionStorage.getItem("category_name");
    this.categoryId = sessionStorage.getItem("category_id");
    this.subCategoryIdDD = sessionStorage.getItem("subcat_id");
    this.subCategoryName = sessionStorage.getItem("subCatName");

    this.submitQuestion = true;
    if (this.discussionListQuestionForm.invalid) {
      return
    }
    this.submitQuestion = false;
    let body = {
      category: this.categoryName,
      category_id: this.categoryId,

      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,

      post_title: this.discussionListQuestionForm.controls.discussionTitle.value,
      Desc: this.discussionListQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.discussionlistService.postQuestion(body).subscribe(data => {
      alert("Question Posted Successfully");
      this.discussionListQuestionForm.reset();
      this.getDiscussionList(this.discussionId);
    })
  }

  readMoreDescription() {
    this.readMore = true
  }

}
