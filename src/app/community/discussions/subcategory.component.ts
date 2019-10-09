import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from './Services/subcategory.service';
import { ActivatedRoute } from '@angular/router'
import {subCategoryList} from '../../models/discussions'

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  subCategoryList: subCategoryList[]=[];
  subCategoryId: number;
  searchText:any
  constructor(private subcategoryService: SubcategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subCategoryId = params['subCategoryId'];
    });
    this.getSubcategory(this.subCategoryId)
  }

  getSubcategory(id) {
    this.subcategoryService.getSubcategory(id).subscribe(data => {
      this.subCategoryList = data['data'];
      console.log(data['data'])
    })
  }

}
