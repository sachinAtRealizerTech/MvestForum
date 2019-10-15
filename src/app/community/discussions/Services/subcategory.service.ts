import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  subcat_id:any;
  subCatName:string;
  category_id:any;
  category_name:any;

  constructor(private httpClient: HttpClient) { }

  getSubcategory(id: string) {
    return this.httpClient.get(environment.APIBASEURL + '/MasterData/subcategory/' + id).pipe(map(data=>{
      return data
    }))
  }

  postQuestion(body){
    return this.httpClient.post(environment.APIBASEURL+'/Discussion',body,httpOptions)
  }

  sendData(subcat_id:any,subCatName:string,category_id:any,category_name:any){
    this.subcat_id=subcat_id,
    this.subCatName=subCatName,
    this.category_id=category_id,
    this.category_name=category_name
  }
  
}
