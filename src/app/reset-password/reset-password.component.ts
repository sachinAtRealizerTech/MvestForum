import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isEmailVerify=false;
  changePasswordPage=false;
  resetEmailPage=true;
  constructor() { }

  ngOnInit() {
  }

  submitEmail(){
    this.isEmailVerify=true; 
    this.resetEmailPage=false;
  }

  openChangePasswordPage(){
this.isEmailVerify=false; 
this.resetEmailPage=false;
this.changePasswordPage=true;
  }
}
