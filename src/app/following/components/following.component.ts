import { Component, OnInit, TemplateRef } from '@angular/core';
import { FollowingService } from '../services/following.service';
import { Utils } from 'src/app/shared/Utils';
import { FollowingMembers, FollowerMembers, SearchedMembers } from '../../community/models/followingMembers'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  unfollowMemberModal: TemplateRef<any>;
  unfollowMemberId: number;
  blockMemberModal: TemplateRef<any>;
  blockMemberId: number;
  AllFollowerMembers: FollowerMembers[];
  blockedMembers: any[];
  unblockMemberModal: TemplateRef<any>;
  unblockMemberId: number;
  imagePrepend: string;
  png: string;

  constructor(private followingService: FollowingService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.followNewUsersForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required]
    });

    this.imagePrepend = environment.IMAGEPREPENDURL;
    this.png = '.png?' + new Date().getTime();

    this.getFollowingMembers();
    this.getFollowerMembers();
    this.getBlockedMembers();
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
    if (searchedMembers.email_id == this.user.email_id) {
      this.flashMessagesService.show('You cannot follow yourself...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      return
    }
    let body = {
      _member_id: searchedMembers.member_id,
      _follower_id: this.user.member_id
    }
    this.followingService.followMember(body).subscribe(data => {
      debugger;
      this.followReqstResponse = data['data'][0]
      if (this.followReqstResponse.followmembers == "alreadyRequested") {
        this.flashMessagesService.show('Follow request has been already sent to this member...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      }
      else if (this.followReqstResponse.followmembers == "requested") {
        this.flashMessagesService.show('Follow request has been sent successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 })
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


  openUnfollowMemberModal(unfollwMemberModal: TemplateRef<any>, id: number) {
    this.unfollowMemberId = id;
    this.unfollowMemberModal = unfollwMemberModal
    this.modalService.open(this.unfollowMemberModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    })
  }

  closeUnfollowMemberModal() {
    this.modalService.dismissAll(this.unfollowMemberModal)
  }


  unfollowMember() {
    debugger;
    let body = {
      _member_id: this.unfollowMemberId,
      _follower_id: this.user.member_id,
      _action: 'unfollow'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      debugger;
      this.flashMessagesService.show(`You have successfully unfollowed the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.closeUnfollowMemberModal();
      this.getFollowingMembers();
    },
      error => {
        this.closeUnfollowMemberModal();
      })
  }

  openBlockMemberModal(blockMemberModal: TemplateRef<any>, id: number) {
    this.blockMemberModal = blockMemberModal;
    this.blockMemberId = id;
    this.modalService.open(this.blockMemberModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeBlockMemberModal() {
    this.modalService.dismissAll(this.blockMemberModal)
  }


  blockMember() {
    debugger;
    let body = {
      _member_id: this.user.member_id,
      _follower_id: this.blockMemberId,
      _action: 'blocked'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      console.log(data)
      this.flashMessagesService.show(`You have successfully blocked the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.getFollowerMembers();
      this.getBlockedMembers();
      this.closeBlockMemberModal();
    },
      error => {

      })

  }

  getBlockedMembers() {
    this.loading = true
    this.followingService.getFollowerMembers(this.user.member_id).subscribe(data => {
      debugger;
      this.AllFollowerMembers = data['data'];
      this.blockedMembers = [];
      for (let i = 0; i < this.AllFollowerMembers.length; i++) {
        if (this.AllFollowerMembers[i].status == "blocked") {
          debugger;
          this.blockedMembers.push(this.AllFollowerMembers[i]);
        }
      }
      this.loading = false;
      console.log('blockedmembers', this.blockedMembers)
    },
      error => {
        this.loading = false;
      })
  }


  openUnBlockMemberModal(blockMemberModal: TemplateRef<any>, id: number) {
    this.unblockMemberModal = blockMemberModal;
    this.unblockMemberId = id;
    this.modalService.open(this.unblockMemberModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeUnblockMemberModal() {
    this.modalService.dismissAll(this.unblockMemberModal)
  }

  unblockMember() {
    let body = {
      _member_id: this.user.member_id,
      _follower_id: this.unblockMemberId,
      _action: 'accepted'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      console.log(data)
      this.flashMessagesService.show(`You have successfully unblocked the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.getFollowerMembers();
      this.getBlockedMembers();
      this.closeUnblockMemberModal();

    },
      error => {

      })
  }

  goToMvestUserPage(inputEmailId: string, memberId: number) {
    debugger;
    let trueEmailId = inputEmailId.replace(environment.IMAGEPREPENDURL, "");
    trueEmailId = trueEmailId.replace('.png', "");
    this.router.navigate(['/mvest-user-profile/mvest-user'], { state: { emailId: trueEmailId, memberId: memberId } })
  }

}
