import { Component, OnInit, TemplateRef } from '@angular/core';
import { FollowingService } from '../following/services/following.service';
import { Utils } from '../shared/Utils';
import { FollowerMembers } from '../community/models/followingMembers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  blockedMembers: FollowerMembers[];
  AllFollowerMembers: FollowerMembers[];
  loading = false;
  unblockMemberModal: TemplateRef<any>;
  unblockMemberId: number;

  constructor(private followingService: FollowingService,
    private modalService: NgbModal,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getBlockedMmbers();
  }

  public user = Utils.GetCurrentUser();

  getBlockedMmbers() {
    this.loading = true
    this.followingService.getFollowerMembers(this.user.member_id).subscribe(data => {
      this.AllFollowerMembers = data;
      this.blockedMembers = [];
      for (let i = 0; i < this.AllFollowerMembers.length; i++) {
        if (this.AllFollowerMembers[i].status == "blocked") {
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
      _member_id: this.unblockMemberId,
      _follower_id: this.user.member_id,
      _action: 'unblocked'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      if (data['data'][0]['acceptignorefollowrequests'] == "success") {
        this.flashMessagesService.show(`You have successfully unblocked the Member...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
        this.getBlockedMmbers();
        this.closeUnblockMemberModal();
      }
    },
      error => {

      })

  }

}
