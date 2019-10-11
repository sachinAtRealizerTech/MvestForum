import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from './Services/discussions.service';
import { CategoryList } from '../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from './Services/subcategory.service';
//import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  categoryList: CategoryList[] = [];
  //categoryList:any
  searchText:any;
  PostQuestionForm:FormGroup;
  categoriesList:any;
  categoryId:any;
  subCategoryListDD:any;
  submitQuestion:boolean;
  // modalOptions:ModalOptions;
  // modalRef:BsModalRef

  constructor(private discussionsService: DiscussionsService,private formBuilder: FormBuilder,
    private subcategoryService:SubcategoryService, 
    //private modalService:BsModalService
    ) { }

  ngOnInit() {
    this.PostQuestionForm = this.formBuilder.group({
      CategoryName:['',Validators.required],
      subCategoryName:['',Validators.required],
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.getAllCategories();
    this.getAllcategoriesList();
  }

  get g() { return this.PostQuestionForm.controls; }

  getAllCategories() {
    this.discussionsService.getAllCategories().subscribe(data => {
      this.categoryList= data;
      console.log(this.categoryList);
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
    this.submitQuestion=true
    if(this.PostQuestionForm.invalid){
      return
    }
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
