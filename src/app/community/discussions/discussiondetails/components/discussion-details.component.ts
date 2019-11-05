import { Component, OnInit, ElementRef } from '@angular/core';
import { DiscussiondetailsService } from '../services/discussiondetails.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent implements OnInit {

  constructor(private discussiondetailsService: DiscussiondetailsService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private titleService: Title, private modalService: NgbModal) { }

  discussionDetailsQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: ElementRef;
  discussionId: string;
  discussionDetails: any;
  discussionDetailsId: any;
  subCategoryId: any;
  showDate: any;
  searchText: any;
  commentBox = false;
  postCommentBox = false;
  replyForm: FormGroup;
  discussiondocId: any;
  submitReply = false;
  categoryName: any;
  categoryId: any;
  subCategoryIdDD: any;
  subCategoryName: any;
  submitQuestion = false;
  loading: boolean;

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

    this.replyForm = this.formBuilder.group({
      Description: ['', Validators.required]
    })

    this.discussionDetailsQuestionForm = this.formBuilder.group({
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId']
      this.discussionId = params['discussionId'];
      this.discussionDetailsId = params['discussionDetailsId']
    });
    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  get g() { return this.replyForm.controls; }

  get f() { return this.discussionDetailsQuestionForm.controls; }

  public user = Utils.GetCurrentUser();

  getDiscussionDeatils(id: string) {
    this.loading = true;
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      this.discussionDetails = data;
      this.loading = false;
      this.discussiondocId = data['_id']
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
    this.discussionDetailsQuestionForm.reset();
    this.modalService.dismissAll(this.postQuestionModal);
  }

  showCommentBox() {
    this.commentBox = true
  }

  sendReply() {
    this.submitReply = true;
    if (this.replyForm.invalid) {
      return;
    }

    let body = {
      emailId: this.user.email_id,
      name: this.user.f_name + " " + this.user.l_name,
      Desc: this.replyForm.controls.Description.value,
      discussiondoc_Id: this.discussiondocId
    }

    this.discussiondetailsService.sendReply(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.submitReply = false;
      this.replyForm.reset();
    })
  }


  postQuestion() {
    debugger;
    this.categoryName = sessionStorage.getItem("category_name");
    this.categoryId = sessionStorage.getItem("category_id");
    this.subCategoryIdDD = sessionStorage.getItem("subcat_id");
    this.subCategoryName = sessionStorage.getItem("subCatName");

    this.submitQuestion = true;
    if (this.discussionDetailsQuestionForm.invalid) {
      return
    }
    this.submitQuestion = false;
    let body = {
      category: this.categoryName,
      category_id: this.categoryId,
      subcategory_id: this.subCategoryIdDD,
      subcategory: this.subCategoryName,
      post_title: this.discussionDetailsQuestionForm.controls.discussionTitle.value,
      Desc: this.discussionDetailsQuestionForm.controls.problemDescription.value,
      emailId: this.user.email_id,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.discussiondetailsService.postQuestion(body).subscribe(data => {
      alert("Question Posted Successfully");
      this.discussionDetailsQuestionForm.reset();
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.closePostQuestionModal();
    })
  }


  postComment() {
    this.commentBox = false;
  }

  showPostCommentBox() {
    this.postCommentBox = true;
  }

  commentOnPost() {
    this.postCommentBox = false;
  }

}
