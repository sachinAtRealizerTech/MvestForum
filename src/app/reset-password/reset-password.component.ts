import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isEmailVerify = false;
  changePasswordPage = false;
  resetEmailPage = true;
  confirmEmailForm: FormGroup;
  resetPasswordForm: FormGroup;
  submitConfirmEmail = false;
  passwordMismatched = false;
  submitResetPassword = false;
  resetPasswordToken: any;
  resetPasswordSuccess = false;
  resetPasswordFailure = false;

  constructor(private resetPasswordService: ResetPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    let url = window.location.href;
    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        this.resetPasswordToken = params['resetPasswordToken'];
        this.changePasswordPage = true;
        this.resetEmailPage = false;
        this.isEmailVerify = false;
        this.resetPasswordSuccess = false;
        this.resetPasswordFailure = false;
      })
    }

    this.confirmEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  get g() { return this.confirmEmailForm.controls }
  get f() { return this.resetPasswordForm.controls }

  goToSignIn() {
    this.submitConfirmEmail = false
    this.confirmEmailForm.reset();
    this.router.navigate(['/signin'])
  }

  generatePasswordResetToken() {
    this.submitConfirmEmail = true;
    if (this.confirmEmailForm.invalid) {
      return
    }
    let body = {
      _emailid: this.g.email.value
    }
    this.resetPasswordService.generatePasswordResetToken(body).subscribe(data => {
      console.log('generateresettoken', data)
      this.changePasswordPage = false;
      this.resetEmailPage = false;
      this.isEmailVerify = true;
      this.resetPasswordSuccess = false;
      this.resetPasswordFailure = false;
    })
  }

  resetPassword() {
    debugger;
    this.submitResetPassword = true;
    if (this.resetPasswordForm.invalid) {
      return
    }
    if (this.f.password.value != this.f.confirmPassword.value) {
      this.passwordMismatched = true;
      return
    }
    let body = {
      _rtoken: this.resetPasswordToken,
      _newpwd: this.f.password.value
    }
    this.resetPasswordService.resetPassword(body).subscribe(data => {
      debugger;
      console.log('resetpwd', data)
      if (data['data'][0]['resetpassowrd'] == "INVALID_TOKEN") {
        this.submitResetPassword = false;
        this.passwordMismatched = false;
        this.resetPasswordSuccess = false;
        this.resetPasswordFailure = true;
        this.changePasswordPage = false;
        this.resetEmailPage = false;
        this.isEmailVerify = false;
        this.resetPasswordForm.reset();
      }
      else {
        this.submitResetPassword = false;
        this.passwordMismatched = false;
        this.resetPasswordSuccess = true;
        this.resetPasswordFailure = false;
        this.changePasswordPage = false;
        this.resetEmailPage = false;
        this.isEmailVerify = false;
        this.resetPasswordForm.reset();
      }

    })
  }


}
