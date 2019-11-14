import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../shared/Utils';
import { SignupService } from '../signup/services/signup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('emailVerificationTemplate', { static: true }) emailVerificationModal: TemplateRef<any>;

  verifyEmail: string;

  constructor(private route: ActivatedRoute, private flashMessagesService: FlashMessagesService,
    private modalService: NgbModal, private signupService: SignupService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      debugger;
      this.verifyEmail = params['verifyEmail'];
      if (this.verifyEmail == "false") {
        debugger;
        // this.flashMessagesService.show('Your E-mail ID is not verified yet...Please verify it within 10 days of your registration.', { cssClass: 'bg-warning flash-message', timeout: 10000 });
        this.modalService.open(this.emailVerificationModal, {
          backdrop: 'static',
          backdropClass: 'customBackdrop',
          size: 'lg'
        })
      }
    });
  }

  public user = Utils.GetCurrentUser()

  closeEmailVerificationAlertModal() {
    this.modalService.dismissAll(this.emailVerificationModal)
  }

  sendConfirmationEmail() {
    let body = {
      _EmailId: this.user.email_id
    }
    this.signupService.sendConfirmationEmail(body).subscribe(data => {
    })
  }

}
