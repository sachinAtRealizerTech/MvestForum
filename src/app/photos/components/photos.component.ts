import { Component, OnInit, TemplateRef } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { PhotosService } from '../services/photos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { albumList, myLeasesList, AlbumImageList } from '../models/album';
import { NeighborsService } from 'src/app/neighbors/neighbors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  fullImageUrl: string[] = [];
  albumOrLeaseDocId: string;
  addNewPhotoTemplate: TemplateRef<any>;
  albumImageList: AlbumImageList[];
  albumName: string;
  originalImageUrl: any;
  thumbImageUrl: any;
  imageToPush: string;
  imageCounter: any;

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
      album: [''],
      photo: ['']
    })

    this.getMyLeases();
    this.getAlbumList();
  }


  public user = Utils.GetCurrentUser();

  get n() { return this.newAlbumForm.controls }

  toggleLeaseAndAlbum(event) {
    this.toggleLease = !this.toggleLease
  }

  ///////////////////////////////////////////////////////////////////////////////

  selectFilesToAddPhoto = (event) => { //image upload handler
    debugger;
    this.images = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).name.match(/\.(jpg|jpeg|png|gif)$/)) { //image validity check
        this.images.push({ file: files.item(i), uploadProgress: "0" });
      }
    }
    this.message = `${this.images.length} valid image(s) selected`;
    this.uploadImageToAddPhoto();
  }

  uploadImageToAddPhoto() {
    debugger;
    this.loading = true
    this.submitNewAlbumForm = false
    this.images.map((image) => {
      debugger;
      const formData = new FormData();
      formData.append("image", image.file, image.file.name);
      formData.append("uploadType", "2")
      return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formData, {
        reportProgress: true,
        observe: "events"
      })
        .subscribe(data => {
          debugger;
          console.log('image upload response', data);
          if (data['body']) {
            this.originalImageUrl = data['body']['originalFileName'];
            this.thumbImageUrl = data['body']['thumbnailFileName'];
            this.imageToPush = environment.IMAGEPREPENDURL + this.thumbImageUrl;
            if (this.imageToPush) {
              debugger;
              for (let i = this.imageCounter; ;) {
                //this.fullImageUrl[i].push(this.imageToPush);
                this.imageToPush = ""
              }

            }
            this.loading = false;
            this.addPhotoInLeaseOrAlbum();
          }
        });
    });
  }

  selectFilesToAddAlbum = (event) => { //image upload handler
    debugger;
    this.images = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).name.match(/\.(jpg|jpeg|png|gif)$/)) { //image validity check
        this.images.push({ file: files.item(i), uploadProgress: "0" });
      }
    }
    this.message = `${this.images.length} valid image(s) selected`;
    this.uploadImageToAddAlbum();
  }

  uploadImageToAddAlbum() {
    debugger;
    this.loading = true
    this.submitNewAlbumForm = false
    this.images.map((image) => {
      debugger;
      const formData = new FormData();
      formData.append("image", image.file, image.file.name);
      formData.append("uploadType ", "2")
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
            //this.fullImageUrl = environment.IMAGEPREPENDURL + this.thumbImageUrl;
            this.loading = false;
            this.addNewAlbum();
          }
          console.log(this.imageUrl);
        });
    });
  }


  openAddNewAlbumModal(newAlbumTemplate: TemplateRef<any>) {
    this.newAlbumTemplate = newAlbumTemplate;
    this.modalService.open(this.newAlbumTemplate, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeAddNewAlbumModal() {
    this.modalService.dismissAll(this.newAlbumTemplate);
    this.submitNewAlbumForm = false;
    this.newAlbumForm.reset();
  }

  addNewAlbum() {
    debugger;
    this.loading = true
    if (this.newAlbumForm.invalid) {
      this.submitNewAlbumForm = true;
      return
    }
    this.submitNewAlbumForm = false;
    this.leaseOrAlbumName = this.newAlbumForm.controls.albumName.value
    let body = {
      member_id: this.user.member_id,
      album_name: this.n.albumName.value,
      original_file_name: this.originalImageUrl,
      thumbnail_file_name: this.thumbImageUrl
    }
    this.photosService.addNewAlbum(body).subscribe(data => {
      console.log('add new album response', data);
      this.loading = false;
      this.closeAddNewAlbumModal();
    },
      error => {
        this.loading = false;
      })
  }


  getAlbumList() {
    this.photosService.getAlbumList(this.user.member_id).subscribe(data => {
      this.albumList = data['album'];
      console.log('albumlist', this.albumList)
    })
  }

  getMyLeases() {
    debugger;
    this.neighborsService.getMyLease(this.user.member_id).subscribe(data => {
      this.myLeases = data['data']
      console.log("MyLeases", data);
    })
  }

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
    this.toggleLease = true
  }


  addPhotoInLeaseOrAlbum() {
    debugger;
    this.loading = true
    let body = {
      docId: this.albumOrLeaseDocId,
      original_file_name: this.originalImageUrl,
      thumbnail_file_name: this.thumbImageUrl
    }
    this.photosService.addPhotoInLeaseOrAlbum(body).subscribe(data => {
      console.log('add new photo response', data)
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }


  getAlbumPhotos(docId: string, albumName: string) {
    debugger;
    this.albumName = albumName
    this.photosService.getAlbumPhotos(docId).subscribe(data => {
      console.log('album photos', data['Imagelist']);
      this.albumImageList = data['Imagelist'];
      for (let i = 0; i < this.albumImageList.length; i++) {
        this.albumImageList[i]['thumbnail_file_name'] = environment.IMAGEPREPENDURL + this.albumImageList[i]['thumbnail_file_name']
      }
    })
  }

}
