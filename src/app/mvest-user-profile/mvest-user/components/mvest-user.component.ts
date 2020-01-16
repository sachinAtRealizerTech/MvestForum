import { Component, OnInit } from '@angular/core';
import { Utils } from '../../../shared/Utils';
import { ProfileService } from 'src/app/community/profile/services/profile.service';
import { CommunityStats } from 'src/app/community/models/communitystats';
import { environment } from 'src/environments/environment';
import { RecentDiscussions } from 'src/app/community/profile/models/recentDiscussions';
import { RecentPhotos } from 'src/app/community/profile/models/recentPhotos';
import { MyNews } from 'src/app/community/profile/models/myNews';
import { Router } from '@angular/router';
import { FollowingService } from 'src/app/community/following/services/following.service';
import { FollowingMembers } from 'src/app/community/models/followingMembers';
import { NeighborsService } from 'src/app/neighbors/services/neighbors.service';
import { MvestUserProfileService } from 'src/app/mvest-user-profile/services/mvest-user-profile.service';
import { UserDetails } from 'src/app/mvest-user-profile/models/userdetails';

@Component({
  selector: 'app-mvest-user',
  templateUrl: './mvest-user.component.html',
  styleUrls: ['./mvest-user.component.scss']
})
export class MvestUserComponent implements OnInit {
  userEmailId: string;
  memberId: number;
  communityStats: CommunityStats;
  recentDiscussions: RecentDiscussions[];
  recentPhotos: RecentPhotos[];
  loading = false;
  MyNews: MyNews[];
  allFollowingMembersList: FollowingMembers[];
  followingMembersList: FollowingMembers[];
  myConnectedNeighbors: any;
  acceptedRequests: any;
  userDetails: UserDetails;
  userName: string;
  imageUrl: string;
  imagePrependUrl: string;
  png: string;


  constructor(private profileService: ProfileService,
    private router: Router,
    private followingService: FollowingService,
    private neighborsService: NeighborsService,
    private mvestUserProfileService: MvestUserProfileService) { }

  ngOnInit() {
    debugger;
    this.imagePrependUrl = environment.IMAGEPREPENDURL;
    this.png = '.png?' + new Date().getTime();
    if (history.state.emailId && history.state.memberId) {
      localStorage.setItem('userEmailId', history.state.emailId);
      this.userEmailId = localStorage.getItem('userEmailId');
      localStorage.setItem('userMemberId', history.state.memberId)
      this.memberId = Number(localStorage.getItem('userMemberId'));
    }
    else {
      this.userEmailId = localStorage.getItem('userEmailId');
      this.memberId = Number(localStorage.getItem('userMemberId'));
    }
    console.log(this.userEmailId, this.memberId);
    //this.userName = localStorage.getItem('otherUserName');
    this.getMvestUserDetails();
    this.getMyFollowingMembers();
    this.getMyConnectedNeighbors();
    this.getCommunityStats();
    this.getRecentDiscussionsAndPhotos();
    this.getUserNews();
  }

  public user = Utils.GetCurrentUser();

  // getMvestUserProfile() {
  //   this.mvestUserProfileService.getMvestUserDetails(this.memberId).subscribe(data => {
  //     this.userDetails = data['data'][0];
  //     localStorage.setItem('otherUserName', this.userDetails.name)
  //     this.name = localStorage.getItem('otherUserName');
  //     localStorage.setItem('otherUserTagLine', this.userDetails.tag_line)
  //     this.tagLine = localStorage.getItem('otherUserTagLine');
  //     console.log('user prof details', this.userDetails);
  //     this.userImageUrl = environment.IMAGEPREPENDURL + this.userEmailId + '.png';
  //   })
  // }

  getMvestUserDetails() {
    let body = {
      _member_id: this.user.member_id,
      _other_member_id: this.memberId
    }
    this.mvestUserProfileService.getMvestUserDetails(body).subscribe(data => {
      debugger;
      this.userDetails = data['data'][0];
    })
  }

  getCommunityStats() {
    this.profileService.getCommunityStats(this.userEmailId).subscribe(data => {
      this.communityStats = data;
      console.log('commstats', this.communityStats)
    },
      error => {

      })
  }

  getRecentDiscussionsAndPhotos() {
    this.profileService.getRecentDiscussionsAndPhotos(this.userEmailId).subscribe(data => {
      this.recentDiscussions = [];
      this.recentPhotos = [];
      if (data['RD']) {
        this.recentDiscussions = data['RD']['recent_discussions'];
        this.recentDiscussions.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
      }
      if (data['RP']) {
        this.recentPhotos = data['RP']['recent_photos'];
        this.recentPhotos.forEach((el) => { el.thumbnail_file_name = environment.IMAGEPREPENDURL + el.thumbnail_file_name });
        this.recentPhotos.sort((a, b) => new Date(b.create_ts).getTime() - new Date(a.create_ts).getTime())
      }
    },
      error => {
      })
  }

  getUserNews() {
    this.loading = true;
    this.profileService.getMyNews(this.user.member_id).subscribe(data => {
      console.log('mynews', data)
      this.MyNews = data;
      if (this.MyNews) {
        this.MyNews.reverse();
      }
      // this.MyNews.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }

  goToDiscussionLink(url: string) {
    url = url.replace(environment.BaseLinkUrl, "");
    this.router.navigateByUrl(url)
  }

  getMyFollowingMembers() {
    this.followingService.getFollowingMembers(this.user.member_id).subscribe(data => {
      this.allFollowingMembersList = data['data'];
      this.followingMembersList = [];
      for (let i = 0; i < this.allFollowingMembersList.length; i++) {
        if (this.allFollowingMembersList[i].status == "accepted") {
          this.followingMembersList.push(this.allFollowingMembersList[i])
        }
      }
      console.log('allfollowingmembers', this.allFollowingMembersList);
      console.log('followingmembers', this.followingMembersList);
    },
      error => {
        console.log(error);
      }
    )
  }

  isFollowingUser() {
    let followingEmailIds = this.followingMembersList.map(el => el.email_id);
    return followingEmailIds.includes(this.userEmailId);
  }

  getMyConnectedNeighbors() {
    let body = {
      _member_id: this.user.member_id,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      debugger;
      this.myConnectedNeighbors = data['data']
      console.log('connected neb', data['data']);
    },
      error => {
        console.log('getallmemberneighbor error', error)
      })
  }

  isConnectedToUser() {
    let connectedEmailIds = this.myConnectedNeighbors.map(l => l.neighbor_email_id);
    return connectedEmailIds.includes(this.userEmailId);
  }



}
