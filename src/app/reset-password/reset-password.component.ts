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
  submitConfirmEmail = false;

  constructor(private resetPasswordService: ResetPasswordService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.confirmEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get g() { return this.confirmEmailForm.controls }

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




}
