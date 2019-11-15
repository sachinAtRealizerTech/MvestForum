import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SignupService } from '../signup/services/signup.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {
  confCode: string;
  verifyEmailFlag = true;
  firstName: string;
  lastName: string;

  constructor(private route: ActivatedRoute,
    private signupService: SignupService,
    private router: Router) { }

  ngOnInit() {

    if (history.state.verifyEmail == false) {
      this.verifyEmailFlag = false;
      this.firstName = history.state.f_name;
      this.lastName = history.state.l_name;
    }
    else {
      this.verifyEmailFlag = true;
      this.route.queryParams.subscribe(params => {
        this.confCode = params['confCode']
        this.verifyEmail();
      });
    }
  }

  verifyEmail() {
    let body = {
      _ConfirmationCode: this.confCode
    }
    this.signupService.confirmEmail(body).subscribe(data => {
      console.log('verifyemaildata', data);
      this.verifyEmailFlag = true;
    })
  }

  sendConfirmationEmail() {
    let body = {
      //_EmailId: ""
      _EmailId: history.state.eMailId
    }
    this.signupService.sendConfirmationEmail(body).subscribe(data => {
      this.router.navigate(['/signin'])
    })
  }

}
