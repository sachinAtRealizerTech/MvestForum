import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Utils } from '../shared/Utils';
import { CommunityService } from './community.service';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PhotosService } from '../photos/services/photos.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DiscussionsService } from './discussions/categories/services/discussions.service';
import { SubcategoryService } from './discussions/subcategories/Services/subcategory.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoryList } from './models/category';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyaccountService } from '../myaccount/myaccount.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  selectedFile: any;
  imagePreview: string | ArrayBuffer;
  newDisplayPicForm: FormGroup;
  newDisplayPicModal: TemplateRef<any>;
  isImageCropped = false;

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent;
  croppedImageBlob: Blob;
  images: any[];
  message: string;
  leaseOrAlbumName: string;
  coverImage: string = "assets/images/bg-pattern33.png";
  postQuestionModal: TemplateRef<any>;
  categoryId: any;
  categoryName: any;
  subCategoryId: any;
  subCategoryName: any;
  subCategoryListDD: any;
  submitQuestion = false;
  postQuestionForm: FormGroup;
  editorConfig: AngularEditorConfig;
  categoryList: CategoryList[];
  userDetails: any;
  originalImageUrl: string = "";
  loading = false;
  displayPicImageUrl: string;
  isDPChanged = false;
  displayPicImage: string;


  constructor(private communityService: CommunityService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private photosService: PhotosService,
    private sanitizer: DomSanitizer,
    private discussionsService: DiscussionsService,
    private subcategoryService: SubcategoryService,
    private flashMessagesService: FlashMessagesService,
    private myaccountService: MyaccountService,
    private router: Router,
    private location: Location) { }

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
      uploadUrl: "http://45.35.4.250:3000/upload/uploadnewsimage",
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
      CategoryName: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      discussionTitle: ['', Validators.required],
      problemDescription: ['', Validators.required]
    });

    this.coverImage = "assets/images/bg-pattern33.png";

    this.newDisplayPicForm = this.formBuilder.group({
      // croppedImage: ['', Validators.required],
      newDisplayPic: ['', Validators.required]
    });

    this.getAllCategories();
    this.getUserProfileDetails();
    debugger;
    localStorage.setItem('displayPicUrl', (environment.IMAGEPREPENDURL + this.user.email_id + '.png' + "?" + new Date().getTime()))
    if (this.isDPChanged == true) {
      this.displayPicImageUrl = environment.IMAGEPREPENDURL + this.user.email_id + '.png' + "?" + new Date().getTime();
      localStorage.setItem('displayPicUrl', this.displayPicImageUrl)
    }
    this.displayPicImage = localStorage.getItem('displayPicUrl')

  }

  public user = Utils.GetCurrentUser();

  get g() { return this.postQuestionForm.controls; }

  imageChangedEvent: any = '';
  croppedImage: any = '';


  getAllCategories() {
    this.discussionsService.getAllCategories().subscribe(data => {
      this.categoryList = data;
      console.log('catlist', this.categoryList)
    },
      err => {
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
    this.postQuestionForm.reset();
    this.submitQuestion = false;
  }

  selectedCategory(event) {
    this.categoryId = event.target.value
    this.categoryName = event.target[event.target.selectedIndex].innerText
  }

  selectedSubCategory(event) {
    this.subCategoryId = event.target.value
    this.subCategoryName = event.target[event.target.selectedIndex].innerText
  }

  getSubcategoriesList() {
    this.subcategoryService.getSubcategory(this.categoryId).subscribe(data => {
      this.subCategoryListDD = data;
    })
  }

  getUserProfileDetails() {
    debugger;
    this.myaccountService.getUserProfileDetails(this.user.email_id).subscribe(data => {
      console.log('userdetails', data);
      this.userDetails = data[0];
    },
      error => {

      })
  }

  postQuestion() {
    debugger;
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
      _member_id: this.user.member_id,
      name: `${this.user.f_name} ${this.user.l_name}`
    }
    this.discussionsService.postQuestion(body).subscribe(data => {
      this.flashMessagesService.show('Your question posted successfully.', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.postQuestionForm.reset();
      this.closePostQuestionModal();
    })
  }

  getBackground(image) {
    debugger;
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  public returnCoverPhoto(): any {
    let styles = {
      'backgroundImage': 'url(' + this.coverImage + ')',
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'cover',
      'height': '200px'
    }
    return styles
  }

  changeCoverPhoto(imagePath: string) {
    this.coverImage = imagePath
  }

  openNewDisplayPicForm(newDisplayPicModal: TemplateRef<any>) {
    this.newDisplayPicModal = newDisplayPicModal;
    this.modalService.open(this.newDisplayPicModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      //size: 'lg'
    })
  }

  closeNewDisplayPicForm() {
    this.modalService.dismissAll(this.newDisplayPicModal);
    this.newDisplayPicForm.reset();
    this.isImageCropped = false;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////

  selectFiles = (event) => { //image upload handler
    this.images = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i)) { //image validity check
        this.images.push({ file: files.item(i), uploadProgress: "0" });
      }
    }
    // this.imagePreview = this.images[0]
    this.message = `${this.images.length} valid image(s) selected`;
    this.uploadImage();
  }

  uploadImage() {
    debugger;
    this.loading = true
    this.images.map((image) => {
      debugger;
      const formData = new FormData();
      formData.append("image", image.file, image.file.name);
      formData.append("email", this.user.email_id);
      formData.append("uploadType", "1")
      return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formData, {
        reportProgress: true,
        observe: "events"
      })
        .subscribe(data => {
          debugger;
          console.log('image upload response', data);
          if (data['body']) {
            debugger;
            if (data['body']['originalFileName']) {
              this.originalImageUrl = ""
              let imageUrl = data['body']['originalFileName'];
              this.originalImageUrl = environment.IMAGEPREPENDURL + imageUrl + "?" + new Date().getTime();
              // this.displayPicImage = this.originalImageUrl
              this.isDPChanged = true;
              //this.ngOnInit();
            }
            this.loading = false;
          }
        },
          error => {
            this.loading = false;
          });
    });
  }

  submitUpdateProfileImage() {
    this.displayPicImageUrl = environment.IMAGEPREPENDURL + this.user.email_id + '.png' + "?" + new Date().getTime();
    this.modalService.dismissAll(this.newDisplayPicModal);
    this.originalImageUrl = "";
    this.displayPicImage = this.originalImageUrl
    window.location.reload();
  }



}
