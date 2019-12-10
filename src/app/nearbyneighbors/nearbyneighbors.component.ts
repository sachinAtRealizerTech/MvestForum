import { Component, OnInit } from '@angular/core';
import { NeighborsService } from '../neighbors/neighbors.service';
import { Utils } from '../shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-nearbyneighbors',
  templateUrl: './nearbyneighbors.component.html',
  styleUrls: ['./nearbyneighbors.component.scss']
})
export class NearbyneighborsComponent implements OnInit {
  leaseNumber: string;
  leaseOwnersList: any;
  leaseName: string;
  districtNumber: string;
  memLeaseNumber: string;
  memDistrictnumber: string;
  nebDistance: string;
  allNeighboursCount: string;
  searchText: string;
  p: any;
  allLeaseOwnersList: any;

  constructor(private neighborsService: NeighborsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.leaseNumber = sessionStorage.getItem("nearByNbrleaseNo");
    this.districtNumber = sessionStorage.getItem("nearByNbrDistNo");
    this.leaseName = sessionStorage.getItem("nearbyleaseName");
    this.allNeighboursCount = sessionStorage.getItem("allNeighboursCount")
    this.getLeaseOwner();
  }

  public user = Utils.GetCurrentUser();

  getLeaseOwner() {
    let body = {
      _distCode: this.districtNumber,
      _leasenumber: this.leaseNumber,
      _myemailid: this.user.email_id,
      _memberid: this.user.member_id
    }
    this.neighborsService.getLeaseOwnersWithConnect(body).subscribe(data => {
      this.allLeaseOwnersList = data['data'];
      this.leaseOwnersList = [];
      for (let i = 0; i < this.allLeaseOwnersList.length; i++) {
        if (this.allLeaseOwnersList[i]['status'] == null) {
          this.leaseOwnersList.push(this.allLeaseOwnersList[i])
        }
      }
      //this.leaseName = this.leaseOwnersList.lease_name
      console.log('leaseOwnersList', this.leaseOwnersList)
    })
  }

  sendConnectRequest(lw: any) {
    debugger;
    this.memLeaseNumber = sessionStorage.getItem("nearbyleaseNumber");
    this.memDistrictnumber = sessionStorage.getItem("nearbydistrictNumber");
    this.nebDistance = sessionStorage.getItem("nearByNbrDistance");
    let body = {
      _memdistCode: this.memDistrictnumber,
      _memleasenumber: this.memLeaseNumber,
      _memberid: this.user.member_id,
      _myemailid: this.user.email_id,
      _nebdistCode: this.districtNumber,
      _nebleasenumber: this.leaseNumber,
      _nebid: lw.mid,
      _nebemailid: lw.memaild,
      distance: this.nebDistance
    }

    return this.neighborsService.sendConnectRequest(body).subscribe(data => {
      //alert('request sent successfully');
      console.log('connectresponse', data)
      this.flashMessagesService.show("You have successfully sent the connect request...", { cssClass: 'bg-accent flash-message', timeout: 2000 })
      this.getLeaseOwner();
    })
  }

}
