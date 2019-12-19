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

}
