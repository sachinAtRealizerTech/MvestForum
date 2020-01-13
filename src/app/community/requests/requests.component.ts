import { Component, OnInit, TemplateRef } from '@angular/core';
import { NeighborsService } from '../../neighbors/services/neighbors.service';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FollowingService } from 'src/app/following/services/following.service';
import { FollowRequest, SearchedMembers } from '../models/followingMembers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  myConnectRequests: any[];
  followRequest: FollowRequest[];
  loading = false;
  followReqstResponse: any;
  followBack = false;
  followMemberModal: TemplateRef<any>;
  followBackMemberId: number;
  imagePrepend: string;
  png: string;

  constructor(private neighborsService: NeighborsService,
    private flashMessagesService: FlashMessagesService,
    private followingService: FollowingService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.imagePrepend = environment.IMAGEPREPENDURL;
    this.png = '.png'
    this.getMyConnectRequests();
    this.getMyFollowRequest();
  }

  public user = Utils.GetCurrentUser();

  getMyConnectRequests() {
    debugger;
    this.loading = true;
    this.neighborsService.getMyConnectRequests(this.user.member_id).subscribe(data => {
      this.myConnectRequests = data['data'];
      this.loading = false;
      console.log('myconnectrequests', this.myConnectRequests)
    },
      error => {
        this.loading = false;
      })
  }

  acceptConnectRequest(reqData: any) {
    debugger;
    let body = {
      _memberid: this.user.member_id,
      _nebid: reqData.neighbor_id,
      _status: "accepted"
    }
    this.neighborsService.acceptConnectRequest(body).subscribe(data => {
      debugger;
      this.flashMessagesService.show(`You have successfully got connected`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.getMyConnectRequests()
    })
  }

  ignoreConnectRequest(reqData: any) {
    let body = {
      _memberid: this.user.member_id,
      _nebid: reqData.neighbor_id,
      _status: "ignore"
    }
    this.neighborsService.acceptConnectRequest(body).subscribe(data => {
      debugger;
      this.flashMessagesService.show(`You have successfully declined the connect request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.getMyConnectRequests()
    })
  }

  getMyFollowRequest() {
    debugger;
    this.loading = true;
    this.followingService.getMyFollowRequest(this.user.member_id).subscribe(data => {
      this.followRequest = data['data'];
      this.loading = false;
      console.log('followrequest', this.followRequest)
    },
      error => {
        this.loading = false;
      })
  }

  acceptFollowRequest(id: number) {
    debugger;
    let body = {
      _member_id: this.user.member_id,
      _follower_id: id,
      _emailid: this.user.email_id,
      _action: 'accepted'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      debugger;
      console.log('followingresponseaccept', data)
      this.flashMessagesService.show(`You have successfully accepted the follow request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getMyFollowRequest();
    },
      error => {
      })

  }


  ignoreFollowRequest(id: number) {
    let body = {
      _member_id: this.user.member_id,
      _follower_id: id,
      _emailid: this.user.email_id,
      _action: 'ignored'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      this.flashMessagesService.show(`You have successfully declined the follow request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getMyFollowRequest();
    },
      error => {

      })
  }

  openFollowMemberModal(followMemberModal: TemplateRef<any>, memberId: number) {
    this.followBackMemberId = memberId
    this.followMemberModal = followMemberModal
    this.modalService.open(this.followMemberModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    })
  }

  closefollowMemberModal() {
    this.modalService.dismissAll(this.followMemberModal);
    this.acceptFollowRequest(this.followBackMemberId);
  }


  followMember() {
    this.acceptFollowRequest(this.followBackMemberId);
    let body = {
      _member_id: this.followBackMemberId,
      _follower_id: this.user.member_id
    }
    this.followingService.followMember(body).subscribe(data => {
      this.getMyFollowRequest();
      this.modalService.dismissAll(this.followMemberModal);
    },
      error => {

      })
  }

}
