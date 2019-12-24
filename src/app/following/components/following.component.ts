import { Component, OnInit, TemplateRef } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers, SearchedMembers } from '../../community/models/followingMembers'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  searchedMembers: SearchedMembers[];
  noSearchedMembers: boolean;
  searchedMembersPresent: boolean;
  followReqstResponse: any;
  submitfollowNewUsersForm = false;
  searchText: string;
  allFollowingMembersList: FollowingMembers[];
  allFollowerMembersList: FollowerMembers[];

  constructor(private followingService: FollowingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.followNewUsersForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.getFollowingMembers();
    this.getFollowerMembers();
  }

  public user = Utils.GetCurrentUser();

  get g() { return this.followNewUsersForm.controls }

  getFollowingMembers() {
    this.loading = true;
    this.followingService.getFollowingMembers(this.user.member_id).subscribe(data => {
      this.allFollowingMembersList = data['data'];
      this.followingMembersList = [];
      for (let i = 0; i < this.allFollowingMembersList.length; i++) {
        if (this.allFollowingMembersList[i].status == "accepted") {
          this.followingMembersList.push(this.allFollowingMembersList[i])
        }
      }
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
    this.followingService.getFollowerMembers(this.user.member_id).subscribe(data => {
      this.allFollowerMembersList = data['data'];
      this.followerMembersList = [];
      for (let i = 0; i < this.allFollowerMembersList.length; i++) {
        if (this.allFollowerMembersList[i].status == "accepted") {
          this.followerMembersList.push(this.allFollowerMembersList[i]);
        }
      }
      this.loading = false;
      console.log('followermembers', this.followerMembersList)
    },
      error => {
        this.loading = false;
      })
  }

  searchMembersToFollow() {
    this.submitfollowNewUsersForm = true
    if (this.followNewUsersForm.invalid) {
      return
    }
    this.submitfollowNewUsersForm = false
    this.loading = true;
    let body = {
      _fname: this.g.firstName.value,
      _lname: this.g.lastName.value,
      _city: this.g.city.value,
      _member_id: this.user.member_id
    }
    this.followingService.searchMembersToFollow(body).subscribe(data => {
      debugger;
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
    this.submitfollowNewUsersForm = false;
    this.getFollowerMembers();
    this.getFollowingMembers();
  }

  followMember(searchedMembers: SearchedMembers) {
    debugger;
    let body = {
      _member_id: searchedMembers.member_id,
      _follower_id: this.user.member_id
    }
    this.followingService.followMember(body).subscribe(data => {
      debugger;
      this.followReqstResponse = data['data'][0]
      if (this.followReqstResponse.followmembers == "alreadyRequested") {
        this.flashMessagesService.show('Follow request is already sent to this member...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      }
      else if (this.followReqstResponse.followmembers == "requested") {
        this.flashMessagesService.show('Request to follow has been sent successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      else if (this.followReqstResponse.followmembers == "alreadyAccepted") {
        this.flashMessagesService.show('You are already following this member...', { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      else if (this.followReqstResponse.followmembers == "alreadyIgnored") {
        this.flashMessagesService.show('Member has already ignored your request...', { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
    },
      error => {

      })
  }


  unfollowMember(id: number) {
    debugger;
    let body = {
      _member_id: id,
      _follower_id: this.user.member_id,
      _action: 'unfollow'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      debugger;
      if (data['data'][0]['acceptignorefollowrequests'] == "success") {
        this.flashMessagesService.show(`You have successfully unfollowed the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      this.getFollowingMembers();
    },
      error => {

      })
  }

  blockMember(id: string) {
    let body = {
      _member_id: id,
      _follower_id: this.user.member_id,
      _action: 'blocked'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      if (data['data'][0]['acceptignorefollowrequests'] == "success") {
        this.flashMessagesService.show(`You have successfully blocked the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
    },
      error => {

      })

  }

}
