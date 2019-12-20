import { Component, OnInit } from '@angular/core';
import { NeighborsService } from 'src/app/neighbors/neighbors.service';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FollowingService } from 'src/app/following/services/following.service';
import { FollowRequest } from '../models/followingMembers'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  myConnectRequests: any;
  followRequest: FollowRequest[];
  loading = false;

  constructor(private neighborsService: NeighborsService,
    private flashMessagesService: FlashMessagesService,
    private followingService: FollowingService) { }

  ngOnInit() {
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
    this.loading = true;
    this.followingService.getMyFollowRequest(this.user.member_id = 215).subscribe(data => {
      this.followRequest = data['data'];
      this.loading = false;
      console.log('followrequest', this.followRequest)
    },
      error => {
        this.loading = false;
      })
  }

  acceptFollowRequest(id: number) {
    let body = {
      _member_id: this.user.member_id,
      _follower_id: id,
      _action: 'accepted'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      if (data['data']['acceptignorefollowrequests'] == "Success") {
        this.flashMessagesService.show(`You have successfully accepted the connect request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
    },
      error => {

      })

  }

  ignoreFollowRequest(id: number) {
    let body = {
      _member_id: this.user.member_id,
      _follower_id: id,
      _action: 'ignored'
    }
    this.followingService.acceptOrIgnoreFollowRequest(body).subscribe(data => {
      if (data['data']['acceptignorefollowrequests'] == "Success") {
        this.flashMessagesService.show(`You have successfully declined the connect request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
    },
      error => {

      })
  }

}
