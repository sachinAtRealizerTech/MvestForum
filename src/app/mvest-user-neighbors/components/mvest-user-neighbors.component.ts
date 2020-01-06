import { Component, OnInit } from '@angular/core';
import { NeighborsService } from 'src/app/neighbors/services/neighbors.service';
import { environment } from 'src/environments/environment';

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
  myConnectedNeighbors: any;
  acceptedRequests: any;

  constructor(private neighborsService: NeighborsService) { }

  ngOnInit() {
    this.memberId = Number(localStorage.getItem('userMemberId'));
    this.emailId = localStorage.getItem('userEmailId');
    this.getAllMemberNeighbors();
  }

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
      this.acceptedRequests.forEach((el) => { el.neighbor_email_id = environment.IMAGEPREPENDURL + el.neighbor_email_id + '.png' })
      console.log('newFilteredData', data['data']);
      this.loading = false;
    },
      error => {
        console.log('getallmemberneighbor error', error)
        this.loading = false;
      })
  }

}
