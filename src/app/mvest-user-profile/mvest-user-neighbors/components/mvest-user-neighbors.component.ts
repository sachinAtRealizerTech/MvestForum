import { Component, OnInit } from '@angular/core';
import { NeighborsService } from 'src/app/neighbors/services/neighbors.service';
import { environment } from 'src/environments/environment';
import { Utils } from 'src/app/shared/Utils';

@Component({
  selector: 'app-mvest-user-neighbors',
  templateUrl: './mvest-user-neighbors.component.html',
  styleUrls: ['./mvest-user-neighbors.component.scss']
})
export class MvestUserNeighborsComponent implements OnInit {
  loading = false;
  memberId: number;
  emailId: string;
  allNeighboursCount: number;
  neighboursListDetails: any[];
  myConnectedNeighbors: any[];
  acceptedRequests: any[];
  searchText: string
  myNeighbors: any[];
  imagePrepend: string;
  png: string;

  constructor(private neighborsService: NeighborsService) { }

  ngOnInit() {
    this.imagePrepend = environment.IMAGEPREPENDURL;
    this.png = '.png';
    this.memberId = Number(localStorage.getItem('userMemberId'));
    this.emailId = localStorage.getItem('userEmailId');
    this.getAllMemberNeighbors();
    this.getMyMemberNeighbors();
  }

  public user = Utils.GetCurrentUser();

  getAllMemberNeighbors() {
    debugger;
    this.loading = true;
    let body = {
      _member_id: this.memberId,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      debugger;
      this.allNeighboursCount = 0;
      this.neighboursListDetails = [];
      this.myConnectedNeighbors = data['data']
      this.allNeighboursCount = this.myConnectedNeighbors.length;
      sessionStorage.setItem("allNeighboursCount", this.allNeighboursCount.toString())
      this.acceptedRequests = this.myConnectedNeighbors;
      console.log('newFilteredData', data['data']);
      this.loading = false;
    },
      error => {
        console.log('getallmemberneighbor error', error)
        this.loading = false;
      })
  }

  getMyMemberNeighbors() {
    let body = {
      _member_id: this.user.member_id,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      this.myNeighbors = data['data']
      console.log('newFilteredData', data['data']);
    },
      error => {
        console.log('getallmemberneighbor error', error)
      })
  }

  isMemberConnectedToMe(emailId: string) {
    let newEmailId = emailId.replace(environment.IMAGEPREPENDURL, "");
    let trueEmailId = newEmailId.replace('.png', "");
    if (this.myNeighbors) {
      let emailids = this.myNeighbors.map(l => l.neighbor_email_id);
      return emailids.includes(trueEmailId)
    }
    else {
      return false
    }
  }

}
