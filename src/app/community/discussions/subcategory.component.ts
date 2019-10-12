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
  categoryName:any;
  subCategoryIdDD:any;
  subCategoryName:any;

  constructor(private subcategoryService: SubcategoryService, private route: ActivatedRoute,
    private discussionsService:DiscussionsService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.PostQuestionForm = this.formBuilder.group({
      subCategoryName:['',Validators.required],
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId'];
    });
    this.getSubcategory(this.subCategoryId);
   
    //this.getAllcategoriesList();
  }

  get g() { return this.PostQuestionForm.controls; }

  getSubcategory(id) {
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data;
      this.categoryName=data['category_name'];
      this.categoryId=data['category_id'];
      console.log(this.subCategoryList)
      console.log(this.categoryId);
    })
  }

  // getAllcategoriesList(){
  //   this.discussionsService.getAllCategories().subscribe(data=>{
  //     this.categoriesList=data['']
  //   })
  // }

  // getSubcategoryList(id){
  //   this.subcategoryService.getSubcategory(id).subscribe(data => {
  //     this.subCategoryList = data;
  //     console.log(this.subCategoryList)
  //   })
  // }

  // selectedCategory(event){
  //   debugger;
  //   this.categoryId=event.target.value
  // }

  getSubcategoriesList(){
    this.subcategoryService.getSubcategory(this.categoryId).subscribe(data=>{
      this.subCategoryListDD=data
    })
  }

  selectedSubCategory(event){
    debugger;
    this.subCategoryIdDD=event.target.value
    this.subCategoryName=event.target[event.target.selectedIndex].innerText
    console.log(this.subCategoryName)
  }

  postQuestion(){
    debugger;
    this.submitQuestion=true;
    if(this.PostQuestionForm.invalid){
      return
    }

    //this.closeModalEvent.emit(false);
    this.submitQuestion=false;
    let body = {
      category:this.categoryName,
      category_id: this.categoryId,

      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,

      post_title: this.PostQuestionForm.controls.discussionTitle.value,
      Desc: this.PostQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.subcategoryService.postQuestion(body).subscribe(data=>{
      alert('Data inserted successfully')
    })
  }


  sendData(subcat_id:any,subCatName:string,category_id:any,category_name:any){
      //this.subcategoryService.sendData(subcat_id,subCatName,category_id,category_name)
      sessionStorage.setItem("subcat_id",subcat_id);
      sessionStorage.setItem("subCatName",subCatName);
      sessionStorage.setItem("category_id",category_id);
      sessionStorage.setItem("category_name",category_name);
      
  }

}
