import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from './signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SigninService } from './signin.service';

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
  signInForm: FormGroup;
  interestPageForm: FormGroup;
  firstStepWizardForm: FormGroup;
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
  submitSignIn = false;
  interestPage = false;
  interestQstnAnsList: any;
  submitInterestPrefForm = false;
  answerText: string;
  secondStepWizardForm: FormGroup;
  submitFirstStep = false;
  submitSecondStep = false;
  passwordVerifyModal: ElementRef;
  duplicateEmail = false;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,
    private signupService: SignupService, private router: Router, private route: ActivatedRoute,
    private signinService: SigninService) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.userTypeForm = this.formBuilder.group({
      Ownership: ['', Validators.required]
    });

    this.userRegistrationForm = this.formBuilder.group({
      membershipType: ['', Validators.required],
      paymentSelection: ['', Validators.required],
      subscriptionAmount: ['', Validators.required],

    });

    this.alertInfoForm = this.formBuilder.group({
      alertPhone: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      alertEmail: ['', [Validators.required, Validators.email]],
      alerts: ['', Validators.required]
    })

    this.interestPageForm = this.formBuilder.group({
      interest: ['', Validators.required],
      provider: ['', Validators.required],
      interestOther: [],
      providerOther: []
    })

    this.firstStepWizardForm = this.formBuilder.group({
      membershipType: ['', Validators.required]
    })

    this.secondStepWizardForm = this.formBuilder.group({
      paymentSelection: ['', Validators.required],
      subscriptionAmount: ['', Validators.required]
    })

    this.userInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: [''],
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
  get p() { return this.interestPageForm.controls }
  get n() { return this.planSelectionForm.controls; }
  get l() { return this.signInForm.controls }
  get q() { return this.firstStepWizardForm.controls }
  get r() { return this.secondStepWizardForm.controls }

  openuserTypeModal(content) {
    this.submitSignIn = false;
    this.userTypeModal = content;
    this.modalService.open(this.userTypeModal, {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'sm'
    })
  }

  closePostQuestionModal() {
    this.modalService.dismissAll(this.userTypeModal);
  }

  postUserType() {
    if (this.userTypeForm.invalid) {
      return
    }
    this.professionalUserType = false;
    this.userTypeName = "Mineral"
    if (this.userTypeForm.controls.Ownership.value == "Professional") {
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
    this.alertInfoForm.controls.alertPhone.setValue(this.userInfoForm.controls.phoneNumber.value)
    this.alertInfoForm.controls.alertEmail.setValue(this.userInfoForm.controls.eMail.value)
    this.firstPage = false;
    this.secondPage = true;
    this.thirdPage = false;
    this.submitUserInfoForm = false;
    this.interestPage = false;
  }

  goToFisrtPage() {
    this.userTypePage = false;
    this.firstPage = true;
    this.secondPage = false;
    this.thirdPage = false;
    this.interestPage = false;
  }

  goToInterestPage() {
    this.userTypePage = false;
    this.firstPage = false;
    this.secondPage = false;
    this.thirdPage = false;
    this.interestPage = true;
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
    this.submitAlertInfoForm = false;
    this.interestPage = false;
  }

  setConfirmationValues() {
    this.confirmAddress = this.userInfoForm.controls.address.value;
    this.confirmPhoneNumber = this.alertInfoForm.controls.alertPhone.value;
    this.confirmEmail = this.alertInfoForm.controls.alertEmail.value;
  }

  submitUserInformation(passwordVerifyModal) {
    debugger;
    this.submitUserInfoForm = true;
    this.duplicateEmail = false;
    this.passwordVerifyModal = passwordVerifyModal;
    if (this.userInfoForm.invalid) {
      return;
    }
    if (this.userInfoForm.controls.password.value != this.userInfoForm.controls.confirmPassword.value) {

      this.modalService.open(this.passwordVerifyModal, {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        size: 'sm'
      })
      return
    }
    this.submitUserInfoForm = false;
    let body = {
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
    }
    this.signupService.userRegistration(body).subscribe(data => {
      this.submitUserInfoForm = false;
      console.log('status code', data['status_code'])
      if (data['error'] == "duplicate key value violates unique constraint \"unique_emailid\"") {
        this.duplicateEmail = true;
        return;
      };
      this.userId = data['data'];
      this.goToSecondPage();
    },
      error => {
        console.log(error);
      }
    )
  }

  closeVerifyPasswordModal() {
    this.modalService.dismissAll(this.passwordVerifyModal);
  }


  getStateList() {
    debugger;
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

      if (this.professionalUserType) {
        this.getInterestQuestionAns();
        this.goToInterestPage();
      }
      else {
        this.goToThirdPage();
      }
      this.setConfirmationValues();
      this.getPlanSelectionData();
    })
  }


  getInterestQuestionAns() {
    this.signupService.getInterestQuestionAns().subscribe(data => {
      this.interestQstnAnsList = data['data'];
      console.log('interst', data['data'])
    })
  }

  sendAnswerText(answerText: string) {
    this.answerText = answerText
  }

  postInterestPrefernce() {
    debugger;
    this.submitInterestPrefForm = true;
    if (this.interestPageForm.invalid) {
      return;
    }

    this.submitInterestPrefForm = false;
    let body = {
      member_id: this.userId,
      pa_reg_question_id: this.interestPageForm.controls.interest.value,
      answers_text: this.answerText,
      answer_code: this.interestPageForm.controls.provider.value
    }
    this.signupService.postInterestPrefernce(body).subscribe(data => {
      this.goToThirdPage();
    })

  }

  getPlanSelectionData() {
    if (this.userTypeForm.controls.Ownership.value == "Mineral") {
      this.signupService.planSelectionDataForMineralUser().subscribe(data => {
        this.planInformation = data['data'];
      })
    }
    else {
      this.signupService.planSelectionDataForProfessionalUser().subscribe(data => {
        this.planInformation = data['data']
      })
    }
  }


  validateFirstWizardStep() {
    this.submitFirstStep = true;
    if (this.firstStepWizardForm.invalid) {
      return;
    }
    this.submitFirstStep = false;
  }

  validateSecondWizardStep() {
    this.submitSecondStep = true;
    if (this.secondStepWizardForm.invalid) {
      return;
    }
    this.submitSecondStep = false;
  }

  sendPlanInfo(MonthlyPrice: any, annualPrice: any, planName: string) {
    debugger;
    this.selMonthlyPrice = MonthlyPrice,
      this.selAnnualPrice = annualPrice,
      this.planName = planName
  }

  sendPlanDuration(duration: string, amount: any) {
    debugger;
    this.subscrptionAmount = amount
    this.planDuration = duration
  }

  openClaimLeaseModal(content) {
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
      this.planExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
    else {
      this.planExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + 12))
    }

    let body = {
      member_id: this.userId,
      mplan_id: this.firstStepWizardForm.controls.membershipType.value,
      amount: this.selMonthlyPrice,
      transaction_id: 1,
      planexpiry_date: this.planExpiryDate,
      subscriptionduration: this.planDuration,
      istransactionsuccess: "Yes",
      transaction_date: new Date(),
      transaction_type: this.secondStepWizardForm.controls.paymentSelection.value
    }

    this.signupService.completeUserRegistration(body).subscribe(data => {
      alert('Your Plan and membership submitted successfully...');
      this.modalService.dismissAll(this.claimLeaseModal);
      this.userInfoForm.reset();
      this.alertInfoForm.reset();
      this.interestPageForm.reset();
      this.userTypeForm.reset();
      this.userRegistrationForm.reset();
      this.firstStepWizardForm.reset();
      this.secondStepWizardForm.reset();
      this.thirdPage = false;
      this.professionalUserType = false;
    });
  }

  openSignIn() {
    debugger;
    this.submitUserInfoForm = false;
    this.submitAlertInfoForm = false;
    this.submitInterestPrefForm = false;
    this.submitFirstStep = false;
    this.submitSecondStep = false;
    this.userInfoForm.reset();
    this.alertInfoForm.reset();
    this.interestPageForm.reset();
    this.firstStepWizardForm.reset();
    this.secondStepWizardForm.reset();
    this.userTypePage = false;
    this.firstPage = false;
    this.secondPage = false;
    this.thirdPage = false;
    this.duplicateEmail = false;
    this.router.navigate(['/signin']);
  }

}
