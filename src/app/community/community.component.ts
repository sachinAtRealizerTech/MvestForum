import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Utils } from '../shared/Utils';
import { CommunityService } from './community.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PhotosService } from '../photos/services/photos.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


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

  constructor(private communityService: CommunityService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private photosService: PhotosService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.coverImage = "assets/images/bg-pattern33.png";

    this.newDisplayPicForm = this.formBuilder.group({
      // croppedImage: ['', Validators.required],
      newDisplayPic: ['', Validators.required]
    });

  }

  public user = Utils.GetCurrentUser();

  imageChangedEvent: any = '';
  croppedImage: any = '';

  getBackground(image) {
    debugger;
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  public returnCoverPhoto(): any {
    debugger;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
  // }

  imageCropped(event: ImageCroppedEvent) {
    debugger;
    this.isImageCropped = true;
    this.croppedImage = event.base64;
    this.croppedImageBlob = this.dataURItoBlob(this.croppedImage)
  }

  cropperReady() {
    // cropper ready
  }

  cropIt(evnt) {
    console.log(this.croppedImage);
  }


  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }



  // onFileUpload(event) {
  //   debugger;
  //   this.selectedFile = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(this.selectedFile);
  // }


  onUploadFile() {
    debugger;
    //Upload file here send a binary data
    let file = new File([this.croppedImageBlob], "profilepic.jpeg", {
      type: 'image/jpeg'
    })
    const formData = new FormData();
    formData.append('profile', file, file.name);
    formData.append("foldername", 'profile');
    formData.append("emailid", this.user.email_id);
    console.log('formdata', formData)
    this.photosService.uploadImage(formData)
      .subscribe(data => {
        this.isImageCropped = false;
      });
  }



  ////////////////////////////////////////////////////////////////////////////////////////////

  selectFiles = (event) => { //image upload handler
    this.images = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).name.match(/\.(jpg|jpeg|png|gif)$/)) { //image validity check
        this.images.push({ file: files.item(i), uploadProgress: "0" });
      }
    }
    this.message = `${this.images.length} valid image(s) selected`;
  }

  uploadImage() { //image upload hander
    this.images.map((image, index) => {
      const formData = new FormData();
      formData.append("image", image.file, image.file.name);
      formData.append("foldername", 'profile');
      formData.append("emailid", this.user.email_id);
      return this.http.post(`${environment.APIBASEIMGURL}/upload/post`, formData, {
        reportProgress: true,
        observe: "events"
      })
        .subscribe(event => {
          debugger;
          // if (event.type === HttpEventType.UploadProgress) {
          //   image.uploadProgress = `${(event.loaded / event.total * 100)}%`;
          // }
          // if (event.type === HttpEventType.Response) {
          //   this.imageUrls.push(event.body.imageUrl);
          // }
        });
    });
  }



}
