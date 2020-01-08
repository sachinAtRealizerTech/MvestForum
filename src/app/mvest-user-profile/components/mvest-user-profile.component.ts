import { Component, OnInit } from '@angular/core';
import { FollowingService } from 'src/app/following/services/following.service';
import { FollowingMembers } from 'src/app/community/models/followingMembers';
import { NeighborsService } from 'src/app/neighbors/services/neighbors.service';
import { Utils } from '../../shared/Utils';
import { MvestUserProfileService } from '../services/mvest-user-profile.service';
import { UserDetails } from '../models/userdetails';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mvest-user-profile',
  templateUrl: './mvest-user-profile.component.html',
  styleUrls: ['./mvest-user-profile.component.scss']
})
export class MvestUserProfileComponent implements OnInit {
  allFollowingMembersList: FollowingMembers[] = [];
  followingMembersList: FollowingMembers[] = [];
  userEmailId: string;
  memberId: number;
  myConnectedNeighbors: any[] = [];
  userDetails: UserDetails;
  userImageUrl: string;
  name: string;
  tagLine: string;
  isConnectedToMe: boolean;
  isConnect: boolean;
  isFollow: string;

  constructor(private followingService: FollowingService,
    private neighborsService: NeighborsService,
    private mvestUserProfileService: MvestUserProfileService) { }

  ngOnInit() {
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
    this.getMvestUserProfile();
    this.getMyFollowingMembers();
    this.getMyConnectedNeighbors();
  }

  public user = Utils.GetCurrentUser();

  getMvestUserProfile() {
    let body = {
      _member_id: this.user.member_id,
      _other_member_id: this.memberId
    }
    this.mvestUserProfileService.getMvestUserDetails(body).subscribe(data => {
      debugger;
      this.userDetails = data['data'][0];
      this.name = this.userDetails.user_name;
      this.tagLine = this.userDetails.tag_line;
      this.isConnect = this.userDetails.is_neighbor;
      this.isFollow = this.userDetails.follow_status
      console.log('user prof details', data);
      this.userImageUrl = environment.IMAGEPREPENDURL + this.userEmailId + '.png';
    })
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
    if (this.followingMembersList.length > 0) {
      let followingEmailIds = this.followingMembersList.map(el => el.email_id);
      return followingEmailIds.includes(this.userEmailId);
    }
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
    if (this.myConnectedNeighbors.length > 0) {
      let connectedEmailIds = this.myConnectedNeighbors.map(l => l.neighbor_email_id);
      return connectedEmailIds.includes(this.userEmailId);
    }
  }

}
