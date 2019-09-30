import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from './Services/subcategory.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  subCategoryList:any;
  categoryId:number
  constructor(private subcategoryService:SubcategoryService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
    this.getSubcategory(this.categoryId)
  }

  getSubcategory(id){
      this.subcategoryService.getSubcategory(id).subscribe(data=>{
        this.subCategoryList=data['data'];
        console.log(data['data'])
      })
  }

}
