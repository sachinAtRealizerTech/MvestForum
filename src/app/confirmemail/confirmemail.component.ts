import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { SignupService } from '../signup/services/signup.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {
  confCode: string;

  constructor(private route: ActivatedRoute, private signupService: SignupService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.confCode = params['confCode']
      //this.subCategoryId = params['subCategoryId'];
      this.verifyEmail()
    });
  }

  verifyEmail() {
    let body = {
      _ConfirmationCode: this.confCode
    }
    this.signupService.confirmEmail(body).subscribe(data => {
      console.log('verifyemaildata', data);
    })
  }

}
