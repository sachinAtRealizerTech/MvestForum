import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeighborsService } from './neighbors.service';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-neighbors',
  templateUrl: './neighbors.component.html',
  styleUrls: ['./neighbors.component.scss']
})
export class NeighborsComponent implements OnInit {
  AdditionalFilterPage = false;
  additionalfilterflag = false;
  filterGroup = true;
  showFilter = true;
  newListGroup = true;
  newNeighborGroup = true;
  firstFilter: boolean;
  secondFilter = false;
  leaseFilter = false;
  distanceFilter = false;
  countyFilter = false;
  operatorFilter = false;
  playTypeFilter = false;
  searchFilterModal: ElementRef;
  newNeighborModal: ElementRef;
  myLeases: any;
  newNeighborForm: FormGroup
  districtCode: string;
  leaseNumber: string;
  myConnectRequests: any;
  acceptedRequests: any[] = [];
  loading = false;
  isDisabled = false;
  searchFilterForm: FormGroup
  leaseName: string;
  filteredRequests: any[];
  myConnectedNeighbors: any;
  allNeighboursCount: number;
  searchText: string;
  p: any;
  membersList: any;
  neighboursListDetails: any;
  listTypeId: number;
  rawData: any;
  listName: any;
  selectedNbrLstDtls: any;

  constructor(private modalService: NgbModal,
    private neighborsService: NeighborsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.newNeighborForm = this.formBuilder.group({
      leaseName: ['', Validators.required],
      distanceWithin: ['', Validators.required]
    })

    this.searchFilterForm = this.formBuilder.group({
      leaseName: [],
      distanceWithin: []
    })

    this.getMyLeases(this.user.member_id);
    this.getMemberNeighbors();
    this.getMemberList();
    this.getNeighborsListDetails();
    //this.getMyConnectRequests();
    //this.getLeaseNeighbors();
  }

  get g() { return this.newNeighborForm.controls }
  get f() { return this.searchFilterForm.controls }

  public user = Utils.GetCurrentUser();

  openAdditionalFilter() {
    this.AdditionalFilterPage = true;
    this.additionalfilterflag = true;
  }
  closeAdditionalFilter() {
    debugger;
    this.AdditionalFilterPage = false;
    this.additionalfilterflag = false;
  }

  toggleFilterGroup() {

    this.filterGroup = !this.filterGroup;
  }

  toggleNewListGroup() {
    this.newListGroup = !this.newListGroup;
  }

  toggleNewNeighborGroup() {
    //this.isDisabled = !this.isDisabled
    this.newNeighborGroup = !this.newNeighborGroup;
  }

  searchFilterData() {
    this.showFilter = false;
    if (this.filterGroup == true) {
      this.leaseFilter = true;
      this.distanceFilter = true;
      this.countyFilter = false;
      this.operatorFilter = false;
      this.playTypeFilter = false;
      this.getFilterSearch()
    }
    else {
      this.leaseFilter = false;
      this.distanceFilter = false;
      this.countyFilter = true;
      this.operatorFilter = true;
      this.playTypeFilter = true;
    }
  }

