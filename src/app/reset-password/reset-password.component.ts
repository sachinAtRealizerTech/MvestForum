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
  resetPasswordForm: FormGroup
  submitConfirmEmail = false;
  passwordMismatched = false;
  submitResetPassword = false;

  constructor(private resetPasswordService: ResetPasswordService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  submitEmail() {
    this.isEmailVerify = true;
    this.resetEmailPage = false;
  }

  openChangePasswordPage() {
    this.isEmailVerify = false;
    this.resetEmailPage = false;
    this.changePasswordPage = true;
  }

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
      this.isEmailVerify = true;
      this.resetEmailPage = false;
      this.submitConfirmEmail = false;
    })
  }

  resetPassword() {
    this.submitResetPassword = true;
    if (this.resetPasswordForm.invalid) {
      return
    }
    if (this.f.password != this.f.confirmPassword) {
      this.passwordMismatched = true;
      return
    }

    let body = {
      _rtoken: "85150b3f-f6d5-4c77-b4a7-8d12efbc00035",
      _newpwd: this.f.password.value
    }
    this.resetPasswordService.resetPassword(body).subscribe(data => {
      this.submitResetPassword = true;
      this.resetPasswordForm.reset();
      this.passwordMismatched = false;
    })
  }




}
