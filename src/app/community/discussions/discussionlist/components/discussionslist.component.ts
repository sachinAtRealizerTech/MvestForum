import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionslistService } from '../Services/discussionslist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {

  constructor(private discussionlistService: DiscussionslistService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private titleService: Title, private modalService: NgbModal) { }

  discussionListQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: ElementRef;
  discussionId: string;
  discussionList: any;
  subCategoryId: any;
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

    this.discussionListQuestionForm = this.formBuilder.group({
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.discussionId = params['discussionId'];
      this.subCategoryId = params['subCategoryId']
    });
    this.getDiscussionList(this.discussionId)
  }

  get g() { return this.discussionListQuestionForm.controls; }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getDiscussionList(id) {
    this.loading = true;
    this.discussionlistService.getAllDiscussionsList(id).subscribe(data => {
      this.discussionList = data;
      this.loading = false;
      this.pageNotFound = false;
    },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.pageNotFound = true
        }
      }
    )
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
    this.discussionListQuestionForm.reset()
  }

  postQuestion() {
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
      this.closePostQuestionModal();
    })
  }

  readMoreDescription() {
    this.readMore = true
  }

}
