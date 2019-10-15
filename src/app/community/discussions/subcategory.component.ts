import { Component, OnInit} from '@angular/core';
import { SubcategoryService } from './Services/subcategory.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title }     from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

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
  loading : boolean;
  pageNotFound=false;
  editorConfig:AngularEditorConfig;

  constructor(private subcategoryService: SubcategoryService, private route: ActivatedRoute,
    private formBuilder: FormBuilder,private titleService:Title) { }

  ngOnInit() {
    this.editorConfig = {
      editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
     // uploadUrl: 'v1/image',
      sanitize: true,
      toolbarPosition: 'top',
  };

    this.PostQuestionForm = this.formBuilder.group({
      subCategoryName:['',Validators.required],
      discussionTitle: ['',Validators.required],
      problemDescription: ['',Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId'];
    });
    this.getSubcategory(this.subCategoryId);
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  get g() { return this.PostQuestionForm.controls; }

  getSubcategory(id) {
    this.loading=true;
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data;
      this.loading=false;
      this.pageNotFound = false;
      this.categoryName=data['category_name'];
      this.categoryId=data['category_id'];
    },
    err => {
      if (err.status == 404) {
        this.loading = false;
        this.pageNotFound = true
      }
    })
  }

  getSubcategoriesList(){
    this.subcategoryService.getSubcategory(this.categoryId).subscribe(data=>{
      this.subCategoryListDD=data
    })
  }

  selectedSubCategory(event){
    this.subCategoryIdDD=event.target.value
    this.subCategoryName=event.target[event.target.selectedIndex].innerText
  }

  postQuestion(){
    this.submitQuestion=true;
    if(this.PostQuestionForm.invalid){
      return
    }
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
      alert('Question Posted successfully...');
      this.PostQuestionForm.reset();
    })
  }

//-----------------------------------passing parameters to create a new discussion----------------------------------
  sendData(subcat_id:any,subCatName:string,category_id:any,category_name:any){
      sessionStorage.setItem("subcat_id",subcat_id);
      sessionStorage.setItem("subCatName",subCatName);
      sessionStorage.setItem("category_id",category_id);
      sessionStorage.setItem("category_name",category_name);      
  }

}
