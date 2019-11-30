import { Component, OnInit } from '@angular/core';
import { TopNavService } from '../top-nav/top-nav.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {
  searchedData: any;
  searchText: string;

  constructor(private topNavService: TopNavService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText']
    })

    this.getSearchResult(this.searchText)
  }

  getSearchResult(id: string) {
    this.topNavService.getSearchResult(id).subscribe(data => {
      this.searchedData = data;
    })
  }

}
