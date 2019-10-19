import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userTypePage: boolean = true;
  firstPage: boolean = false;
  secondPage: boolean = false;
  thirdPage: boolean = false;
  userRegistrationForm: FormGroup;
  userInfoForm: FormGroup;
  alertInfoForm: FormGroup;
  planSelectionForm: FormGroup;
  userTypeForm: FormGroup;
  userTypeModal: ElementRef;
  claimLeaseModal: ElementRef;
  confirmAddress: string;
  confirmPhoneNumber: any;
  confirmEmail: string;
  submitUserRegForm = false;
  submitUserInfoForm = false;
  submitAlertInfoForm = false;
  statesList: any;
  notificationPrefList: any;
  userId: any;
  preferenceName: string;
  planInformation: any;
  professionalUserType = false;
  selMonthlyPrice: any;
  selAnnualPrice: any;
  planName: any;
  userTypeName: string
  planDuration: string;
  subscrptionAmount: any;
  planExpiryDate: Date;
  todayDate: Date;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private signupService: SignupService) { }

  ngOnInit() {
    this.userTypeForm = this.formBuilder.group({
      Ownership: ['', Validators.required]
    });

    this.userRegistrationForm = this.formBuilder.group({
      // userInfoForm: this.userInfoForm,
      // alertEmail: this.alertInfoForm,

      membershipType: ['', Validators.required],
      paymentSelection: ['', Validators.required],
      subscriptionAmount: ['', Validators.required],

    });

    this.alertInfoForm = this.formBuilder.group({

      // alertPhone: [],
      // alertEmail: [],
      // alerts: []

      alertPhone: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      alertEmail: ['', [Validators.required, Validators.email]],
      alerts: ['', Validators.required]
    })

    this.userInfoForm = this.formBuilder.group({
      // firstName: [],
      // lastName: [],
      // eMail: [],
      // address: [],
      // city: [],
      // state: [],
      // zipCode: [],
      // phoneNumber: [],
      // password: [],
      // confirmPassword: [],

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })

    this.planSelectionForm = this.formBuilder.group({

    });

    this.getStateList();
    this.getNotificationPreferencesList();
  }

  get h() { return this.userTypeForm.controls }
  get g() { return this.userRegistrationForm.controls; }
  get f() { return this.userInfoForm.controls; }
  get m() { return this.alertInfoForm.controls; }
  get n() { return this.planSelectionForm.controls; }

  openuserTypeModal(content) {
    this.userTypeModal = content;
    this.modalService.open(this.userTypeModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closePostQuestionModal() {
    this.modalService.dismissAll(this.userTypeModal);
  }

  postUserType() {
    if (this.userTypeForm.invalid) {
      return
    }
    this.userTypeName = "Mineral"
    if (this.userTypeForm.controls.Ownership.value == "2") {
      this.professionalUserType = true;
      this.userTypeName = "Professional"
    }
    this.userTypePage = false;
    this.firstPage = true;
    this.secondPage = false;
    this.thirdPage = false;
    this.closePostQuestionModal();
  }

  goToSecondPage() {
    this.submitUserInfoForm = true;
    if (this.userInfoForm.invalid) {
      return;
    }
    if (this.userInfoForm.controls.password.value != this.userInfoForm.controls.confirmPassword.value) {
      alert("Passwords did not match...Please verify password.")
      return
    }
    this.alertInfoForm.controls.alertPhone.setValue(this.userInfoForm.controls.phoneNumber.value)
    this.alertInfoForm.controls.alertEmail.setValue(this.userInfoForm.controls.eMail.value)
    this.firstPage = false;
    this.secondPage = true;
    this.thirdPage = false;
  }

  goToFisrtPage() {
    this.userTypePage = false;
    this.firstPage = true;
    this.secondPage = false;
    this.thirdPage = false;
  }

  goToThirdPage() {
    this.submitAlertInfoForm = true;
    if (this.alertInfoForm.invalid) {
      return;
    }
    this.firstPage = false;
    this.secondPage = false;
    this.thirdPage = true;
    this.userTypePage = false;
  }

  setConfirmationValues() {
    this.confirmAddress = this.userInfoForm.controls.address.value;
    this.confirmPhoneNumber = this.userInfoForm.controls.phoneNumber.value;
    this.confirmEmail = this.userInfoForm.controls.eMail.value;
  }

  submitUserInformation() {
    debugger;
    this.submitUserInfoForm = true;
    if (this.userInfoForm.invalid) {
      return;
    }
    this.submitUserInfoForm = false;
    let body = {
      // firstName: this.userInfoForm.controls.firstName.value,
      // lastName: this.userInfoForm.controls.lastName.value,
      // eMail: this.userInfoForm.controls.eMail.value,
      // address: this.userInfoForm.controls.address.value,
      // city: this.userInfoForm.controls.city.value,
      // state: this.userInfoForm.controls.state.value,
      // zipCode: this.userInfoForm.controls.zipCode.value,
      // phoneNumber: this.userInfoForm.controls.phoneNumber.value,
      // password: this.userInfoForm.controls.password.value,
      // confirmPassword: this.userInfoForm.controls.confirmPassword.value,
      // alertPhone: this.alertInfoForm.controls.alertPhone.value,
      // alertEmail: this.alertInfoForm.controls.alertEmail.value,
      // alerts: this.alertInfoForm.controls.alerts.value,


      member_type: this.userTypeForm.controls.Ownership.value,
      f_name: this.userInfoForm.controls.firstName.value,
      l_name: this.userInfoForm.controls.lastName.value,
      email_id: this.userInfoForm.controls.eMail.value,
      mailing_st_address: this.userInfoForm.controls.address.value,
      city: this.userInfoForm.controls.city.value,
      state_master_id: this.userInfoForm.controls.state.value,
      zip_code: this.userInfoForm.controls.zipCode.value,
      phone_number: this.userInfoForm.controls.phoneNumber.value,
      password: this.userInfoForm.controls.password.value
      // membershipType: this.userRegistrationForm.controls.membershipType.value,
      // paymentSelection: this.userRegistrationForm.controls.paymentSelection.value,
      // paymentSubscription: this.userRegistrationForm.controls.paymentSubscription.value,
    }
    this.signupService.userRegistration(body).subscribe(data => {
      this.submitUserInfoForm = false;
      if (data['status_code'] == 400) {
        alert("Email is already registered...Please enter another mail id.");
        return;
      };
      this.userId = data['data']
      this.goToSecondPage();
      this.setConfirmationValues();
    },
      error => {
        alert("Email is already registered...Please enter another mail id.");
        console.log(error);
      }
    )

  }


  getStateList() {
    this.signupService.getStates().subscribe(data => {
      this.statesList = data['data'];
    })
  }

  getNotificationPreferencesList() {
    this.signupService.getNotificationPreferencesList().subscribe(data => {
      console.log(data['data']);
      this.notificationPrefList = data['data'];
    })
  }

  sendPrefernceName(name: string) {
    this.preferenceName = name;
  }

  postNotificationPrefernece() {
    debugger;
    this.submitAlertInfoForm = true;
    if (this.alertInfoForm.invalid) {
      return;
    }
    this.submitAlertInfoForm = false;
    let body = {
      phone_number: this.alertInfoForm.controls.alertPhone.value,
      email_id: this.alertInfoForm.controls.alertEmail.value,
      user_id: this.userId,
      preferenceOption_Code: this.alertInfoForm.controls.alerts.value
    }

    this.signupService.postNotificationPrefernece(body).subscribe(data => {
      this.goToThirdPage();
      this.getPlanSelectionData();
    })
  }


  getPlanSelectionData() {
    if (this.userTypeForm.controls.Ownership.value == "1") {
      this.signupService.planSelectionDataForMineralUser().subscribe(data => {
        this.planInformation = data['data'];
        console.log("plan info", this.planInformation)
      })
    }
    else {
      this.signupService.planSelectionDataForProfessionalUser().subscribe(data => {
        this.planInformation = data['data']
        console.log("plan info", this.planInformation)
      })
    }
  }

  sendPlanInfo(MonthlyPrice: any, annualPrice: any, planName: string) {
    debugger;
    this.selMonthlyPrice = MonthlyPrice,
      this.selAnnualPrice = annualPrice,
      this.planName = planName
  }

  sendPlanDuration(duration: string) {
    debugger;
    // this.subscrptionAmount = subscrptionAmount
    this.planDuration = duration
  }

  openClaimLeaseModal(content) {
    debugger
    // this.submitUserRegForm = true;
    // if (this.userRegistrationForm.invalid) {
    //   return;
    // }
    this.claimLeaseModal = content;
    this.modalService.open(this.claimLeaseModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    })
  }

  closeClaimLeaseModal() {
    this.modalService.dismissAll(this.claimLeaseModal);
  }


  completeUserRegistration() {
    debugger;

    if (this.planDuration == "Monthly") {
      this.todayDate = new Date();
      //this.planExpiryDate=(new Date().setMonth(this.todayDate.getMonth()+1))
      this.planExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
    else {
      this.planExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + 12))
    }

    let body = {
      member_id: this.userId,
      mplan_id: this.userRegistrationForm.controls.membershipType.value,
      // amount: this.subscrptionAmount,
      amount: 4000,
      transaction_id: 1,
      planexpiry_date: this.planExpiryDate,
      subscriptionduration: this.planDuration,
      istransactionsuccess: "No",
      transaction_date: new Date(),
      transaction_type: "Register membership Plan"
    }

    this.signupService.completeUserRegistration(body).subscribe(data => {
      alert('Your Plan and membership submitted successfully...')
    });
  }



}
