import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  OnUploadFile(selectedFile) {
    debugger;
    return this.http.post('yourdomain.com/file-upload', selectedFile)
  }
}
