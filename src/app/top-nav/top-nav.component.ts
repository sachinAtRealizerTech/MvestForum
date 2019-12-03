import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { Utils } from '../shared/Utils';
import { Router, ActivatedRoute } from '@angular/router';
import { SigninService } from '../authentication/sign-in/services/signin.service';
import { TopNavService } from './top-nav.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  userName: string;
  searchForm: FormGroup
  searchText: any;
  searchedData: any;
  doneTypingInterval = 500
  typingTimer: any
  communitySearchedData: any[];
  leaseSearchedData: any[];
  newsSearchedData: any[];
  wellsSearchedData: any[];
  showSearch = false;
  searchType: string;
  loading = false;
  threeChars = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private signinService: SigninService,
    private topNavService: TopNavService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchText: []
    })
  }

  public user = Utils.GetCurrentUser();

  // public userProfile = Utils.getCurrentUserProfileDetails();

  public accesstoken = Utils.GetAccessToken()

  logout() {
    this.signinService.logout();
  }

  getNotificationMasterEntries() {
    this.topNavService.getNotificationMasterEntries().subscribe(data => {
      console.log('notificationmaster', data);
    })
  }

  getMyNotifications(email: string) {
    this.topNavService.getMyNotifications(email).subscribe(data => {
      console.log('mynotifications', data)
    })
  }

  setTimeoutForSearch(event) {
    this.communitySearchedData = [];
    this.newsSearchedData = [];
    this.leaseSearchedData = [];
    this.wellsSearchedData = [];
    if (event.key == "Escape") {
      this.escapeSearch();
      return
    }
    this.showSearch = true;
    this.loading = true;
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.getSearchResult()
    }, this.doneTypingInterval)

  }

  resetTimeoutForSearch() {

    clearTimeout(this.typingTimer)
  }

  onClickedOutside(e: Event) {
    this.showSearch = false;
    this.loading = false;
  }

  getSearchResult() {
    debugger;
    this.searchText = this.searchForm.controls.searchText.value;
    if (this.searchText == "") {
      this.loading = false;
      this.threeChars = true;
    }
    else {
      this.loading = true;
    }
    if (this.searchText.length < 3) {
      this.threeChars = true;
      return
    }
    this.threeChars = false;
    this.topNavService.getSearchResult(this.searchText).subscribe(data => {
      debugger;
      this.loading = false;
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

  goToSearchResultPage(searchType: string) {
    this.searchType = searchType
    this.showSearch = false;
    this.router.navigate(['/searchresults'], { queryParams: { searchText: this.searchText, searchType: this.searchType } })
  }

  goToSearchLink(url: string) {
    debugger;
    url = url.slice(31)
    this.router.navigateByUrl(url)
    this.showSearch = false;
  }

  escapeSearch() {
    this.showSearch = false;
    this.searchText = "";
    this.searchForm.controls.searchText.patchValue("");
  }

  replaceHtml(s: string) {
    debugger;
    return s.replace(/<[^>]*>/, '');
  }

}
