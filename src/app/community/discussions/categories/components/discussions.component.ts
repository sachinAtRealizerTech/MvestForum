import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from '../services/discussions.service';
import { CategoryList } from '../../../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '../../subcategories/Services/subcategory.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private discussionsService: DiscussionsService, private formBuilder: FormBuilder,
    private subcategoryService: SubcategoryService, private router: Router, private titleService: Title) { }

  postQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  categoryList: CategoryList[] = [];
  searchText: any;
  categoriesList: any;
  categoryId: any;
  subCategoryListDD: any;
  submitQuestion: boolean;
  subCategoryId: any;
  categoryName: string;
  subCategoryName: string;
  categoryDocId: any;
  loading: boolean;
  pageNotFound = false;
  newCategory: boolean;

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
      placeholder: 'Enter description here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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

    this.postQuestionForm = this.formBuilder.group({
      CategoryName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.getAllCategories();
  }

  //---------------------------------setting browser tab title----------------------------------------------------------
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //---------------------------------setting form attribute control function--------------------------------------------

  get g() { return this.postQuestionForm.controls; }

  getAllCategories() {
    this.loading = true;
    this.discussionsService.getAllCategories().subscribe(data => {
      this.categoryList = data;
      this.loading = false;
      this.pageNotFound = false;
    },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.pageNotFound = true
        }
      })
  }

  selectedCategory(event) {
    this.categoryDocId = event.target.value
    this.categoryName = event.target[event.target.selectedIndex].innerText
  }

  selectedSubCategory(event) {
    this.subCategoryId = event.target.value
    this.subCategoryName = event.target[event.target.selectedIndex].innerText
  }

  getSubcategoriesList() {
    this.subcategoryService.getSubcategory(this.categoryDocId).subscribe(data => {
      this.subCategoryListDD = data;
      this.categoryId = data['category_id'];
    })
  }

  postQuestion() {
    this.submitQuestion = true
    if (this.postQuestionForm.invalid) {
      return
    }
    this.submitQuestion = false
    let body = {
      category: this.categoryName,
      category_id: this.categoryId,
      subcategory_id: this.subCategoryId,
      subcategory: this.subCategoryName,
      post_title: this.postQuestionForm.controls.discussionTitle.value,
      Desc: this.postQuestionForm.controls.problemDescription.value,
      userName: "Atul",
    }
    this.discussionsService.postQuestion(body).subscribe(data => {
      alert("Question Posted Successfully...");
      this.postQuestionForm.reset();
    })
  }

}
