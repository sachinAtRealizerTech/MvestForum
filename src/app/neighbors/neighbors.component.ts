import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeighborsService } from './neighbors.service';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  constructor(private modalService: NgbModal,
    private neighborsService: NeighborsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.newNeighborForm = this.formBuilder.group({
      leaseName: [],
      distanceWithin: []
    })

    this.getMyLeases(this.user.email_id);
    this.getMyConnectRequests();
    //this.getLeaseNeighbors();
  }

  get g() { return this.newNeighborForm.controls }

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
  }

  closeDistanceFilter() {
    this.distanceFilter = false;
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

  getMyLeases(email: string) {
    debugger;
    this.neighborsService.getMyLease(email).subscribe(data => {
      this.myLeases = data
      console.log("MyLeases", data);
    })
  }

  getLeaseValues(event) {
    debugger;
    console.log(event.target.value)
    let compKey: string = event.target.value;
    let compKeyArray: Array<string> = compKey.split(" ");
    this.leaseNumber = compKeyArray[0];
    this.districtCode = compKeyArray[1];
  }

  getLeaseNeighbors() {
    debugger;
    let body = {
      leaseNumber: this.leaseNumber,
      distNumber: this.districtCode,
      distanceWithin: this.g.distanceWithin.value
    }
    this.neighborsService.getLeaseNeighbors(body).subscribe(data => {
      console.log("leaseNeighbors", data);
      this.closeNewNeighborModal();
      sessionStorage.setItem("leaseNumber", this.leaseNumber);
      sessionStorage.setItem("districtNumber", this.districtCode);
      sessionStorage.setItem("distanceWithin", this.g.distanceWithin.value)
      this.router.navigate(['/nearbyleases']);
    })
  }

  getMyConnectRequests() {
    this.neighborsService.getMyConnectRequests('ash@gmail.com').subscribe(data => {
      this.myConnectRequests = data
      console.log('myconnectrequest', this.myConnectRequests)
    })
  }


  acceptConnectRequest() {
    let body = {
      neb_emailid: "newsachins@gmail.com",
      my_emailid: "ash@gmail.com",
      action: "Accept"
    }
    this.neighborsService.acceptConnectRequest(body).subscribe(data => {
      alert('request accepted');
    })
  }

}
