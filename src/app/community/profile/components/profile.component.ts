import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Utils } from 'src/app/shared/Utils';
import { CommunityStats } from '../../models/communitystats';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  communityStats: CommunityStats;
  loading = false;

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    this.getCommunityStats()
  }

  public user = Utils.GetCurrentUser();

  getCommunityStats() {
    this.loading = true;
    this.profileService.getCommunityStats(this.user.email_id).subscribe(data => {
      this.communityStats = data;
      this.loading = false;
      console.log('communityStats', this.communityStats)
    },
      error => {
        this.loading = false;
      })
  }

}