  openSearchFilterModal(searchFilterModal) {
    this.searchFilterModal = searchFilterModal;
    this.modalService.open(this.searchFilterModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeSearchFilter() {
    this.modalService.dismissAll(this.searchFilterModal)
  }

  closeLeaseFilter() {
    this.leaseFilter = false;
    this.distanceFilter = false;
    this.getMemberNeighbors();
  }

  closeDistanceFilter() {
    this.distanceFilter = false;
    this.leaseFilter = false;
    this.getMemberNeighbors();
  }

  closeCountyFilter() {
    this.countyFilter = false;
  }

  closeOperatorFilter() {
    this.operatorFilter = false;
  }

  closePlayTypeFilter() {
    this.playTypeFilter = false;
  }

  openNewNeighborModal(newNeighborModal) {
    this.newNeighborModal = newNeighborModal;
    this.modalService.open(this.newNeighborModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeNewNeighborModal() {
    this.modalService.dismissAll(this.newNeighborModal);
  }

  getMyLeases(id: number) {
    debugger;
    this.neighborsService.getMyLease(id).subscribe(data => {
      this.myLeases = data['data']
      console.log("MyLeases", data);
    })
  }

  getLeaseValues(event) {
    debugger;
    console.log(event.target.value)
    let compKey: string = event.target.value;
    let compKeyArray: Array<string> = compKey.split("&");
    this.leaseNumber = compKeyArray[0];
    this.districtCode = compKeyArray[1];
    this.leaseName = compKeyArray[2]
  }

  getLeaseNeighbors() {
    debugger;
    if (this.newNeighborForm.invalid) {
      return
    }
    this.loading = true
    let body = {
      _leasenumber: this.leaseNumber,
      _distCode: this.districtCode,
      // distanceWithin: this.g.distanceWithin.value
    }
    this.neighborsService.getLeaseNeighbors(body).subscribe(data => {
      // console.log("leaseNeighbors", data);
      this.closeNewNeighborModal();
      this.loading = false
      sessionStorage.setItem("nearbyleaseNumber", this.leaseNumber);
      sessionStorage.setItem("nearbydistrictNumber", this.districtCode);
      sessionStorage.setItem("nearbydistanceWithin", this.g.distanceWithin.value)
      this.router.navigate(['/nearbyleases']);
    },
      error => {
        this.loading = false
      })
  }

  // getMyConnectRequests() {
  //   this.loading = true;
  //   this.neighborsService.getMyConnectRequests('ash@gmail.com').subscribe(data => {
  //     this.loading = false;
  //     this.myConnectRequests = data;
  //     for (let i = 0; i < this.myConnectRequests.length; i++) {
  //       if (this.myConnectRequests[i]['nebs']['status'] == 'Accepted') {
  //         this.acceptedRequests.push(this.myConnectRequests[i]);
  //       }
  //     }
  //     console.log('myconnectrequest', this.myConnectRequests)
  //   },
  //     error => {
  //       this.loading = false;
  //     })
  // }

  getMemberNeighbors() {
    this.loading = true;
    this.selectedNbrLstDtls = [];
    this.neighborsService.getMemberNeighbors(this.user.member_id).subscribe(data => {
      this.loading = false;
      this.myConnectedNeighbors = data['data'];
      this.allNeighboursCount = this.myConnectedNeighbors.length;
      sessionStorage.setItem("allNeighboursCount", this.allNeighboursCount.toString())
      this.acceptedRequests = [];
      this.acceptedRequests = this.myConnectedNeighbors
      console.log('myconnectneighbors', this.myConnectedNeighbors)
    },
      error => {
        this.loading = false;
        console.log(error)
      })
  }

  getFilterSearch() {
    debugger;
    if (this.searchFilterForm.invalid) {
      return
    }
    this.filteredRequests = [];
    this.selectedNbrLstDtls = [];
    for (let i = 0; i < this.myConnectedNeighbors.length; i++) {
      if (this.myConnectedNeighbors[i]['leasenumber'] == this.leaseNumber && this.myConnectedNeighbors[i]['distance'] == this.searchFilterForm.controls.distanceWithin.value) {
        this.filteredRequests.push(this.myConnectedNeighbors[i])
      }
    }
    this.acceptedRequests = [];
    this.acceptedRequests = this.filteredRequests;
    this.closeSearchFilter();
  }


  // acceptConnectRequest() {
  //   let body = {
  //     neb_emailid: "newsachins@gmail.com",
  //     my_emailid: "ash@gmail.com",
  //     action: "Accept"
  //   }
  //   this.neighborsService.acceptConnectRequest(body).subscribe(data => {0
  //     alert('request accepted');
  //   })
  // }

  getMemberList() {
    this.neighborsService.getMemberList(this.user.member_id = 161).subscribe(data => {
      this.membersList = data['data']
      console.log('membersList', this.membersList)
    })
  }

  selectListType(event) {
    this.rawData = event.target.value;
    this.rawData = this.rawData.split("&")
    this.listTypeId = this.rawData[0];
    this.listName = this.rawData[1];
    this.getNeighborsListDetails();
  }

  getNeighborsListDetails() {
    this.neighborsService.getNeighborsListDetails(this.listTypeId = 1, this.user.member_id = 161).subscribe(data => {
      this.neighboursListDetails = data['data']
      console.log('neighboursListDetails', this.neighboursListDetails);
      this.selectedNbrLstDtls = []
      for (let i = 0; i < this.neighboursListDetails.length; i++) {
        if (this.neighboursListDetails[i]['list_name'] == this.listName) {
          this.selectedNbrLstDtls.push(this.neighboursListDetails[i]);
        }
      }
    })
  }



}
