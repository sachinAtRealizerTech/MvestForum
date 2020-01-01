import { Component, OnInit } from '@angular/core';
import { MyaccountService } from './myaccount.service';
import { Utils } from '../shared/Utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../authentication/signup/services/signup.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  submitUserProfile = false;
  changePasswordForm: FormGroup;
  submitChangePassword = false;
  mismatchedPasswords = false;
  mismatchOldPassword = false;
  userDetailsArray: any;
  loading = false;
  showUserDetails = false;

  constructor(private myaccountService: MyaccountService,
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.userProfileForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      PinCode: ['', Validators.required],
      UserName: [''],
      TagLine: ['']
    })

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
    //this.getStateList();
    this.getUserProfileDetails();
  }

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public user = Utils.GetCurrentUser();
  //public userProfile = Utils.getCurrentUserProfileDetails()

  get g() { return this.userProfileForm.controls }
  get f() { return this.changePasswordForm.controls }

  openSave() {
    this.savebutton = true;
    this.editflag = true;
  }
  closeSave() {
    this.getUserProfileDetails();
    this.savebutton = false;
    this.editflag = false;
    this.submitUserProfile = false;
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
    this.mismatchOldPassword = false;
    this.Openpassword = false;
    this.submitChangePassword = false;
    this.mismatchedPasswords = false;
    this.changePasswordForm.reset();
  }

  getUserProfileDetails() {
    debugger;
    this.loading = true;
    this.showUserDetails = false;
    this.myaccountService.getUserProfileDetails(this.user.email_id).subscribe(data => {
      console.log('userdetails', data);
      this.userDetailsArray = data;
      this.userDetails = data[0];
      this.signupService.getStates().subscribe(data => {
        this.loading = false;
        this.stateList = data['data'];
        for (let i = 0; i < this.stateList.length; i++) {
          if (this.userDetails.state_master_id == this.stateList[i].masterdata_id) {
            this.userStateName = this.stateList[i].name
            break
          }
        }
        let body = {
          FirstName: this.userDetails.f_name,
          LastName: this.userDetails.l_name,
          PhoneNo: this.userDetails.phone_number,
          Email: this.user.email_id,
          Address: this.userDetails.mailing_st_address,
          State: this.userDetails.state_master_id,
          City: this.userDetails.city,
          PinCode: this.userDetails.zip_code,
          UserName: this.userDetails.user_name,
          TagLine: this.userDetails.tag_line
        }
        this.userProfileForm.patchValue(body);
        this.showUserDetails = true;
      },
        error => {
          this.loading = false;
          this.showUserDetails = true;
        })

    },
      error => {
        this.loading = false;
        this.showUserDetails = true;
      })
  }


  updateUserProfile() {
    debugger;
    this.submitUserProfile = true
    if (this.userProfileForm.invalid) {
      return
    }
    let body = {
      _emailid: this.user.email_id,
      _fname: this.g.FirstName.value,
      _lname: this.g.LastName.value,
      _address: this.g.Address.value,
      _city: this.g.City.value,
      _stateId: this.g.State.value,
      _postalcode: this.g.PinCode.value,
      _phonenumber: this.g.PhoneNo.value,
      _username: this.g.UserName.value,
      _tagline: this.g.TagLine.value
    }
    this.myaccountService.updateUserProfile(body).subscribe(data => {
      this.flashMessagesService.show('Your profile updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.submitUserProfile = false;
      // Utils.getCurrentUserProfileDetails();
      this.getUserProfileDetails();
      this.closeSave();
    })
  }


  changePassword() {
    debugger;
    this.submitChangePassword = true;
    if (this.changePasswordForm.invalid) {
      return
    }
    if (this.f.newPassword.value != this.f.confirmPassword.value) {
      this.mismatchedPasswords = true;
      return;
    }
    let body = {
      _emailid: this.user.email_id,
      _oldpassword: this.f.oldPassword.value,
      _newpassword: this.f.newPassword.value
    }
    this.myaccountService.changePassword(body).subscribe(data => {
      console.log('changepwd', data)
      if (data['data'][0]['changepassword'] == "INCORRECT_PWD") {
        this.mismatchOldPassword = true;
      }
      else {
        this.flashMessagesService.show('Your password updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
        this.closeChangePassword();

      }
    })
  }

}
