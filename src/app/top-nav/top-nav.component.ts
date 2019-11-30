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
  doneTypingInterval = 1000
  typingTimer: any
  communitySearchedData: any[];
  leaseSearchedData: any[];
  newsSearchedData: any[];
  wellsSearchedData: any[];
  showSearch = false;

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

  setTimeoutForSearch() {

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
  }

  getSearchResult() {
    this.searchText = this.searchForm.controls.searchText.value;
    this.communitySearchedData = [];
    this.newsSearchedData = [];
    this.leaseSearchedData = [];
    this.wellsSearchedData = [];
    this.topNavService.getSearchResult(this.searchText).subscribe(data => {
      debugger;
      this.showSearch = true;
      this.searchedData = data;
      console.log('searchedata', this.searchedData)
      for (let i = 0; i < this.searchedData.length; i++) {
        debugger;
        if (this.searchedData[i]['w']['sd'][0]['sf'] == "community") {
          console.log('ccs', this.searchedData[i]['w']['sd'][0])
          this.communitySearchedData.push(this.searchedData[i]['w']['sd'][0])
        }
        if (this.searchedData[i]['w']['sd'][0]['sf'] == "lease") {
          console.log('ccs', this.searchedData[i]['w']['sd'][0])
          this.leaseSearchedData.push(this.searchedData[i]['w']['sd'][0])
        }
        if (this.searchedData[i]['w']['sd'][0]['sf'] == "news") {
          console.log('ccs', this.searchedData[i]['w']['sd'][0])
          this.newsSearchedData.push(this.searchedData[i]['w']['sd'][0])
        }
        if (this.searchedData[i]['w']['sd'][0]['sf'] == "wells") {
          console.log('ccs', this.searchedData[i]['w']['sd'][0])
          this.wellsSearchedData.push(this.searchedData[i]['w']['sd'][0])
        }
      }
      console.log('communitySearchedData', this.communitySearchedData)
    })
  }

  goToSearchResultPage() {
    this.showSearch = false;
    this.router.navigate(['/searchresults'])
  }

}
