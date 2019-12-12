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
  conAllNebId: string;
  conAllNebMaild: string;
  nearByLeases: any = [];
  loading = false;
  nextLeaseCounter = 1;
  conAllNebName: string;

  constructor(private neighborsService: NeighborsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.leaseNumber = sessionStorage.getItem("nearByNbrleaseNo");
    this.districtNumber = sessionStorage.getItem("nearByNbrDistNo");
    this.leaseName = sessionStorage.getItem("nearbyleaseName");
    this.allNeighboursCount = sessionStorage.getItem("allNeighboursCount");
    this.nearByLeases = JSON.parse(sessionStorage.getItem("multiLeasesArray"));
    this.getLeaseOwner();
  }

  public user = Utils.GetCurrentUser();

  getLeaseOwner() {
    this.loading = true;
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
      console.log('leaseOwnersList', this.leaseOwnersList);
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }

  getNextLeaseOwners() {
    debugger;
    for (let j = 1; j < this.nearByLeases.length; j++) {
      if (this.nextLeaseCounter == j) {
        this.districtNumber = this.nearByLeases[j]['dist_number'];
        this.leaseNumber = this.nearByLeases[j]['leasenumber'];
        this.getLeaseOwner();
        this.nextLeaseCounter++;
        break;
      }
    }
  }

  connectAll() {
    debugger;
    this.conAllNebId = this.leaseOwnersList.map(value => value.mid).join(",");
    this.conAllNebMaild = this.leaseOwnersList.map(value => value.memaild).join(",");
    this.conAllNebName = this.leaseOwnersList.map(value => value.mname).join(",");
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
      _nebid: this.conAllNebId,
      _nebemailid: this.conAllNebMaild,
      _myfname: this.user.f_name,
      _nebname: this.conAllNebName,
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
