import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from './discussions.service';
import {Category,CategoryDetails} from '../models/category'


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {
public categorydetails:CategoryDetails[]=[];


constructor(private discussionsService:DiscussionsService) { }

  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories(){
    debugger;
    this.discussionsService.getAllCategories().subscribe(res => {
      this.categorydetails=res[0].Categories;
    })  
  }

getCategoryName(name:string)
{
  debugger;
  this.discussionsService.getCategoryName(name.toLowerCase());
}
 


}
