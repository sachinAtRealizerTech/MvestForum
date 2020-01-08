import { Component, OnInit } from '@angular/core';
import { FollowingService } from 'src/app/following/services/following.service';
import { environment } from 'src/environments/environment';
import { FollowingMembers, FollowerMembers } from 'src/app/community/models/followingMembers';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-mvest-user-following',
  templateUrl: './mvest-user-following.component.html',
  styleUrls: ['./mvest-user-following.component.scss']
})
export class MvestUserFollowingComponent implements OnInit {
  emailId: string;
  memberId: number;
  loading: boolean;
  searchText: any;
  allFollowingMembersList: FollowingMembers[];
  followingMembersList: FollowingMembers[];
  allFollowerMembersList: FollowerMembers[];
  followerMembersList: FollowerMembers[];
  allMyFollowingMembersList: FollowingMembers[];
  myFollowingMembersList: FollowingMembers[];

  constructor(private followingService: FollowingService) { }

  ngOnInit() {
    this.emailId = localStorage.getItem('userEmailId');
    this.memberId = Number(localStorage.getItem('userMemberId'));
    this.getUserFollowingList();
    this.getFollowerMembers();
    this.getMyFollowingMembers();
  }

  public user = Utils.GetCurrentUser();

  getUserFollowingList() {
    this.loading = true;
    this.followingService.getFollowingMembers(this.memberId).subscribe(data => {
      this.allFollowingMembersList = data['data'];
      this.followingMembersList = [];
      for (let i = 0; i < this.allFollowingMembersList.length; i++) {
        if (this.allFollowingMembersList[i].status == "accepted") {
          this.followingMembersList.push(this.allFollowingMembersList[i])
        }
      }
      this.followingMembersList.forEach((el) => { el.email_id = environment.IMAGEPREPENDURL + el.email_id + '.png' })
      this.loading = false;
      console.log('allfollowingmembers', this.allFollowingMembersList);
      console.log('followingmembers', this.followingMembersList);
    },
      error => {
        console.log(error);
        this.loading = false;
      })
  }

  getFollowerMembers() {
    this.followingService.getFollowerMembers(this.memberId).subscribe(data => {
      this.allFollowerMembersList = data['data'];
      this.followerMembersList = [];
      for (let i = 0; i < this.allFollowerMembersList.length; i++) {
        if (this.allFollowerMembersList[i].status == "accepted") {
          this.followerMembersList.push(this.allFollowerMembersList[i]);
        }
      }
      this.followerMembersList.forEach((el) => { el.email_id = environment.IMAGEPREPENDURL + el.email_id + '.png' })
      this.loading = false;
      console.log('followermembers', this.followerMembersList)
    },
      error => {
        this.loading = false;
      })
  }

  getMyFollowingMembers() {
    this.followingService.getFollowingMembers(this.user.member_id).subscribe(data => {
      this.allMyFollowingMembersList = data['data'];
      this.myFollowingMembersList = [];
      for (let i = 0; i < this.allMyFollowingMembersList.length; i++) {
        if (this.allMyFollowingMembersList[i].status == "accepted") {
          this.myFollowingMembersList.push(this.allMyFollowingMembersList[i])
        }
      }
      console.log('allfollowingmembers', this.allMyFollowingMembersList);
      console.log('followingmembers', this.myFollowingMembersList);
    },
      error => {
        console.log(error);
      }
    )
  }


  isMemberFollowingMe(emailId: string) {
    let newEmailId = emailId.replace(environment.IMAGEPREPENDURL, "");
    let trueEmailId = newEmailId.replace('.png', "")
    if (this.myFollowingMembersList) {
      let emailIdsList = this.myFollowingMembersList.map(l => l.email_id);
      return emailIdsList.includes(trueEmailId);
    }
    else {
      return false
    }

  }

}
