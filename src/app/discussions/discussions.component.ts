import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from './Services/discussions.service';
import {categoryList} from '../Models/forums'

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  categoryList:any;

  constructor(private discussionsService:DiscussionsService) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories(){
    this.discussionsService.getAllCategories().subscribe(data=>{
      this.categoryList=data[0].Categories;
      console.log(data[0].Categories)
    })
  }
  
}
