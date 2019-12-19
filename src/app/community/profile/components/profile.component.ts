import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Utils } from 'src/app/shared/Utils';
import { CommunityStats } from '../../models/communitystats'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  communityStats: CommunityStats;
  loading = false;

  constructor(private profileService: ProfileService) { }

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
