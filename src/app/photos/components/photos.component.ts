import { Component, OnInit, TemplateRef } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { PhotosService } from '../services/photos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { albumList, myLeasesList, AlbumImageList, FullImageUrl } from '../models/album';
import { NeighborsService } from '../../neighbors/services/neighbors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';

class ImageFile {
  file: File;
  uploadProgress: string;
}


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  selectedFile: any;
  imagePreview: any;
  newAlbumForm: FormGroup;
  submitNewAlbumForm = false;

  images: ImageFile[] = []; //an array of valid images
  imageUrls: string[] = []; //an array of uploaded image urls
  favourites: string[] = []; //an array of favorite image urls
  message: string = null; //a string to report the number of valid images
  albumList: albumList[];
  myLeases: myLeasesList[];
  toggleLease = true;
  leaseOrAlbumName: string;
  addNewPhotoForm: FormGroup;
  newAlbumTemplate: TemplateRef<any>;
  imageUrl: string;
  loading = false;
  fullImageUrl: FullImageUrl[] = [];
  albumOrLeaseDocId: string;
  addNewPhotoTemplate: TemplateRef<any>;
  albumImageList: AlbumImageList[];
  albumName: string;
  originalImageUrl: any;
  thumbImageUrl: any;
  imageToPush: any[] = [];
  imageCounter = 0;
  subAddNewPhoto = false;
  albumPhotos = true;
  leasePhotos = false;
  thumbAlbumFirstImage: string;
  loading1 = false;
  imageChangedEvent: any;
  isImageCropped: boolean;
  croppedImage: string;
  isUploadButton = false;
  isSubmitButton = true;
  croppedImagePhoto: string;

  constructor(private photosService: PhotosService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private neighborsService: NeighborsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.newAlbumForm = this.formBuilder.group({
      photo: ['', Validators.required],
      albumName: ['', Validators.required]
    });

    this.addNewPhotoForm = this.formBuilder.group({
      lease: [''],
      album: ['', Validators.required],
      photo: ['', Validators.required],
      uploadedImageUrl: ['']
    })

    this.getMyLeases();
    this.getAlbumList();
  }


  public user = Utils.GetCurrentUser();

  get n() { return this.newAlbumForm.controls }
  get m() { return this.addNewPhotoForm.controls }

  toggleLeaseAndAlbum(event) {
    this.toggleLease = !this.toggleLease
  }

  selectLease() {
    this.albumPhotos = false;
    this.leasePhotos = true;
  }

  selectAlbum() {
    this.albumPhotos = true;
    this.leasePhotos = false;
  }

  ////////////////////////////////////////////Onload Listing Functions/////////////////////////////////////////////



  getAlbumList() {
    this.loading = true;
    this.photosService.getAlbumList(this.user.email_id).subscribe(data => {
      this.albumList = [];
      this.albumList = data['album'];
      console.log('albumlist', this.albumList);
      this.albumList.forEach((el => { el.thumbnail_file_name = environment.IMAGEPREPENDURL + el.thumbnail_file_name }))
      this.loading = false;
      this.getAlbumPhotos(this.albumList[0]['album_docId'], this.albumList[0]['album_name'])
    },
      error => {
        this.loading = false;
      })
  }

  getMyLeases() {
    debugger;
    this.neighborsService.getMyLease(this.user.member_id).subscribe(data => {
      this.myLeases = data['data']
      console.log("MyLeases", data);
    })
  }


  getAlbumPhotos(docId: string, albumName: string) {
    debugger;
    this.loading = true
    this.albumName = albumName
    this.photosService.getAlbumPhotos(docId).subscribe(data => {
      console.log('album photos', data['Imagelist']);
      this.albumImageList = data['Imagelist'];
      for (let i = 0; i < this.albumImageList.length; i++) {
        this.albumImageList[i]['thumbnail_file_name'] = environment.IMAGEPREPENDURL + this.albumImageList[i]['thumbnail_file_name']
      }
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }


  ////////////////////////////////////////////Image Cropping Functions For Creating album////////////////////////////////

  fileChangeEvent(event: any): void {
    this.loading1 = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.loading1 = false
    this.isImageCropped = true;
    this.croppedImage = event.base64;
  }

  addNewAlbum() {
    debugger;
    this.loading = true
    this.submitNewAlbumForm = false;
    this.leaseOrAlbumName = this.newAlbumForm.controls.albumName.value
    let body = {
      emailid: this.user.email_id,
      album_name: this.n.albumName.value,
      original_file_name: this.originalImageUrl,
      thumbnail_file_name: this.thumbImageUrl
    }
    this.photosService.addNewAlbum(body).subscribe(data => {
      debugger;
      console.log('add new album response', data);
      this.loading = false;
      this.submitNewAlbumForm = false;
      this.thumbAlbumFirstImage = "";
      this.modalService.dismissAll(this.newAlbumTemplate);
      this.newAlbumForm.reset();
      this.fullImageUrl = [];
      this.getAlbumList();
      this.croppedImage = ''
    },
      error => {
        this.getAlbumList();
        this.loading = false;
      })
  }

  uploadImageToAddAlbum() {
    debugger;
    if (this.newAlbumForm.invalid && !this.thumbAlbumFirstImage) {
      this.submitNewAlbumForm = true;
      this.loading = false;
      return
    }
    this.loading1 = true
    this.submitNewAlbumForm = false;
    let imagesBlob = this.dataURLtoBlob(this.croppedImage);
    debugger;
    const formData = new FormData();
    formData.append("image", imagesBlob, 'thumb.jpg');
    formData.append("uploadType", "2")
    return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formData, {
      reportProgress: true,
      observe: "events"
    })
      .subscribe(data => {
        debugger;
        if (data['body']) {
          console.log('image upload response', data);
          this.originalImageUrl = data['body']['originalFileName'];
          this.thumbImageUrl = data['body']['thumbnailFileName'];
          this.thumbAlbumFirstImage = environment.IMAGEPREPENDURL + data['body']['thumbnailFileName']
          let img: string = environment.IMAGEPREPENDURL + this.thumbImageUrl;
          this.loading1 = false;
          this.addNewAlbum();
        }
        console.log(this.imageUrl);
      });

  }


  openAddNewAlbumModal(newAlbumTemplate: TemplateRef<any>) {
    this.newAlbumTemplate = newAlbumTemplate;
    this.modalService.open(this.newAlbumTemplate, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      // windowClass: 'modal-dialog-centered'
    })
  }

  closeAddNewAlbumModal() {
    this.modalService.dismissAll(this.newAlbumTemplate);
    this.submitNewAlbumForm = false;
    this.newAlbumForm.reset();
    this.fullImageUrl = [];
    this.thumbAlbumFirstImage = "";
    this.croppedImage = ''
  }


  ////////////////////////////////////////////Image Cropping Functions for adding photo to existing album////////////////////////////////


  selectLeaseOrAlbum(event) {
    if (this.toggleLease) {
      let fullLeaseAndAlbumName: string = this.addNewPhotoForm.controls.lease.value
      let arrayLeaseAlbum = fullLeaseAndAlbumName.split('&');
      this.albumOrLeaseDocId = arrayLeaseAlbum[0]
      this.leaseOrAlbumName = arrayLeaseAlbum[1]
    }
    else if (!this.toggleLease) {
      let fullLeaseAndAlbumName: string = this.addNewPhotoForm.controls.album.value
      let arrayLeaseAlbum = fullLeaseAndAlbumName.split('&');
      this.albumOrLeaseDocId = arrayLeaseAlbum[0]
      this.leaseOrAlbumName = arrayLeaseAlbum[1]
    }
  }

  openaddNewPhotoModal(addNewPhotoTemplate: TemplateRef<any>) {
    this.addNewPhotoTemplate = addNewPhotoTemplate;
    this.modalService.open(this.addNewPhotoTemplate, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeAddNewPhotoTemplate() {
    this.modalService.dismissAll(this.addNewPhotoTemplate);
    this.addNewPhotoForm.reset();
    this.toggleLease = true;
    this.fullImageUrl = [];
    this.loading1 = false;
    this.isUploadButton = false;
    this.isSubmitButton = true;
  }


  fileChangeEventForAddingPhoto(event: any): void {
    this.loading1 = true;
    this.isUploadButton = true;
    this.isSubmitButton = false;
    this.imageChangedEvent = event;
    //event.target.value = '';
  }
  imageCroppedForPhoto(event: ImageCroppedEvent) {
    this.loading1 = false
    this.isImageCropped = true;
    this.croppedImagePhoto = event.base64;
  }

  uploadImageToAddPhoto() {
    debugger;
    if (this.addNewPhotoForm.invalid) {
      this.subAddNewPhoto = true
      return
    }
    this.isUploadButton = false;
    this.loading1 = true
    this.subAddNewPhoto = false
    let imageBlob = this.dataURLtoBlob(this.croppedImagePhoto)
    debugger;
    const formData = new FormData();
    formData.append("image", imageBlob, 'thumb.jpg');
    formData.append("uploadType", "2")
    return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formData, {
      reportProgress: true,
      observe: "events"
    })
      .subscribe(data => {
        console.log('image upload response', data);
        if (data['body']) {
          debugger;
          this.originalImageUrl = data['body']['originalFileName'];
          this.thumbImageUrl = data['body']['thumbnailFileName'];
          let img: string = environment.IMAGEPREPENDURL + this.thumbImageUrl;
          for (let i = 0; i < 1; i++) {
            this.fullImageUrl.push({ img: environment.IMAGEPREPENDURL + this.thumbImageUrl });
          }
          this.loading1 = false;
          this.isSubmitButton = true;
          this.addPhotoInLeaseOrAlbum();
        }
      },
        error => {
          this.loading1 = false;
        });
  }


  addPhotoInLeaseOrAlbum() {
    debugger;
    if (this.addNewPhotoForm.invalid) {
      this.subAddNewPhoto = true
      return
    }
    let body = {
      album_docId: this.albumOrLeaseDocId,
      emailid: this.user.email_id,
      original_file_name: this.originalImageUrl,
      thumbnail_file_name: this.thumbImageUrl
    }
    this.photosService.addPhotoInLeaseOrAlbum(body).subscribe(data => {
      console.log('add new photo response', data)
    },
      error => {
      })
  }

  submitAddNewPhoto() {

    if (this.addNewPhotoForm.invalid) {
      this.subAddNewPhoto = true
      return
    }
    this.subAddNewPhoto = false
    this.modalService.dismissAll(this.addNewPhotoTemplate);
    this.isUploadButton = false;
    this.isSubmitButton = true;
    this.addNewPhotoForm.reset();
    this.toggleLease = true;
    this.fullImageUrl = [];
    this.getAlbumList()
  }


  /////////////////////////////////////////////Converting from base64 to Blob/////////////////////////////////////


  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

}
