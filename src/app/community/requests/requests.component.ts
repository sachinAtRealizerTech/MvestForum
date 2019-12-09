import { Component, OnInit } from '@angular/core';
import { NeighborsService } from 'src/app/neighbors/neighbors.service';
import { Utils } from 'src/app/shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  myConnectRequests: any;
  receivedRequest: any[] = [];

  constructor(private neighborsService: NeighborsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getMyConnectRequests();
  }

  public user = Utils.GetCurrentUser();

  getMyConnectRequests() {
    debugger;
    this.neighborsService.getMyConnectRequests(this.user.member_id).subscribe(data => {
      this.myConnectRequests = data['data'];
      console.log('myconnectrequests', this.myConnectRequests)

      // for (let i = 0; i < this.myConnectRequests.length; i++) {
      //   if (this.myConnectRequests[i]['status'] == 'reqReceieved') {
      //     this.receivedRequest.push(this.myConnectRequests[i])
      //   }
      // }

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
      if (data['data']['accept_or_ignore_neighbors_req'] == "success") {
        this.flashMessagesService.show(`You have successfully got connected`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      else {
        this.flashMessagesService.show(`Sorry, You can not connect with the member yet...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
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
      if (data['data']['accept_or_ignore_neighbors_req'] == "success") {
        this.flashMessagesService.show(`You have successfully declined the connect request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      else {
        this.flashMessagesService.show(`You are not successful in declining the connect request...`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      }
      this.getMyConnectRequests()
    })
  }

}
