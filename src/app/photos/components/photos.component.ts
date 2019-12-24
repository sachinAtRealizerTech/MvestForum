import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { PhotosService } from '../services/photos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { albumList, myLeasesList } from '../models/album';
import { NeighborsService } from 'src/app/neighbors/neighbors.service';

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
  newAlbumForm: FormGroup

  images: ImageFile[] = []; //an array of valid images
  imageUrls: string[] = []; //an array of uploaded image urls
  favourites: string[] = []; //an array of favorite image urls
  message: string = null; //a string to report the number of valid images
  albumList: albumList[];
  myLeases: myLeasesList[];
  toggleLease = true;
  leaseOrAlbumName: string;
  addNewPhotoForm: FormGroup;

  constructor(private photosService: PhotosService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private neighborsService: NeighborsService) { }

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
      formData.append("foldername", this.leaseOrAlbumName);
      formData.append("emailid", this.user.email_id);
      return this.http.post(`${environment.APIBASEIMGURL}/upload/post`, formData, {
        reportProgress: true,
        observe: "events"
      })
        .subscribe(event => {
          debugger;
          if (event.type === HttpEventType.UploadProgress) {
            image.uploadProgress = `${(event.loaded / event.total * 100)}%`;
          }
          // if (event.type === HttpEventType.Response) {
          //   this.imageUrls.push(event.body.imageUrl);
          // }
        });
    });
  }

  addNewAlbum() {
    if (this.newAlbumForm.invalid) {
      return
    }
    let body = {
      email_id: this.user.email_id,
      album_name: this.newAlbumForm.controls.albumName.value,
      no_of_photos: 1,
      photo_url: "image1.jpg"
    }
    this.photosService.addNewAlbum(body).subscribe(data => {
    },
      error => {

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
