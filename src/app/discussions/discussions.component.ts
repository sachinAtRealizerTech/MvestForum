import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from './Services/discussions.service';
import { categoryList } from '../models/discussions'

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  categoryList: categoryList[] = [];
  searchText:any;

  constructor(private discussionsService: DiscussionsService) { }

  ngOnInit() {
    this.getAllCategories()
  }

  getAllCategories() {
    this.discussionsService.getAllCategories().subscribe(data => {
      this.categoryList = data['data'];
      console.log(this.categoryList);
    })
  }

}
