import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { DiscussiondetailsService } from '../services/discussiondetails.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent implements OnInit {
  commentId: string;
  replyId: any;
  isReplyCommment = false;
  commentToCommentForm: FormGroup;
  isLiked: boolean;
  post_Id: any;
  comment_Id: any;
  postLikeFlag: boolean;
  commentLikeFlag: boolean;
  postQLikeFlag: boolean;
  postALikeFlag: boolean;
  like_Id: any;
  comment_to_id: any;



  constructor(private discussiondetailsService: DiscussiondetailsService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private titleService: Title, private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService) { }

  discussionDetailsQuestionForm: FormGroup;
  commentForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: ElementRef;
  commentModal: ElementRef;
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
  postId: string;
  submitComment = false;
  isLikePressed = false;

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
      defaultFontName: 'Montserrat',
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
      uploadUrl: 'v1/image',
      sanitize: true,
      toolbarPosition: 'top',
    };

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })

    this.commentToCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })

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

  get h() { return this.commentForm.controls }

  get m() { return this.commentToCommentForm.controls }

  public user = Utils.GetCurrentUser();

  getDiscussionDeatils(id: string) {

    this.loading = true;
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      debugger;
      this.discussionDetails = data;
      console.log('discussiondetails', this.discussionDetails)
      this.loading = false;
      this.discussiondocId = data['_id'];
      this.isLikePressed = false;
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
      this.flashMessagesService.show('Your question posted successfully', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.discussionDetailsQuestionForm.reset();
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.closePostQuestionModal();
    })
  }

  openCommentModal(commentTemplate, discDetails: any) {
    //this.postId = discDetails._id;
    if (!discDetails.posts) {
      this.commentId = discDetails.post_id
    }
    else {
      this.commentId = discDetails.posts[0].post_id;
    }
    this.commentModal = commentTemplate;
    this.modalService.open(this.commentModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }


  openCommentToCommentModal(postCommentToCommentModal, discDetails: any, qc: any) {
    if (!discDetails.posts) {
      this.commentId = discDetails.post_id;
      this.replyId = qc.comment_id
    }
    else {
      this.commentId = discDetails.posts[0].post_id;
      this.replyId = qc.comment_id;
    }
    this.commentModal = postCommentToCommentModal;
    this.modalService.open(this.commentModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }


  closePostCommentModal() {
    this.submitComment = false;
    this.commentForm.reset();
    this.modalService.dismissAll(this.commentModal);
  }

  closeCommentToCommentModal() {
    this.commentToCommentForm.reset();
    this.modalService.dismissAll(this.commentModal);
  }

  postComment() {
    this.submitComment = true;
    if (this.commentForm.invalid) {
      return
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.commentId,
      comment_text: this.commentForm.controls.comment.value,
      name: this.user.f_name + " " + this.user.l_name,
      emailId: this.user.email_id
    }
    this.discussiondetailsService.commentToPost(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.submitComment = false;
      this.closePostCommentModal();
    })
  }

  postCommentToComment() {
    this.submitComment = true;
    if (this.commentToCommentForm.invalid) {
      return
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.commentId,
      comment_id: this.replyId,
      comment_text: this.commentToCommentForm.controls.comment.value,
      name: this.user.f_name + " " + this.user.l_name,
      emailId: this.user.email_id
    }
    this.discussiondetailsService.commentToPost(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.submitComment = false;
      this.closeCommentToCommentModal();
    })
  }


  postLike(discDetails: any) {
    if (this.isLikePressed == false) {
      if (!discDetails.posts) {
        this.isLikePressed = true;
        this.post_Id = discDetails.post_id;
      }
      else {
        this.isLikePressed = true;
        this.post_Id = discDetails.posts[0].post_id;
      }
      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        like_emailId: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }
      this.discussiondetailsService.postLike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);

      })
    }
    else {
      return
    }


  }

  unlikePost(discDetails: any) {
    this.isLikePressed = false;
    if (!discDetails.posts) {
      this.post_Id = discDetails.post_id;
    }
    else {
      this.post_Id = discDetails.posts[0].post_id;
      //this.like_Id = likeId;
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.post_Id,
      like_by_emailId: this.user.email_id
    }
    this.discussiondetailsService.postLike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })
  }

  likeToComment(discDetails: any, qc: any) {
    if (this.isLikePressed == false) {
      if (!discDetails.posts) {
        this.post_Id = discDetails.post_id;
        this.comment_Id = qc.comment_id;
        this.isLikePressed = true;
      }
      else {
        this.post_Id = discDetails.posts[0].post_id;
        this.comment_Id = qc.comment_id;
        this.isLikePressed = true;
      }

      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        comment_id: this.comment_Id,
        like_emailId: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }
      this.discussiondetailsService.postLike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);
      })
    }
    else {
      return
    }

  }


  unLikeToComment(discDetails: any, qc: any) {
    this.isLikePressed = false;
    if (!discDetails.posts) {
      this.post_Id = discDetails.post_id;
      this.comment_Id = qc.comment_id
    }
    else {
      this.post_Id = discDetails.posts[0].post_id;
      this.comment_Id = qc.comment_id;
    }

    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.post_Id,
      comment_id: this.comment_Id,
      like_by_emailId: this.user.email_id

    }
    this.discussiondetailsService.postLike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })

  }

  isPostLikedByMe(post: any): boolean {
    let likedEmails = post.likes.map(l => l.like_by_emailId);
    return (likedEmails.includes(this.user.email_id));
  }

  isCommentLikedByMe(comment: any) {
    let likedEmails = comment.likes.map(l => l.like_by_emailId);
    return (likedEmails.includes(this.user.email_id));
  }


  likeCommentToComment(discDetails: any, pc: any, cc: any) {
    debugger;

    if (this.isLikePressed == false) {
      if (!discDetails.posts) {
        this.post_Id = discDetails.post_id;
        this.comment_Id = pc.comment_id
        this.comment_to_id = cc.comment_id;
        this.isLikePressed = true
      }
      else {
        this.post_Id = discDetails.posts[0].post_id;
        this.comment_Id = pc.comment_id;
        this.comment_to_id = cc.comment_id
        this.isLikePressed = true
      }

      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        comment_id: this.comment_Id,
        comment_to_id: this.comment_to_id,
        like_emailId: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }

      this.discussiondetailsService.postLike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);
      })
    }
    else {
      return
    }

  }

  unLikeCommentToComment(discDetails: any, pc: any, cc: any) {
    debugger;
    this.isLikePressed = false
    if (!discDetails.posts) {
      this.post_Id = discDetails.post_id;
      this.comment_Id = pc.comment_id;
      this.comment_to_id = cc.comment_id;
    }
    else {
      this.post_Id = discDetails.posts[0].post_id;
      this.comment_Id = pc.comment_id;
      this.comment_to_id = cc.comment_id;
    }

    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.post_Id,
      comment_id: this.comment_Id,
      comment_to_id: this.comment_to_id,
      like_by_emailId: this.user.email_id
    }

    this.discussiondetailsService.postLike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })
  }


  isCommentToCommentLikedByMe(comments: any) {
    let likedEmails = comments.likes.map(l => l.like_by_emailId);
    return (likedEmails.includes(this.user.email_id));
  }

}
