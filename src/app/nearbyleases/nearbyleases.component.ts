import { Component, OnInit, TemplateRef } from '@angular/core';
import { NeighborsService } from '../neighbors/neighbors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  allNeighboursCount: string;
  searchText: string;
  p: any
  neighborFilterFlag: string;
  countyNumber: string;
  operatorNumber: string;
  leaseInput: any

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

    this.neighborFilterFlag = sessionStorage.getItem("newNeighborFilterFlag");

    if (this.neighborFilterFlag == "Lease") {
      this.leaseNumber = sessionStorage.getItem("nearbyleaseNumber");
      this.districtNumber = sessionStorage.getItem("nearbydistrictNumber");
      this.leaseInput = {
        _filterBy: "lease",
        _leasenumber: this.leaseNumber,
        _distCode: this.districtNumber,
        _countycode: "",
        _op_number: ""
      }
    }
    else if (this.neighborFilterFlag == "CountyNOperator") {
      this.countyNumber = sessionStorage.getItem("nearbyCountyNumber");
      this.operatorNumber = sessionStorage.getItem("nearbyOperatorNumber")
      this.leaseInput = {
        _filterBy: "",
        _leasenumber: 0,
        _distCode: "",
        _countycode: this.countyNumber,
        _op_number: this.operatorNumber
      }
    }

    // this.distanceWithin = sessionStorage.getItem("nearbydistanceWithin");
    this.allNeighboursCount = sessionStorage.getItem("allNeighboursCount");
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
      this.closeSearchFilterModal();
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
    if (this.neighborFilterFlag == "Lease") {
      this.neighborsService.getLeaseNeighbors(this.leaseInput).subscribe(data => {
        this.nearByLeases = data['data'];
        sessionStorage.setItem("nearbyleaseNumber", this.leaseNumber);
        sessionStorage.setItem("nearbydistrictNumber", this.districtNumber);
        //sessionStorage.setItem("nearbydistanceWithin", this.searchFilterForm.controls.distanceWithin.value);
        console.log('nearbyLeases', this.nearByLeases);
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.closeSearchFilterModal();
        })
    }
    else if (this.neighborFilterFlag == "CountyNOperator") {
      this.neighborsService.getLeaseNeighbors(this.leaseInput).subscribe(data => {
        this.nearByLeases = data['data'];
        sessionStorage.setItem("nearbyCountyNumber", this.countyNumber);
        sessionStorage.setItem("nearbyOperatorNumber", this.operatorNumber);
        //sessionStorage.setItem("nearbydistanceWithin", this.searchFilterForm.controls.distanceWithin.value);
        console.log('nearbyLeases', this.nearByLeases);
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.closeSearchFilterModal();
        })
    }

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
    this.neighborsService.getMyLease(this.user.member_id).subscribe(data => {
      this.myLeases = data['data']
    })
  }

  viewNeighbors(nl: any) {
    sessionStorage.setItem("nearByNbrleaseNo", nl.leasenumber);
    sessionStorage.setItem("nearByNbrDistNo", nl.dist_number);
    sessionStorage.setItem("nearbyleaseName", nl.leasename);
    sessionStorage.setItem("nearByNbrDistance", nl._dist_in_miles)
    let body = {
      _distCode: nl.dist_number,
      _leasenumber: nl.leasenumber,
      _myemailid: this.user.email_id,
      _memberid: this.user.member_id
    }

    this.neighborsService.getLeaseOwnersWithConnect(body).subscribe(data => {
      console.log('neighborswithconnectstatus', data);
      sessionStorage.setItem("multiLeasesArray", JSON.stringify(this.nearByLeases))
      this.router.navigate(['/nearbyneighbors']);
    })
  }


}
