import { Component, OnInit, ViewChild } from '@angular/core';
import { Utils } from '../shared/Utils';
import { CommunityService } from './community.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  selectedFile: any;
  imagePreview: string | ArrayBuffer;

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent;

  constructor(private communityService: CommunityService) { }

  ngOnInit() {
  }

  public user = Utils.GetCurrentUser();

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropIt(evnt) {
    console.log(this.croppedImage);
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
    this.communityService.OnUploadFile(this.croppedImage)
      .subscribe();
  }



}
