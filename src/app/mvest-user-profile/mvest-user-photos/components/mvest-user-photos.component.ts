import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/photos/services/photos.service';
import { environment } from 'src/environments/environment';
import { AlbumImageList, albumList } from 'src/app/photos/models/album';

@Component({
  selector: 'app-mvest-user-photos',
  templateUrl: './mvest-user-photos.component.html',
  styleUrls: ['./mvest-user-photos.component.scss']
})
export class MvestUserPhotosComponent implements OnInit {
  emailId: string;
  memberId: number;
  loading: boolean;
  albumList: albumList[];
  albumName: string;
  albumImageList: AlbumImageList[];
  albumPhotos = true;
  leasePhotos = false;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.emailId = localStorage.getItem('userEmailId');
    this.memberId = Number(localStorage.getItem('userMemberId'));
    this.getAlbumList();
  }


  selectLease() {
    this.albumPhotos = false;
    this.leasePhotos = true;
  }

  selectAlbum() {
    this.albumPhotos = true;
    this.leasePhotos = false;
  }

  getAlbumList() {
    this.loading = true;
    this.photosService.getAlbumList(this.emailId).subscribe(data => {
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

}
