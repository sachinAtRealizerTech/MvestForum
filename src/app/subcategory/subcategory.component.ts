import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../subcategory/subcategory.service';
import {subcategory} from '../models/subcategory'
import{DiscussionsService} from '../discussions/discussions.service'

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {

categoryName:string;
constructor(private subcategoryService:SubcategoryService,private discussionsService:DiscussionsService) { }
public subcategory:subcategory[]=[];

  ngOnInit() {
    this.categoryName=this.discussionsService.Name;
    this.getAllSubCategory();
  }
  getAllSubCategory(){
    this.subcategoryService.getAllSubcategory(this.categoryName).subscribe(res => {
      this.subcategory=res["sub_categories"];
    }) 
  }

  getSelectedSubCategory(subcategory:string){
    this.subcategoryService.getSelectedSubCategory(subcategory);
  }
}
