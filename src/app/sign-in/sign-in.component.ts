import { Component, OnInit } from '@angular/core';
import { SigninService } from '../signup/signin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submitSignIn = false;
  signInForm: FormGroup;

  constructor(private signinService: SigninService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

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
        this.router.navigate(['/dashboard']);
      }
      if (data['message'] == "Invalid data...") {
        alert("Sorry...You have not been logged in..Please verify your credentials")
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
