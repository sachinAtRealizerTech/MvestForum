import { Component, OnInit, ElementRef } from '@angular/core';
import { SubcategoryService } from '../Services/subcategory.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SubCategoryList } from 'src/app/models/discussions';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  constructor(private subcategoryService: SubcategoryService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private titleService: Title, private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService) { }

  editorConfig: AngularEditorConfig;
  postQuestionForm: FormGroup;
  postQuestionModal: ElementRef;
  subCategoryList: SubCategoryList[];
  subCategoryId: string;
  searchText: any;
  categoriesList: any;
  categoryId: string;
  subCategoryListDD: SubCategoryList[];
  submitQuestion: boolean;
  categoryName: any;
  subCategoryIdDD: any;
  subCategoryName: any;
  loading: boolean;
  pageNotFound = false;

  ngOnInit() {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: '15rem',
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
      subCategoryName: ['', Validators.required],
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId'];
    });
    this.getSubcategory(this.subCategoryId);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  get g() { return this.postQuestionForm.controls; }

  public user = Utils.GetCurrentUser();

  getSubcategory(id) {
    this.loading = true;
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data;
      console.log('subcats', this.subCategoryList)
      this.loading = false;
      this.pageNotFound = false;
      this.categoryName = data['category_name'];
      this.categoryId = data['category_id'];
    },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.pageNotFound = true
        }
      })
  }

  getSubcategoriesList() {
    this.subcategoryService.getSubcategory(this.categoryId).subscribe(data => {
      this.subCategoryListDD = data
    })
  }

  selectedSubCategory(event) {
    this.subCategoryIdDD = event.target.value
    this.subCategoryName = event.target[event.target.selectedIndex].innerText
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
    this.postQuestionForm.reset();
  }

  postQuestion() {
    this.submitQuestion = true;
    if (this.postQuestionForm.invalid) {
      return
    }
    this.submitQuestion = false;
    let body = {
      category: this.categoryName,
      category_id: this.categoryId,
      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,
      post_title: this.postQuestionForm.controls.discussionTitle.value,
      Desc: this.postQuestionForm.controls.problemDescription.value,
      emailId: this.user.email_id,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.subcategoryService.postQuestion(body).subscribe(data => {
      this.flashMessagesService.show('Your question posted successfully', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.postQuestionForm.reset();
      this.closePostQuestionModal();
    })
  }

  //-----------------------------------passing parameters to create a new discussion----------------------------------
  sendData(subcatid: any, subCatName: string, categoryid: any, categoryname: any) {
    sessionStorage.setItem("subcat_id", subcatid);
    sessionStorage.setItem("subCatName", subCatName);
    sessionStorage.setItem("category_id", categoryid);
    sessionStorage.setItem("category_name", categoryname);
  }

}
