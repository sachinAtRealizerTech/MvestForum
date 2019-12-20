import { Component, OnInit, TemplateRef } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers, SearchedMembers } from '../../community/models/followingMembers'
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
  memberFirstName: string;
  memberLastName: string;
  searchedMembers: SearchedMembers[];
  noSearchedMembers: boolean;
  searchedMembersPresent: boolean;

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

  get g() { return this.followNewUsersForm.controls }

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

  getMembersFirstAndLastName() {
    debugger;
    let fullName = this.g.searchMember.value;
    let fullNameArray = fullName.split(" ");
    this.memberFirstName = fullNameArray[0];
    this.memberLastName = fullNameArray[1];
  }

  searchMembersToFollow() {
    this.loading = true;
    let body = {
      _fname: this.memberFirstName,
      _lname: this.memberLastName,
      _city: this.g.city.value,
      _member_id: this.user.member_id
    }
    this.followingService.searchMembersToFollow(body).subscribe(data => {
      this.searchedMembers = data['data'];
      if (this.searchedMembers.length == 0) {
        this.noSearchedMembers = true
      }
      else if (this.searchedMembers.length > 0) {
        this.searchedMembersPresent = true;
      }
      this.loading = false;
      console.log('searchedmembers', this.searchedMembers)
    },
      error => {
        console.log(error);
        this.loading = false;
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
    this.modalService.dismissAll(this.followNewUsers);
    this.followNewUsersForm.reset();
    this.noSearchedMembers = false;
    this.searchedMembersPresent = false;
  }

  followMember(id: number) {
    let body = {
      _member_id: this.user.member_id,
      _follower_id: id
    }
    this.followingService.followMember(body).subscribe(data => {

    },
      error => {

      })
  }

}
