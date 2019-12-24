import { Component, OnInit } from '@angular/core';
import { TopNavService } from '../top-nav/services/top-nav.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {
  searchedData: any;
  searchText: string;
  communitySearchedData: any;
  leaseSearchedData: any;
  newsSearchedData: any;
  wellsSearchedData: any;
  searchType: string;

  constructor(private topNavService: TopNavService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.searchType = params['searchType']
    })

    this.searchedData = JSON.parse(sessionStorage.getItem("searchedData"));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //this.getSearchResult(this.searchText);
  }

  selectSearchType(event) {
    this.searchType = event.target.value
  }

  getSearchResult(id: string) {
    this.topNavService.getSearchResult(id).subscribe(data => {
      this.searchedData = data;
      console.log('searchedata', this.searchedData)
      for (let i = 0; i < this.searchedData.length; i++) {
        debugger;
        if (this.searchedData[i]['sf'] == "community") {
          console.log('ccs', this.searchedData[i])
          this.communitySearchedData.push(this.searchedData[i])
        }
        if (this.searchedData[i]['sf'] == "lease") {
          console.log('ccs', this.searchedData[i])
          this.leaseSearchedData.push(this.searchedData[i])
        }
        if (this.searchedData[i]['sf'] == "news") {
          console.log('ccs', this.searchedData[i])
          this.newsSearchedData.push(this.searchedData[i])
        }
        if (this.searchedData[i]['sf'] == "wells") {
          console.log('ccs', this.searchedData[i])
          this.wellsSearchedData.push(this.searchedData[i])
        }
      }
      console.log('communitySearchedData', this.communitySearchedData)
    })
  }

  goToSearchLink(url: string) {
    debugger;
    url = url.slice(31)
    this.router.navigateByUrl(url)
  }

}
