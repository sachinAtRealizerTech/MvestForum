import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from './Services/discussions.service';
import { CategoryList } from '../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from './Services/subcategory.service';
import {Router} from '@angular/router';
//import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Title }     from '@angular/platform-browser';

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
  subCategoryId:any;
  categoryName:string;
  subCategoryName:string;
  categoryDocId:any;
  loading : boolean;
  pageNotFound=false;
  // modalOptions:ModalOptions;
  // modalRef:BsModalRef

  constructor(private discussionsService: DiscussionsService,private formBuilder: FormBuilder,
    private subcategoryService:SubcategoryService, private router:Router,private titleService: Title
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

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  get g() { return this.PostQuestionForm.controls; }

  getAllCategories() {
    this.loading=true;
    // setTimeout(() => {
    //   this.loading = false;
    // }, 2000)

    this.discussionsService.getAllCategories().subscribe(data => {    
      this.categoryList= data;
      this.loading=false; 
      this.pageNotFound = false;
    },
    err => {
      if (err.status == 404) {
        this.loading = false;
        this.pageNotFound = true
      }
    })
  }

  getAllcategoriesList(){
    this.discussionsService.getAllCategories().subscribe(data=>{
      this.categoriesList=data;

    })
  }

  selectedCategory(event){
    this.categoryDocId=event.target.value
    this.categoryName=event.target[event.target.selectedIndex].innerText
  }

  selectedSubCategory(event){
    this.subCategoryId=event.target.value
    this.subCategoryName=event.target[event.target.selectedIndex].innerText
  }

  getSubcategoriesList(){
    this.subcategoryService.getSubcategory(this.categoryDocId).subscribe(data=>{
      this.subCategoryListDD=data;
      this.categoryId=data['category_id'];
    })
  }

  postQuestion(){
    this.submitQuestion=true
    if(this.PostQuestionForm.invalid){
      return
    }
    this.submitQuestion=false
    let body = {
      //category: this.PostQuestionForm.controls.CategoryName.value,
      category:this.categoryName,
      category_id: this.categoryId,

      subcategory_id: this.subCategoryId,
      subcategory: this.subCategoryName,

      post_title: this.PostQuestionForm.controls.discussionTitle.value,
      Desc: this.PostQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.discussionsService.postQuestion(body).subscribe(data=>{
      alert("Question Posted Successfully...");
      this.PostQuestionForm.reset();
      //this.router.navigate(['../discussionslist', { discussionId: crisis.id, subCategoryId: ,foo: 'foo' }], { relativeTo: this.route });
    })

    
  }

}
