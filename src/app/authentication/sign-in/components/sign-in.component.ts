import { Component, OnInit } from '@angular/core';
import { SigninService } from '../services/signin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { graceLimit } from '../../../shared/constants'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private signinService: SigninService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  submitSignIn = false;
  signInForm: FormGroup;
  verifyLogin = false;

  ngOnInit() {

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  //Setting getter properties for easy form access
  get l() { return this.signInForm.controls }

  signIn() {
    debugger;
    this.submitSignIn = true;
    if (this.signInForm.invalid) {
      return;
    }
    this.submitSignIn = false;
    let body = {
      email_id: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value
    }

    this.signinService.signIn(body).subscribe(data => {
      console.log("login", data);
      if (data['data'] && data['data'].token) {
        if (data['data'].email_verified == true) {
          console.log('login', data['data'])
          this.signinService.loggedIn.next(true);
          localStorage.setItem('currentUser', JSON.stringify(data['data']));
          this.router.navigate(['/dashboard'], { state: { verifyEmail: true } });
          this.verifyLogin = false;
        }
        else {
          debugger;
          let date1 = new Date(data['data'].registration_date);
          let date2 = new Date();

          let Difference_In_Time = date2.getTime() - date1.getTime();

          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

          if (Difference_In_Days > graceLimit.graceLimit) {
            this.signinService.loggedIn.next(false);
            this.router.navigate(['/confirmemail'], { state: { verifyEmail: false, f_name: data['data'].f_name, l_name: data['data'].l_name, eMailId: data['data'].email_id } });
            this.verifyLogin = false;
          }
          else {
            this.signinService.loggedIn.next(true);
            localStorage.setItem('currentUser', JSON.stringify(data['data']));
            let date1 = new Date(data['data'].registration_date);
            let graceEndDate = new Date(date1.setDate(date1.getDate() + 10))
            this.router.navigate(['/dashboard'], { state: { verifyEmail: false, graceEndDate: graceEndDate } });
            this.verifyLogin = false;
          }

        }

      }
      if (data['message'] == "Invalid data...") {
        this.verifyLogin = true;
      }
    },
      err => {
        console.log('err', err)
      })
  }

  goToSignUp() {
    this.signInForm.reset();
    this.router.navigate(['/signup'])
  }

}
