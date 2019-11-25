import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SignupService } from '../signup/services/signup.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private signupService: SignupService,
    private router: Router) { }

  confCode: string;
  verifyEmailFlag: boolean;
  firstName: string;
  lastName: string;
  emailNotVerifyFlag: boolean;
  graceEmailFlag: boolean;

  ngOnInit() {

    let url = window.location.href;

    if (url.includes('?')) {
      this.route.queryParams.subscribe(params => {
        debugger;
        this.confCode = params['confCode']
        this.verifyEmail();
      })
    }
    else {
      this.graceEmailFlag = true;
      this.emailNotVerifyFlag = false;
      this.verifyEmailFlag = false;
      this.firstName = history.state.f_name;
      this.lastName = history.state.l_name;
    }

    // if (history.state.  == false) {
    //   this.graceEmailFlag = true;
    //   this.emailNotVerifyFlag = false;
    //   this.verifyEmailFlag = false;
    //   this.firstName = history.state.f_name;
    //   this.lastName = history.state.l_name;
    // }
    // else {
    //   this.route.queryParams.subscribe(params => {
    //     debugger;
    //     this.confCode = params['confCode']
    //     this.verifyEmail();
    //   });
    // }
  }

  verifyEmail() {
    debugger;
    let body = {
      _ConfirmationCode: this.confCode
    }
    this.signupService.confirmEmail(body).subscribe(data => {
      console.log('verifyemaildata', data);
      if (data['data'][0].confirmemailaddress == "INVALID_CODE") {
        debugger;
        this.emailNotVerifyFlag = true;
        this.verifyEmailFlag = false;
        this.graceEmailFlag = false;
      }
      else {
        this.verifyEmailFlag = true;
        this.emailNotVerifyFlag = false;
        this.graceEmailFlag = false;
      }
    })
  }

  sendConfirmationEmail() {
    let body = {
      _EmailId: history.state.eMailId
    }
    this.signupService.sendConfirmationEmail(body).subscribe(data => {
      this.router.navigate(['/signin'])
    })
  }

}
