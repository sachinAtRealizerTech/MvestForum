import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SubcategoryService } from './Services/subcategory.service';
import { ActivatedRoute } from '@angular/router'
import {SubCategoryList} from '../../models/discussions'
import { DiscussionsService } from './Services/discussions.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  //@ViewChild('fileInput',{static: false}) fileInput:ElementRef;
  //@Output() closeModalEvent = new EventEmitter<boolean>();

  //subCategoryList: SubCategoryList[]=[];
  subCategoryList:any
  subCategoryId: string;
  searchText:any;
  categoriesList:any;
  categoryId:string;
  subCategoryListDD:any;
  PostQuestionForm:FormGroup;
  submitQuestion:boolean;
  constructor(private subcategoryService: SubcategoryService, private route: ActivatedRoute,
    private discussionsService:DiscussionsService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.PostQuestionForm = this.formBuilder.group({
      CategoryName:['',Validators.required],
      subCategoryName:['',Validators.required],
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId'];
    });
    this.getSubcategory(this.subCategoryId);
    this.getAllcategoriesList();
  }

  get g() { return this.PostQuestionForm.controls; }

  getSubcategory(id) {
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data;
      console.log(this.subCategoryList)
    })
  }

  getAllcategoriesList(){
    this.discussionsService.getAllCategories().subscribe(data=>{
      this.categoriesList=data
    })
  }

  selectedCategory(event){
    debugger;
    this.categoryId=event.target.value
  }

  getSubcategoriesList(){
    this.subcategoryService.getSubcategory(this.categoryId).subscribe(data=>{
      this.subCategoryListDD=data
    })
  }

  postQuestion(){
    debugger;
    this.submitQuestion=true;
    if(this.PostQuestionForm.invalid){
      return
    }

    //this.closeModalEvent.emit(false);

    let body = {
      subCategoryId: this.PostQuestionForm.controls.subCategoryName.value,
      subcategory: this.PostQuestionForm.controls.CategoryName.value,
      post_title: this.PostQuestionForm.controls.discussionTitle.value,
      post_msg: this.PostQuestionForm.controls.problemDescription.value,
      post_type: "Q",
      post_by: "Atul",
      no_of_post: 0,
      likes: 0
    }
    this.subcategoryService.postQuestion(body)
  }

}
