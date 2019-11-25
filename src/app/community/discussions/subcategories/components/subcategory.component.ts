import { Component, OnInit, ElementRef } from '@angular/core';
import { SubcategoryService } from '../Services/subcategory.service';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SubCategoryList } from '../../../models/subcategory';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

  constructor(private subcategoryService: SubcategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService) { }

  editorConfig: AngularEditorConfig;
  postQuestionForm: FormGroup;
  postQuestionModal: ElementRef;
  subCategoryList: SubCategoryList[];
  subCategoryId: string;
  searchText: any;
  categoriesList: any;
  categoryId: any;
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

  //Setting title for browser tab 
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Get currently logined user information.
  public user = Utils.GetCurrentUser();

  // Setting getter properties for easy form group access
  get g() { return this.postQuestionForm.controls; }

  getSubcategory(id) {
    this.loading = true;
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data;
      console.log('subcats', this.subCategoryList)
      this.loading = false;
      this.pageNotFound = false;
      this.categoryName = data[0]['category_name'];
      this.categoryId = data[0]['_id'];
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
    debugger;
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
      post_title: this.g.discussionTitle.value,
      Desc: this.g.problemDescription.value,
      emailId: this.user.email_id,
      name: `${this.user.f_name} ${this.user.l_name}`
    }
    this.subcategoryService.postQuestion(body).subscribe(data => {
      this.flashMessagesService.show('Your question posted successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.postQuestionForm.reset();
      this.closePostQuestionModal();
    })
  }

  //-----------------------------------passing parameters to create a new discussion----------------------------------
  sendData(subcatid: any, subCatName: string, categoryid: any, categoryname: any) {
    debugger;
    sessionStorage.setItem("subcat_id", subcatid);
    sessionStorage.setItem("subCatName", subCatName);
    sessionStorage.setItem("category_id", categoryid);
    sessionStorage.setItem("category_name", categoryname);
  }

}
