import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeighborsService } from './neighbors.service';
import { Utils } from '../shared/Utils';

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

  constructor(private modalService: NgbModal,private neighborsService: NeighborsService) { }

  ngOnInit() {
    this.Getleases(this.user.email_id)
  }
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

 Getleases(email:string){
  debugger;
  this.neighborsService.Getlease(email).subscribe(data=>{
   console.log("Leases",data);
  })

}

}
