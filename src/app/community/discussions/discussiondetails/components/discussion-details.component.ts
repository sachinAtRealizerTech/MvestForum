import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { DiscussiondetailsService } from '../services/discussiondetails.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DiscussionDetails } from '../../../models/discussiondetails';


@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent implements OnInit {
  editPostId: any;
  editCommentModal: any;
  editCommentId: any;
  deleteModal: TemplateRef<any>;
  deletePostId: any;
  activeId: string;
  isDislikePressed = false;


  constructor(private discussiondetailsService: DiscussiondetailsService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService,
    private router: Router, private route: ActivatedRoute) { }

  discussionDetailsQuestionForm: FormGroup;
  commentForm: FormGroup;
  replyForm: FormGroup;
  editPostForm: FormGroup;
  commentToCommentForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: ElementRef;
  replyTemplate: TemplateRef<any>;
  commentModal: ElementRef;
  editPostModal: ElementRef;
  discussionId: string;
  discussionDetails: DiscussionDetails;
  discussionDetailsId: any;
  subCategoryId: any;
  showDate: any;
  searchText: any;
  discussiondocId: any;
  submitReply = false;
  categoryName: any;
  categoryId: any;
  subCategoryIdDD: any;
  subCategoryName: any;
  submitQuestion = false;
  loading: boolean;
  submitComment = false;
  isLikePressed = false;
  commentId: string;
  replyId: any;
  isReplyCommment = false;
  post_Id: any;
  comment_Id: any;
  comment_to_id: any;
  p_Id: string;
  markAnswer = false;
  submitEditForm = false;
  editCommentForm: FormGroup;
  submitEditComment = false;


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
      uploadUrl: 'http://45.35.4.250:5001/discussion',
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

    this.editPostForm = this.formBuilder.group({
      Description: ['', Validators.required]
    })

    this.editCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })

    this.discussionDetailsQuestionForm = this.formBuilder.group({
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })


    this.route.queryParams.subscribe(params => {
      debugger;
      this.subCategoryId = params['subCategoryId']
      this.categoryId = params['categoryId'];
      this.discussionDetailsId = params['discussionId'];
      this.p_Id = params['postId'];
    });

    this.categoryName = sessionStorage.getItem("category_name");
    //this.categoryId = sessionStorage.getItem("category_id");
    this.subCategoryIdDD = sessionStorage.getItem("subcat_id");
    this.subCategoryName = sessionStorage.getItem("subCatName");

    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  //Getting current user information
  public user = Utils.GetCurrentUser();

  //Setting browser tab title
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //Setting getter properties for easy form access
  get g() { return this.replyForm.controls; }
  get f() { return this.discussionDetailsQuestionForm.controls; }
  get h() { return this.commentForm.controls }
  get m() { return this.commentToCommentForm.controls }
  get n() { return this.editPostForm.controls }
  get l() { return this.editCommentForm.controls }

  getDiscussionDeatils(id: string) {
    this.loading = true;
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data => {
      debugger;
      this.discussionDetails = data;
      console.log('discussiondetails', this.discussionDetails)
      this.loading = false;
      this.discussiondocId = data['_id'];
      this.isLikePressed = false;
      this.isDislikePressed = false;
      setTimeout(() => {
        debugger;
        const element = document.querySelector('#' + 'p' + this.p_Id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          this.activeId = this.p_Id;
        }
      }, 700),
        setTimeout(() => {
          this.activeId = ""
        }, 5000)

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

  openReplyTemplate(replyTemplate: TemplateRef<any>) {
    this.replyTemplate = replyTemplate
    this.modalService.open(this.replyTemplate, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeReplyModal() {
    this.replyForm.reset();
    this.modalService.dismissAll(this.replyTemplate)
  }

  sendReply() {
    debugger;
    this.submitReply = true;
    if (this.replyForm.invalid) {
      return;
    }
    let body = {
      emailId: this.user.email_id,
      name: this.user.f_name + " " + this.user.l_name,
      Desc: this.replyForm.controls.Description.value,
      discussiondoc_Id: this.discussiondocId,
      _member_id: this.user.member_id
    }
    this.discussiondetailsService.sendReply(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussionDetailsId);
      this.submitReply = false;
      this.replyForm.reset();
      this.modalService.dismissAll(this.replyTemplate);
    })
  }



  postQuestion() {
    debugger;
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
      _member_id: this.user.member_id,
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
    debugger;
    this.submitComment = true;
    if (this.commentForm.invalid) {
      return
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.commentId,
      comment_text: this.commentForm.controls.comment.value,
      name: this.user.f_name + " " + this.user.l_name,
      emailId: this.user.email_id,
      subcat_id: this.subCategoryId
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
    debugger;
    this.isLikePressed = false;
    if (!discDetails.posts) {
      this.post_Id = discDetails.post_id;
    }
    else {
      this.post_Id = discDetails.posts[0].post_id;
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
    if (post != null) {
      let likedEmails = post.likes.map(l => l.like_by_emailId);
      return (likedEmails.includes(this.user.email_id));
    }
    else {
      return false;
    }
  }

  isCommentLikedByMe(comment: any) {
    let likedEmails = comment.likes.map(l => l.like_by_emailId);
    return (likedEmails.includes(this.user.email_id));
  }


  likeCommentToComment(discDetails: any, pc: any, cc: any) {
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

  isDislikedByMe(object) {
    debugger;
    if (object.dislikes != null) {
      let likedEmails = object.dislikes.map(l => l.dislike_by_emailId);
      return (likedEmails.includes(this.user.email_id));
    }
    else {
      return false
    }
  }

  dislikePost(discDetails: any) {
    if (this.isDislikePressed == false) {
      if (!discDetails.posts) {
        this.isDislikePressed = true;
        this.post_Id = discDetails.post_id;
      }
      else {
        this.isDislikePressed = true;
        this.post_Id = discDetails.posts[0].post_id;
      }
      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        email_id: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }
      this.discussiondetailsService.postDislike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);
      })
    }
    else {
      return
    }
  }

  unDislikePost(discDetails: any) {
    debugger;
    this.isDislikePressed = false;
    if (!discDetails.posts) {
      this.post_Id = discDetails.post_id;
    }
    else {
      this.post_Id = discDetails.posts[0].post_id;
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.post_Id,
      dislike_by_emailId: this.user.email_id
    }
    this.discussiondetailsService.postDislike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })
  }


  dislikeToComment(discDetails: any, qc: any) {
    if (this.isDislikePressed == false) {
      if (!discDetails.posts) {
        this.post_Id = discDetails.post_id;
        this.comment_Id = qc.comment_id;
        this.isDislikePressed = true;
      }
      else {
        this.post_Id = discDetails.posts[0].post_id;
        this.comment_Id = qc.comment_id;
        this.isDislikePressed = true;
      }

      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        comment_id: this.comment_Id,
        email_id: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }
      this.discussiondetailsService.postDislike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);
      })
    }
    else {
      return
    }
  }


  unDislikeToComment(discDetails: any, qc: any) {
    this.isDislikePressed = false;
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
      dislike_by_emailId: this.user.email_id
    }
    this.discussiondetailsService.postDislike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })
  }


  dislikeCommentToComment(discDetails: any, pc: any, cc: any) {
    if (this.isDislikePressed == false) {
      if (!discDetails.posts) {
        this.post_Id = discDetails.post_id;
        this.comment_Id = pc.comment_id
        this.comment_to_id = cc.comment_id;
        this.isDislikePressed = true
      }
      else {
        this.post_Id = discDetails.posts[0].post_id;
        this.comment_Id = pc.comment_id;
        this.comment_to_id = cc.comment_id
        this.isDislikePressed = true
      }
      let body = {
        discussion_doc_id: this.discussiondocId,
        post_id: this.post_Id,
        comment_id: this.comment_Id,
        comment_to_id: this.comment_to_id,
        email_id: this.user.email_id,
        name: this.user.f_name + " " + this.user.l_name
      }
      this.discussiondetailsService.postDislike(body).subscribe(data => {
        this.getDiscussionDeatils(this.discussiondocId);
      })
    }
    else {
      return
    }

  }

  unDislikeCommentToComment(discDetails: any, pc: any, cc: any) {
    this.isDislikePressed = false
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
      dislike_by_emailId: this.user.email_id
    }
    this.discussiondetailsService.postDislike(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
    })
  }




  markAsAnswer(postId: string, flag: boolean) {
    debugger;
    let isAnswerFlag = this.discussionDetails.posts.map(l => l.isAnswer);
    let answerFlagPresent: Boolean = isAnswerFlag.includes(true);
    if (answerFlagPresent == true) {
      return
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: postId,
      isAnswer: flag,
      subcat_id: this.subCategoryId
    }
    this.discussiondetailsService.markAsAnswer(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
      this.flashMessagesService.show('You have marked this question for answer.', { cssClass: 'bg-accent flash-message', timeout: 2000 })
    })
  }

  openEditPostModal(editPostTemplate, p: any) {
    debugger;
    this.editPostModal = editPostTemplate;
    this.editPostId = p.post_id;
    let body = {
      Description: p.post_msg
    }
    this.editPostForm.patchValue(body);
    this.modalService.open(this.editPostModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeEditPostModal() {
    this.modalService.dismissAll(this.editPostModal);
  }

  isTimeOver(postDate: Date): boolean {
    let date1 = new Date()
    let date2 = new Date(postDate)
    let time1 = new Date(date1.getUTCFullYear(),
      date1.getUTCMonth(),
      date1.getUTCDate(),
      date1.getUTCHours(),
      date1.getUTCMinutes(),
      date1.getUTCSeconds()
    ).getTime();
    let time2 = new Date(date2.getUTCFullYear(),
      date2.getUTCMonth(),
      date2.getUTCDate(),
      date2.getUTCHours(),
      date2.getUTCMinutes(),
      date2.getUTCSeconds()).getTime();
    return (Math.round((time1 - time2) / 1000 / 60)) < 30
  }


  editPost() {
    this.submitEditForm = true;
    if (this.editPostForm.invalid) {
      return;
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.editPostId,
      post_msg: this.n.Description.value
    }
    this.discussiondetailsService.editPost(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
      this.flashMessagesService.show('Post has been updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.closeEditPostModal();
    })
  }

  openEditCommentModal(editCommentModal, discDetails: any, cm: any) {
    this.editCommentModal = editCommentModal;
    this.editCommentId = cm.comment_id;
    let body = {
      comment: cm.comment_text
    }
    this.editCommentForm.patchValue(body);
    this.modalService.open(this.editCommentModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeEditCommentModal() {
    this.modalService.dismissAll(this.editCommentModal);
  }

  editComment() {
    debugger;
    this.submitEditComment = true;
    if (this.editCommentForm.invalid) {
      return
    }
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.editCommentId,
      post_msg: this.l.comment.value
    }
    this.discussiondetailsService.editPost(body).subscribe(data => {
      console.log('editdata', data)
      this.flashMessagesService.show('Post has been updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getDiscussionDeatils(this.discussiondocId);
      this.closeEditPostModal();
    })
  }


  openDeletePostModal(deleteModal: TemplateRef<any>, p: any) {
    this.deletePostId = p.post_id
    this.deleteModal = deleteModal;
    this.modalService.open(this.deleteModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeDeletePostModal() {
    this.modalService.dismissAll(this.deleteModal)
  }

  deletePost() {
    debugger;
    let body = {
      discussion_doc_id: this.discussiondocId,
      post_id: this.deletePostId
    }
    this.discussiondetailsService.deletePost(body).subscribe(data => {
      this.getDiscussionDeatils(this.discussiondocId);
      this.flashMessagesService.show('Comment has been deleted successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.closeDeletePostModal();
    })
  }

}
