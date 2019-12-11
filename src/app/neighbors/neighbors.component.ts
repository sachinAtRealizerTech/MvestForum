import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeighborsService } from './neighbors.service';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Template } from '@angular/compiler/src/render3/r3_ast';

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
  newNeighborForm: FormGroup;
  newListForm: FormGroup;
  districtCode: string;
  leaseNumber: string;
  myConnectRequests: any;
  acceptedRequests: any[] = [];
  loading = false;
  isDisabled = false;
  searchFilterLeaseForm: FormGroup
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
  newListMembers: any;
  newListModal: TemplateRef<any>;
  listLeaseName: any;
  newListDistance: any;
  newListFilteredMembers: any;
  listLeaseNumber: any;
  submitNewNeighborForm = false;
  nebIdCsv: any;
  countiesAndOperators: any;
  operatorList: any;
  countyList: any;
  nebIdCsvArray: any = [];
  submitNewListForm = false;
  checkCheckboxFlag = false;
  searchFilterCountyOperatorForm: FormGroup;
  submitsearchFilterLeaseForm = false;
  submitSearchFilterCountyOperatorForm = false;
  filterBy: string;
  searchfilterInput: any;
  countyNumber: string;
  operatorNumber: string;
  searchFilterLeaseNo: string;
  searchFilterDistCode: string;
  searchFiltercountyNo: any;
  SearchFilterOperatorNo: any;
  listCountyNumber: any;
  listOperatorNumber: any;


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

    this.searchFilterLeaseForm = this.formBuilder.group({
      leaseName: ['', Validators.required],
      //distanceWithin: []
    })

    this.searchFilterCountyOperatorForm = this.formBuilder.group({
      county: ['', Validators.required],
      operator: ['', Validators.required]
    })

    this.newListForm = this.formBuilder.group({
      listName: ['', Validators.required],
      addedNeighbors: []
    })

    this.getMyLeases(this.user.member_id);
    // this.getMemberNeighbors();
    this.getMemberList();

    this.getCountiesAndOperators();
    //this.getNeighborsListDetails();
    //this.getMyConnectRequests();
    //this.getLeaseNeighbors();

    this.getAllMemberNeighbors();
  }

  get g() { return this.newNeighborForm.controls }
  get f() { return this.searchFilterLeaseForm.controls }
  get n() { return this.newListForm.controls }
  get c() { return this.searchFilterCountyOperatorForm.controls }

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
    this.submitsearchFilterLeaseForm = false;
    this.submitSearchFilterCountyOperatorForm = false;
    this.searchFilterLeaseForm.reset();
    this.searchFilterCountyOperatorForm.reset();
  }

  toggleNewListGroup() {
    this.newListGroup = !this.newListGroup;
  }

  toggleNewNeighborGroup() {
    //this.isDisabled = !this.isDisabled
    this.newNeighborGroup = !this.newNeighborGroup;
  }

  searchFilterData() {
    debugger
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
      this.getFilterSearch()
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
    this.filterGroup = true;
    this.submitsearchFilterLeaseForm = false;
    this.submitSearchFilterCountyOperatorForm = false;
    this.searchFilterLeaseForm.reset();
    this.searchFilterCountyOperatorForm.reset();
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
    this.operatorFilter = false;
    this.playTypeFilter = false;
    this.getAllMemberNeighbors();
  }

  closeOperatorFilter() {
    this.countyFilter = false;
    this.operatorFilter = false;
    this.playTypeFilter = false;
    this.getAllMemberNeighbors();
  }

  closePlayTypeFilter() {
    this.countyFilter = false;
    this.operatorFilter = false;
    this.playTypeFilter = false;
    this.getAllMemberNeighbors();
  }

  openNewNeighborModal(newNeighborModal) {
    this.submitNewNeighborForm = false;
    this.newNeighborModal = newNeighborModal;
    this.modalService.open(this.newNeighborModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeNewNeighborModal() {
    this.modalService.dismissAll(this.newNeighborModal);
    this.submitNewNeighborForm = false;
  }

  getMyLeases(id: number) {
    debugger;
    this.neighborsService.getMyLease(id).subscribe(data => {
      this.myLeases = data['data']
      console.log("MyLeases", data);
    })
  }

  getCountiesAndOperators() {
    this.neighborsService.getCountiesAndOperators().subscribe(data => {
      this.countiesAndOperators = data['data'];
      console.log('countiesandoperators', this.countiesAndOperators);
      this.operatorList = [];
      this.countyList = [];
      for (let i = 0; i < this.countiesAndOperators.length; i++) {
        if (this.countiesAndOperators[i]['entity_type'] == "operator") {
          this.operatorList.push(this.countiesAndOperators[i])
        }
        else if (this.countiesAndOperators[i]['entity_type'] == "county") {
          this.countyList.push(this.countiesAndOperators[i])
        }
      }
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

  getSearchFilterLeaseValues(event) {
    console.log(event.target.value)
    let compKey: string = event.target.value;
    let compKeyArray: Array<string> = compKey.split("&");
    this.searchFilterLeaseNo = compKeyArray[0];
    this.searchFilterDistCode = compKeyArray[1];
    this.leaseName = compKeyArray[2]

  }

  getSearchFilterCountyValues(event) {
    this.searchFiltercountyNo = event.target.value
  }

  getSearchFilterOperatorValues(event) {
    this.SearchFilterOperatorNo = event.target.value
  }

  getLeaseNeighbors() {
    debugger;
    this.submitNewNeighborForm = true;
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

  getMemberNeighbors() {
    this.loading = true;
    this.myConnectedNeighbors = [];
    this.filteredRequests = [];
    //this.neighboursListDetails = [];
    this.allNeighboursCount = 0;
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

  // getFilterSearch() {
  //   debugger;
  //   if (this.searchFilterLeaseForm.invalid) {
  //     return
  //   }
  //   this.filteredRequests = [];
  //   this.neighboursListDetails = [];
  //   for (let i = 0; i < this.myConnectedNeighbors.length; i++) {
  //     if (this.myConnectedNeighbors[i]['neb_lease_number'] == this.leaseNumber) {
  //       this.filteredRequests.push(this.myConnectedNeighbors[i])
  //     }
  //   }
  //   this.acceptedRequests = [];
  //   this.acceptedRequests = this.filteredRequests;
  //   this.closeSearchFilter();
  // }


  getAllMemberNeighbors() {
    this.loading = true;
    this.allNeighboursCount = 0;
    let body = {
      _member_id: this.user.member_id,
      _filter_by: "none",
      _lease_number: null,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      debugger;
      this.myConnectedNeighbors = data['data']
      this.allNeighboursCount = this.myConnectedNeighbors.length;
      this.acceptedRequests = this.myConnectedNeighbors;
      console.log('newFilteredData', data['data']);
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }


  getFilteredMemberNeighbors() {
    this.loading = true;
    let body = this.searchfilterInput;
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      console.log('newFilteredData', data['data'])
      this.acceptedRequests = data['data'];
      this.loading = false;
      this.closeSearchFilter();
    },
      error => {
        this.loading = false;
      })
  }

  getFilterSearch() {
    debugger;

    switch (this.filterGroup) {
      case true: {
        if (this.searchFilterLeaseForm.invalid) {
          this.submitsearchFilterLeaseForm = true;
          return
        }
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "lease",
          _lease_number: this.searchFilterLeaseNo,
          _district_code: this.searchFilterDistCode,
          _county_no: "",
          _operator_number: ""
        }
        this.getFilteredMemberNeighbors();
        break;
      }
      case false: {
        if (this.searchFilterCountyOperatorForm.invalid) {
          this.submitSearchFilterCountyOperatorForm = true;
          return
        }
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "CountyNOperators",
          _lease_number: null,
          _district_code: "",
          _county_no: this.searchFiltercountyNo,
          _operator_number: this.SearchFilterOperatorNo
        }
        this.getFilteredMemberNeighbors();
        break;
      }
      default: {
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "none",
          _lease_number: null,
          _district_code: "",
          _county_no: "",
          _operator_number: ""
        }
        this.getFilteredMemberNeighbors();
        break;
      }
    }
  }

  selectLeaseForNewList(event) {
    this.listLeaseNumber = event.target.value;
    this.getFilteredNewListMembers();
  }

  selectCountyForNewList(event) {
    this.listCountyNumber = event.target.value;
  }

  selectOperatorForNewList(event) {
    this.listOperatorNumber = event.target.value;
    this.getFilteredNewListMembers();
  }

  getFilteredNewListMembers() {
    debugger;

    switch (this.newListGroup) {
      case true: {
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "lease",
          _lease_number: this.searchFilterLeaseNo,
          _district_code: this.searchFilterDistCode,
          _county_no: "",
          _operator_number: ""
        }
        this.getFilteredMemberNeighbors();
        break;
      }
      case false: {
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "CountyNOperators",
          _lease_number: null,
          _district_code: "",
          _county_no: this.listCountyNumber,
          _operator_number: this.listOperatorNumber
        }
        this.getFilteredMemberNeighbors();
        break;
      }
      default: {
        this.searchfilterInput = {
          _member_id: this.user.member_id,
          _filter_by: "none",
          _lease_number: null,
          _district_code: "",
          _county_no: "",
          _operator_number: ""
        }
        this.getFilteredMemberNeighbors();
        break;
      }
    }
  }


  getMemberList() {
    this.loading = true;
    this.neighborsService.getMemberList(this.user.member_id).subscribe(data => {
      this.membersList = data['data'];
      this.loading = false;
      console.log('membersList', this.membersList)
    },
      error => {
        this.loading = false;
      })
  }

  selectListType(event) {
    debugger;
    this.rawData = event.target.value;
    this.rawData = this.rawData.split("&");
    this.listTypeId = this.rawData[0];
    this.listName = this.rawData[1];
    this.getNeighborsListDetails();
  }

  getNeighborsListDetails() {
    this.loading = true;
    this.acceptedRequests = [];
    this.neighborsService.getNeighborsListDetails(this.listTypeId, this.user.member_id).subscribe(data => {
      debugger;
      this.neighboursListDetails = data['data']
      console.log('neighboursListDetails', this.neighboursListDetails);
      this.loading = false;
      // this.selectedNbrLstDtls = []
      // for (let i = 0; i < this.neighboursListDetails.length; i++) {
      //   if (this.neighboursListDetails[i]['list_name'] == this.listName) {
      //     this.selectedNbrLstDtls.push(this.neighboursListDetails[i]);
      //   }
      // }
    })
  }


  getMemberNeighborsForNewList() {
    this.newListFilteredMembers = [];
    this.newListMembers = [];
    this.loading = true;
    let body = {
      _member_id: this.user.member_id,
      _filter_by: "none",
      _lease_number: null,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.neighborsService.getMemberNeighborsWithFilter(body).subscribe(data => {
      this.newListMembers = data['data'];
      console.log('newListMembers', this.newListMembers);
      this.loading = false;
      this.newListFilteredMembers = this.newListMembers;
    },
      error => {
        this.loading = false;
      })
  }

  openNewListModal(newListModal: TemplateRef<any>) {
    this.getMemberNeighborsForNewList();
    this.newListModal = newListModal
    this.modalService.open(this.newListModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    })
  }

  closeNewListModal() {
    this.modalService.dismissAll(this.newListModal);
    this.newListForm.reset();
    this.checkCheckboxFlag = false;
  }



  // selectDistanceForNewList(event) {
  //   this.newListDistance = event.target.value;
  //   this.getFilteredNewListMembers();
  // }

  // getFilteredNewListMembers() {
  //   if (this.listLeaseNumber == null) {
  //     return
  //   }
  //   this.loading = true;
  //   this.newListFilteredMembers = []
  //   for (let i = 0; i < this.newListMembers.length; i++) {
  //     if (this.newListMembers[i]['neb_lease_number'] == this.listLeaseNumber && this.newListMembers[i]['status'] == "accepted") {
  //       this.newListFilteredMembers.push(this.newListMembers[i])
  //     }
  //   }
  //   this.loading = false;
  // }


  // getFilteredNewListMembers() {
  //   if (this.listLeaseNumber == null) {
  //     return
  //   }
  //   this.loading = true;
  //   this.newListFilteredMembers = [];
  //   let body = {

  //   }
  //   // this.neighborsService.getMemberNeighborsWithFilter()
  //   this.loading = false;
  // }


  saveNeighborList() {
    debugger;
    this.submitNewListForm = true
    if (this.newListForm.invalid) {
      return
    }
    if (this.nebIdCsvArray.length == 0) {
      this.checkCheckboxFlag = true;
      return
    }
    this.checkCheckboxFlag = false;
    this.loading = true;
    this.nebIdCsv = this.nebIdCsvArray.join(",");
    let body = {
      _member_id: this.user.member_id,
      _list_name: this.newListForm.controls.listName.value,
      _neb_l: this.nebIdCsv
    }
    this.neighborsService.saveNeighborList(body).subscribe(data => {
      this.loading = false;
      this.getMemberList();
      this.nebIdCsvArray = [];
      this.closeNewListModal();
      this.submitNewListForm = false;
    },
      error => {
        this.loading = false;
        this.nebIdCsvArray = [];
        this.submitNewListForm = false;
      })

  }


  onAddedNeighborSelection(event: any, res: any) {
    debugger;
    if (event.target.checked) {
      this.checkCheckboxFlag = false;
      this.nebIdCsvArray.push(res.neighbor_id);
      console.log('addedArray', this.nebIdCsvArray)
    }
    else if (!event.target.checked) {
      let index = this.nebIdCsvArray.indexOf(res.neighbor_id);
      if (index > -1) {
        this.nebIdCsvArray.splice(index, 1);
      }
      console.log('removedArray', this.nebIdCsvArray)
    }

  }

}
