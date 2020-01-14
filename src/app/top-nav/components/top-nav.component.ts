import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { Utils } from '../../shared/Utils';
import { Router, ActivatedRoute } from '@angular/router';
import { SigninService } from '../../authentication/sign-in/services/signin.service';
import { TopNavService } from '../services/top-nav.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { searchData } from '../../shared/models/search'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  userName: string;
  searchForm: FormGroup
  searchText: string;
  searchedData: any = [];
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
  oldSearchText: string;
  newSearchText: string;
  searchedDataSession: string;
  searchTextString: string[];
  searchFirstText: string;
  searchDataArray: string[] = [];
  newSearchTextArray: string[];
  myNotifications: any;
  myCommunityNotifications: any[];
  myNeighborsNotifications: any[];
  userImageUrl: string;
  unreadDiscussionCount: number;
  imagePrependUrl: string;
  png: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private signinService: SigninService,
    private topNavService: TopNavService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchText: []
    });
    this.getMyNotifications(this.user.email_id);
    // this.userImageUrl = environment.IMAGEPREPENDURL + this.user.email_id + '.png' + '?' + new Date().getTime();
    this.imagePrependUrl = environment.IMAGEPREPENDURL;
    this.png = '.png?' + new Date().getTime();
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
      console.log('mynotifications', data);
      this.myNotifications = data;
      this.myNotifications.sort((a, b) => new Date(b.Notifications.Date).getTime() - new Date(a.Notifications.Date).getTime());
      this.myCommunityNotifications = [];
      this.myNeighborsNotifications = [];
      for (let i = 0; i < this.myNotifications.length; i++) {
        if (this.myNotifications[i]['Notifications']['Feature'] == "Community" && this.myNotifications[i]['Notifications']['Status'] == "Unread") {
          this.myCommunityNotifications.push(this.myNotifications[i]);
          console.log('myCommunityNotifications', this.myCommunityNotifications)
        }
        else if (this.myNotifications[i]['Notifications']['Feature'] == "Neighbors" && this.myNotifications[i]['Notifications']['Status'] == "Unread") {
          this.myNeighborsNotifications.push(this.myNotifications[i])
        }
      }
      if (this.myCommunityNotifications || this.myNeighborsNotifications) {
        this.unreadDiscussionCount = this.myCommunityNotifications.length + this.myNeighborsNotifications.length
      }
      else {
        this.unreadDiscussionCount = 0
      }
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
    if (this.searchText == "") {
      this.loading = false;
      this.threeChars = true;
      this.searchedDataSession = "";
      this.searchedData = []
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
      sessionStorage.removeItem("searchedData");
      this.searchedData = []
    }
    else {
      this.loading = true;
    }
    if (this.searchText.length < 3) {
      this.threeChars = true;
      this.searchedData = [];
      return
    }
    this.threeChars = false;
    this.searchedDataSession = sessionStorage.getItem("searchedData")
    console.log('searchedDataSession', this.searchedDataSession)

    if (this.searchedData.length == 0) {
      this.searchTextString = this.searchText.split(" ");
      this.searchFirstText = this.searchTextString[0];
      this.topNavService.getSearchResult(this.searchFirstText).subscribe(data => {
        debugger;
        this.loading = false;
        this.searchedData = data;
        sessionStorage.setItem("searchedData", JSON.stringify(this.searchedData))
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
    else {
      debugger;
      let i = this.searchText.indexOf(' ');
      this.oldSearchText = this.searchText.substring(0, i);
      console.log("oldtext", this.oldSearchText);
      this.newSearchText = this.searchText.substring(i);
      console.log("newtext", this.newSearchText)
      for (let i = 0; i < this.searchedData.length; i++) {
        if (this.searchedData[i].body.includes(this.newSearchText)) {
          this.communitySearchedData.push(this.searchedData[i])
        }
      }
      sessionStorage.setItem("searchedData", JSON.stringify(this.communitySearchedData))
      this.loading = false;
    }

    // else {
    //   debugger;

    //   this.searchDataArray = this.searchedData.map(l => l.body)
    //   console.log('searchDataArray', this.searchDataArray);
    //   let i = this.searchText.indexOf(' ');
    //   this.oldSearchText = this.searchText.substring(0, i + 1);
    //   console.log("oldtext", this.oldSearchText);
    //   this.newSearchText = this.searchText.substring(i);
    //   console.log("newtext", this.newSearchText);
    //   this.newSearchTextArray = this.newSearchText.split(" ");
    //   this.communitySearchedData = [];
    //   for (let i = 0; i < this.newSearchTextArray.length; i++) {
    //     for (let j = 0; j < this.searchDataArray.length; j++) {
    //       if (this.searchDataArray[j].includes(this.newSearchTextArray[i])) {
    //         this.communitySearchedData.push(this.searchedData[i])
    //       }
    //     }
    //   }

    //   sessionStorage.setItem("searchedData", JSON.stringify(this.communitySearchedData))
    //   this.loading = false;
    // }

  }

  goToSearchResultPage(searchType: string) {
    this.searchType = searchType
    this.showSearch = false;
    this.router.navigate(['/searchresults'], { queryParams: { searchType: this.searchType } })
  }

  goToSearchLink(url: string) {
    debugger;
    url = url.replace(environment.BaseLinkUrl, "");
    this.router.navigateByUrl(url)
    this.showSearch = false;
  }

  escapeSearch() {
    this.showSearch = false;
    this.searchText = "";
    this.searchedData = [];
    this.searchedDataSession = "";
    this.searchForm.controls.searchText.patchValue("");
  }


}
