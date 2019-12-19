import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Utils } from '../shared/Utils';
import { CommunityService } from './community.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Template } from '@angular/compiler/src/render3/r3_ast';

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

  constructor(private communityService: CommunityService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.newDisplayPicForm = this.formBuilder.group({
      // croppedImage: ['', Validators.required],
      newDisplayPic: ['', Validators.required]
    })
  }

  public user = Utils.GetCurrentUser();

  imageChangedEvent: any = '';
  croppedImage: any = '';

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
    formData.append('profile', file);
    console.log('formdata', formData)
    this.communityService.onUploadFile(formData)
      .subscribe(data => {
        this.isImageCropped = false;
      });
  }



}
