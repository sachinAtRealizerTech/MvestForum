import { Component, OnInit } from '@angular/core';
import { NeighborsService } from '../neighbors/neighbors.service';
import { Utils } from '../shared/Utils';

@Component({
  selector: 'app-nearbyneighbors',
  templateUrl: './nearbyneighbors.component.html',
  styleUrls: ['./nearbyneighbors.component.scss']
})
export class NearbyneighborsComponent implements OnInit {
  leaseNumber: string;
  leaseOwnersList: any;
  leaseName: string;

  constructor(private neighborsService: NeighborsService) { }

  ngOnInit() {
    this.leaseNumber = sessionStorage.getItem("leaseNumber");
    this.getLeaseOwner()
  }

  public user = Utils.GetCurrentUser();

  getLeaseOwner() {
    let body = {
      leaseNumber: "2.9666",
      email_id: this.user.email_id
    }
    this.neighborsService.getLeaseOwners(body).subscribe(data => {
      this.leaseOwnersList = data
      this.leaseName = this.leaseOwnersList.lease_name
      console.log('leaseOwnersList', this.leaseOwnersList)
    })
  }

  sendConnectRequest(lw: any) {
    debugger;
    let body = {
      myname: this.user.f_name + " " + this.user.l_name,
      myemail_id: this.user.email_id,
      myleasenumber: "9048",
      nebemail_id: lw.email_id,
      nebleasenumber: "9666",
      nebname: lw.name,
      distance: "2.7"
    }

    return this.neighborsService.sendConnectRequest(body).subscribe(data => {
      alert('request sent successfully');
      this.getLeaseOwner();
    })
  }

}
