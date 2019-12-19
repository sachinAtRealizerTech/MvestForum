import { Component, OnInit } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers } from '../../community/models/followingMembers'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followingMembersList: FollowingMembers[];
  followerMembersList: FollowerMembers[];
  loading = false;

  constructor(private followingService: FollowingService) { }

  ngOnInit() {
    this.getFollowingMembers();
    this.getFollowerMembers();
  }

  public user = Utils.GetCurrentUser();

  getFollowingMembers() {
    this.loading = true;
    this.followingService.getFollowingMembers(this.user.member_id = 214).subscribe(data => {
      this.followingMembersList = data['data'];
      this.loading = false;
      console.log('followingmembers', this.followingMembersList);
    },
      error => {
        console.log(error);
        this.loading = false;
      })
  }

  getFollowerMembers() {
    this.followingService.getFollowerMembers(this.user.member_id = 215).subscribe(data => {
      this.followerMembersList = data['data'];
      this.loading = false;
      console.log('followermembers', this.followerMembersList)
    },
      error => {
        this.loading = false;
      })
  }

}
