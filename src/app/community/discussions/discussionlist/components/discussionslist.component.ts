import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionslistService } from '../Services/discussionslist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from 'src/app/shared/Utils';
import { DiscussionsList, discussions } from '../../../models/discussionlist';
import { BookmarksService } from 'src/app/bookmarks/services/bookmarks.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {

  constructor(private discussionlistService: DiscussionslistService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private modalService: NgbModal,
    private bookmarksService: BookmarksService,
    private flashMessagesService: FlashMessagesService) { }


  discussionListQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  postQuestionModal: TemplateRef<any>;
  discussionId: string;
  discussionList: DiscussionsList;
  subCategoryId: any;
  showDate: any;
  searchText: any;
  categoryName: any;
  categoryId: any;
  subCategoryName: any;
  submitQuestion = false;
  loading: boolean;
  readMore: boolean = false;
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

    this.discussionListQuestionForm = this.formBuilder.group({
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    })

    this.route.queryParams.subscribe(params => {
      debugger;
      this.categoryId = params['categoryId'];
      this.subCategoryId = params['subCategoryId']
    });
    this.getDiscussionList(this.subCategoryId)
  }

  //Getting current logined user details
  public user = Utils.GetCurrentUser();

  //Setting title for the browser tab
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //Setting getter properties for easy form access
  get g() { return this.discussionListQuestionForm.controls; }

  getDiscussionList(id: string) {
    this.loading = true;
    this.discussionlistService.getAllDiscussionsList(id, false, this.user.email_id).subscribe(data => {
      this.discussionList = data;
      this.discussionList.discussions.sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime())
      debugger;
      console.log('disclist', this.discussionList);
      this.loading = false;
      this.pageNotFound = false;
      this.categoryName = sessionStorage.getItem("category_name");
      //this.categoryId = sessionStorage.getItem("category_id");
      //this.subCategoryIdDD = sessionStorage.getItem("subcat_id");
      this.subCategoryName = sessionStorage.getItem("subCatName");
    },
      err => {
        if (err.status == 404) {
          this.loading = false;
          this.pageNotFound = true
        }
      }
    )
  }

  openAskQuestionModal(content: TemplateRef<any>) {
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
    debugger;
    this.loading = true;
    this.submitQuestion = true;
    if (this.discussionListQuestionForm.invalid) {
      return
    }
    this.submitQuestion = false;
    this.categoryName = sessionStorage.getItem("category_name");
    //this.categoryId = sessionStorage.getItem("category_id");
    //this.subCategoryIdDD = sessionStorage.getItem("subcat_id");
    this.subCategoryName = sessionStorage.getItem("subCatName");
    let body = {
      category: this.categoryName,
      category_id: this.categoryId,
      subcategory_id: this.subCategoryId,
      subcategory: this.subCategoryName,
      post_title: this.discussionListQuestionForm.controls.discussionTitle.value,
      Desc: this.discussionListQuestionForm.controls.problemDescription.value,
      emailId: this.user.email_id,
      _member_id: this.user.member_id,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.discussionlistService.postQuestion(body).subscribe(data => {
      console.log('postquestiomdata', data)
      this.discussionListQuestionForm.reset();
      this.getDiscussionList(this.subCategoryId);
      this.closePostQuestionModal();
      this.loading = false
    },
      error => {
        this.loading = false
      })
  }

  markAsAnswer(dl: boolean) {
    if (dl == true) {
      return true
    }
    else {
      return false
    }
  }

  bookmarkDiscussion(docId: string) {
    debugger;
    let body = {
      email_id: this.user.email_id,
      subcat_id: this.subCategoryId,
      disc_doc_id: docId,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.bookmarksService.bookmarkDiscussion(body).subscribe(data => {
      console.log('bookmark', data);
      this.flashMessagesService.show('You have successfully added this post to bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getDiscussionList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }

  isBookmarkedByMe(bookmarkData: any) {
    debugger;
    if (bookmarkData) {
      let bookmarkPosts = bookmarkData.map(l => l.bookmark_by_emailId);
      return (bookmarkPosts.includes(this.user.email_id));
    }
    else {
      return false
    }
  }

  removeBookmark(docId: string) {
    let body = {
      email_id: this.user.email_id,
      disc_doc_id: docId,
      subcat_id: this.subCategoryId
    }
    this.bookmarksService.removeBookmark(body).subscribe(data => {
      console.log('removebookmark', data);
      this.flashMessagesService.show('You have successfully removed this post from bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getDiscussionList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }



}
