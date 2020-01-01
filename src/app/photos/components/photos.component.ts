import { Component, OnInit, TemplateRef } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { PhotosService } from '../services/photos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { albumList, myLeasesList } from '../models/album';
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
  fullImageUrl: string;

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

  onFileUpload(event) {
    debugger;
    this.selectedFile = event.target.files[0];
    this.newAlbumForm.get('photo').setValue(this.selectedFile);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result;
    // };
    // reader.readAsDataURL(this.selectedFile);
  }

  // uploadImage() {
  //   debugger;
  //   const formData = new FormData();
  //   formData.append('profile', this.newAlbumForm.get('photo').value)
  //   let body = {
  //     image: formData,
  //     foldername: "profile/coverPhoto/albumPhoto/leasePhoto",
  //     emailid: this.user.email_id
  //   }
  //   this.photosService.uploadImage(body).subscribe(data => {
  //     console.log('image', data)
  //   })
  // }



  ///////////////////////////////////////////////////////////////////////////////

  selectFiles = (event) => { //image upload handler
    debugger;
    this.images = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).name.match(/\.(jpg|jpeg|png|gif)$/)) { //image validity check
        this.images.push({ file: files.item(i), uploadProgress: "0" });
      }
    }
    this.message = `${this.images.length} valid image(s) selected`;
    this.uploadImage();
  }

  uploadImage() { //image upload handler
    debugger;
    this.loading = true
    this.submitNewAlbumForm = false
    this.images.map((image) => {
      debugger;
      const formData = new FormData();
      formData.append("image", image.file, image.file.name);
      // formData.append("emailid", this.user.email_id);
      // formData.append("folder", "albumphoto");
      // formData.append("saveoriginal", "true");
      // formData.append("albumName", this.newAlbumForm.controls.albumName.value);
      return this.http.post(`${environment.APIBASEIMGURL}/upload/postfile`, formData, {
        reportProgress: true,
        observe: "events"
      })
        .subscribe(data => {
          debugger;
          console.log('image upload response', data['body']);
          if (data['body']) {
            this.imageUrl = data['body']['fileName'];
            this.fullImageUrl = environment.IMAGEPREPENDURL + this.imageUrl
            this.loading = false
          }

          console.log(this.imageUrl);
          // this.imageUrl = this.imageUrl

          // if (event.type === HttpEventType.UploadProgress) {
          //   image.uploadProgress = `${(event.loaded / event.total * 100)}%`;
          // }
          // if (event.type === HttpEventType.Response) {
          //   this.imageUrls.push(event.body.imageUrl);
          // }
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
      file_name: this.imageUrl
    }
    this.photosService.addNewAlbum(body).subscribe(data => {
      console.log('add new album response', data);
      this.loading = false;
      this.closeAddNewAlbumModal();
    },
      error => {
        this.loading = false
      })
  }


  getAlbumList() {
    this.photosService.getAlbumList(this.user.email_id).subscribe(data => {
      this.albumList = data['albums'];
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

  addPhotoInLeaseOrAlbum() {
    if (this.toggleLease) {
      let fullLeaseAndAlbumName: string = this.addNewPhotoForm.controls.lease.value
      let arrayLeaseAlbum = fullLeaseAndAlbumName.split('&');
      this.leaseOrAlbumName = arrayLeaseAlbum[1]
    }
    else if (!this.toggleLease) {
      let fullLeaseAndAlbumName: string = this.addNewPhotoForm.controls.album.value
      let arrayLeaseAlbum = fullLeaseAndAlbumName.split('&');
      this.leaseOrAlbumName = arrayLeaseAlbum[1]
    }
    this.uploadImage();
  }

}
