import { Component, OnInit, ElementRef } from '@angular/core';
import { DiscussionsService } from '../services/discussions.service';
import { CategoryList } from '../../../../models/discussions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoryService } from '../../subcategories/Services/subcategory.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private discussionsService: DiscussionsService, private formBuilder: FormBuilder,
    private subcategoryService: SubcategoryService, private router: Router, private titleService: Title,
    private modalService: NgbModal, private flashMessagesService: FlashMessagesService) { }

  postQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: ElementRef;
  //categoryList: CategoryList[] = [];
  categoryList: any
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
      height: '10rem',
      minHeight: '4rem',
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

  public user = Utils.GetCurrentUser();

  getAllCategories() {
    this.loading = true;
    this.discussionsService.getAllCategories().subscribe(data => {
      console.log('categories', data)
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

  openAskQuestionModal(content) {
    this.postQuestionModal = content;
    this.modalService.open(this.postQuestionModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closePostQuestionModal() {
    this.modalService.dismissAll(this.postQuestionModal);
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
      emailId: this.user.email_id,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.discussionsService.postQuestion(body).subscribe(data => {
      this.flashMessagesService.show('Your question posted successfully.', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.postQuestionForm.reset();
      this.closePostQuestionModal();
    })
  }

}
