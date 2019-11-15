import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../shared/Utils';
import { SignupService } from '../authentication/signup/services/signup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('emailVerificationTemplate', { static: true }) emailVerificationModal: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private signupService: SignupService) { }

  verifyEmail: boolean;
  graceEndDate: Date;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      debugger;
      this.verifyEmail = history.state.verifyEmail;
      this.graceEndDate = history.state.graceEndDate;
      if (this.verifyEmail == false) {
        debugger;
        this.modalService.open(this.emailVerificationModal, {
          backdrop: 'static',
          backdropClass: 'customBackdrop',

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
      this.modalService.dismissAll(this.emailVerificationModal)
    })
  }

}
