import { Component, OnInit, TemplateRef } from '@angular/core';
import { NeighborsService } from '../neighbors/neighbors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nearbyleases',
  templateUrl: './nearbyleases.component.html',
  styleUrls: ['./nearbyleases.component.scss']
})
export class NearbyleasesComponent implements OnInit {
  filterGroup = true;
  nearByLeases: any;
  leaseNumber: string;
  districtNumber: string;
  distanceWithin: string;
  searchFilterModal: TemplateRef<any>;
  myLeases: any;
  searchFilterForm: FormGroup;
  leaseName: string;
  distance: string;
  leaseFilter = false;
  distanceFilter = false;
  countyFilter = false;
  operatorFilter = false;
  playTypeFilter = false;
  loading = false;

  constructor(private neighborsService: NeighborsService,
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.searchFilterForm = this.formbuilder.group({
      leaseName: [],
      distanceWithin: []
    })

    this.leaseNumber = sessionStorage.getItem("nearbyleaseNumber");
    this.districtNumber = sessionStorage.getItem("nearbydistrictNumber");
    this.distanceWithin = sessionStorage.getItem("nearbydistanceWithin");
    this.searchFilterForm.controls.distanceWithin.patchValue(this.distanceWithin)

    this.getNeighboringLeases();
    this.getMyLeases();
  }

  public user = Utils.GetCurrentUser();

  toggleFilterGroup() {
    debugger;
    this.filterGroup = !this.filterGroup;
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

  searchFilterData() {
    //this.showFilter = false;
    if (this.filterGroup == true) {
      this.leaseFilter = true;
      this.distanceFilter = true;
      this.countyFilter = false;
      this.operatorFilter = false;
      this.playTypeFilter = false;
      // this.closeSearchFilterModal();
      this.getNeighboringLeases()
    }
    else {
      this.leaseFilter = false;
      this.distanceFilter = false;
      this.countyFilter = true;
      this.operatorFilter = true;
      this.playTypeFilter = true;
      this.closeSearchFilterModal();
      this.getNeighboringLeases();
    }
  }

  getNeighboringLeases() {
    debugger;
    this.loading = true;
    let body = {
      leaseNumber: this.leaseNumber,
      distNumber: this.districtNumber,
      distanceWithin: this.searchFilterForm.controls.distanceWithin.value
    }
    this.neighborsService.getLeaseNeighbors(body).subscribe(data => {
      this.nearByLeases = data;
      this.leaseName = this.nearByLeases['leases'][0]['lease_name']
      this.distance = this.nearByLeases['leases'][0]['distance']
      console.log('nearbyLeases', this.nearByLeases)
      this.closeSearchFilterModal();
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.closeSearchFilterModal();
      })
  }

  openSearchFilterModal(searchFilterModal: TemplateRef<any>) {
    this.searchFilterModal = searchFilterModal
    this.modalService.open(this.searchFilterModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeSearchFilterModal() {
    this.modalService.dismissAll(this.searchFilterModal)
  }

  getLeaseValues(event) {
    debugger;
    console.log(event.target.value)
    let compKey: string = event.target.value;
    let compKeyArray: Array<string> = compKey.split("&");
    this.leaseNumber = compKeyArray[0];
    this.districtNumber = compKeyArray[1];
    this.leaseName = compKeyArray[2];
    sessionStorage.setItem("leaseNumber", this.leaseNumber);
  }

  getMyLeases() {
    this.neighborsService.getMyLease(this.user.email_id).subscribe(data => {
      this.myLeases = data
    })
  }

  viewNeighbors(leaseNumber) {
    sessionStorage.setItem("leaseNumber", leaseNumber)
    let body = {
      leaseNumber: "2.9666",
      email_id: this.user.email_id
    }
    this.neighborsService.getLeaseOwners(body).subscribe(data => {
      this.router.navigate(['/nearbyneighbors']);
    })
  }


}
