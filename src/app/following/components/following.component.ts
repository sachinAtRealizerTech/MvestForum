import { Component, OnInit, TemplateRef } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers } from '../../community/models/followingMembers'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followingMembersList: FollowingMembers[];
  followerMembersList: FollowerMembers[];
  loading = false;
  followNewUsers: TemplateRef<any>;
  followNewUsersForm: FormGroup

  constructor(private followingService: FollowingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.followNewUsersForm = this.formBuilder.group({
      searchMember: [],
      city: []
    });
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

  searchMembersToFollow() {
    this.loading = true;
    let body = {
      _fname: "SACHIN",
      _lname: "SHINDE",
      _city: "PUNE",
      _member_id: "215"
    }
    this.followingService.searchMembersToFollow(body).subscribe(data => {

    },
      error => {
        console.log(error)
      })
  }

  openFollowNewUsersModal(followNewUsers: TemplateRef<any>) {
    this.followNewUsers = followNewUsers
    this.modalService.open(this.followNewUsers, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeFollowNewUsersModal() {
    this.modalService.dismissAll(this.followNewUsers)
  }

}
