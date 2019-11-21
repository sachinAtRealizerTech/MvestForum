import { Component, OnInit } from '@angular/core';
import { MyaccountService } from './myaccount.service';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SignupService } from '../authentication/signup/services/signup.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  userProfileForm: FormGroup;
  savebutton = false;
  editflag = false;
  editPlanflag = false;
  plansavebutton = false;
  changePasswordText = true;
  Openpassword = false;
  userDetails: any;
  stateList: any;
  userStateName: any;

  constructor(private myaccountService: MyaccountService,
    private formBuilder: FormBuilder,
    private signupService: SignupService) { }

  ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      FirstName: [],
      LastName: [],
      PhoneNo: [],
      Email: [],
      Address: [],
      State: [],
      City: [],
      PinCode: []
    })
    //this.getStateList();
    this.getUserProfileDetails();
  }

  public user = Utils.GetCurrentUser();

  get g() { return this.userProfileForm.controls }

  openSave() {
    this.savebutton = true;
    this.editflag = true;
  }
  closeSave() {
    this.savebutton = false;
    this.editflag = false;
  }
  openPlanSave() {
    this.plansavebutton = true;
    this.editPlanflag = true;
  }
  closePlanSave() {
    this.plansavebutton = false;
    this.editPlanflag = false;
  }

  openChangePassword() {
    this.Openpassword = true;
  }

  closeChangePassword() {
    this.Openpassword = false;
  }

  // getStateList() {
  //   this.signupService.getStates().subscribe(data => {
  //     this.stateList = data['data'];
  //     console.log('states', this.stateList);
  //   })
  // }

  getUserProfileDetails() {
    debugger;
    this.myaccountService.getUserProfileDetails(this.user.email_id).subscribe(data => {
      console.log('userdetails', data);
      this.userDetails = data[0];
      this.signupService.getStates().subscribe(data => {
        this.stateList = data['data'];
        for (let i = 0; i < this.stateList.length; i++) {
          if (this.userDetails.state_master_id == this.stateList[i].masterdata_id) {
            this.userStateName = this.stateList[i].name
            break
          }
        }
      })
      let body = {
        FirstName: this.userDetails.f_name,
        LastName: this.userDetails.l_name,
        PhoneNo: this.userDetails.phone_number,
        Email: this.user.email_id,
        Address: this.userDetails.mailing_st_address,
        State: this.userDetails.state_master_id,
        City: this.userDetails.city,
        PinCode: this.userDetails.zip_code
      }
      this.userProfileForm.patchValue(body);
    })
  }


  updateUserProfile() {
    debugger;
    let body = {
      _emailid: this.user.email_id,
      _fname: this.g.FirstName.value,
      _lname: this.g.LastName.value,
      _address: this.g.Address.value,
      _city: this.g.City.value,
      _stateId: this.g.State.value,
      _postalcode: this.g.PinCode.value,
      _phonenumber: this.g.PhoneNo.value
    }
    this.myaccountService.updateUserProfile(body).subscribe(data => {
      this.getUserProfileDetails();
      this.closeSave();
    })
  }





}
