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
    this.neighborsService.getMyConnectRequests("ash@gmail.com").subscribe(data => {
      this.myConnectRequests = data;
      console.log('myconnectrequests', this.myConnectRequests)
      for (let i = 0; i < this.myConnectRequests.length; i++) {
        if (this.myConnectRequests[i]['nebs']['status'] == 'reqReceieved') {
          this.receivedRequest.push(this.myConnectRequests[i])
        }
      }
    })
  }

  acceptConnectRequest(reqData: any) {
    debugger;
    let body = {
      neb_emailid: reqData.nebemail_id,
      my_emailid: this.user.email_id,
      action: "Accept"
    }
    this.neighborsService.acceptConnectRequest(body).subscribe(data => {
      this.flashMessagesService.show(`You are now connected with ${reqData.nebname}`, { cssClass: 'bg-accent flash-message', timeout: 2000 })
      alert('success')
    })
  }

  ignoreConnectRequest(reqData: any) {
    let body = {
      neb_emailid: reqData.nebemail_id,
      my_emailid: this.user.email_id,
      action: "Ignore"
    }
    this.neighborsService.acceptConnectRequest(body).subscribe(data => {
      alert('request rejected');
    })
  }

}
