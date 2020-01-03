import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Utils } from 'src/app/shared/Utils';
import { CommunityStats } from '../../models/communitystats';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecentDiscussions } from '../models/recentDiscussions';
import { Router, ActivatedRoute } from '@angular/router';
import { MyNews } from '../models/myNews';
import { RecentPhotos } from '../models/recentPhotos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  communityStats: CommunityStats;
  loading = false;
  recentDiscussions: RecentDiscussions[];
  MyNews: MyNews[];
  recentPhotos: RecentPhotos[];

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getCommunityStats();
    this.getRecentDiscussionsAndPhotos();
    this.getMyNews();
  }

  public user = Utils.GetCurrentUser();

  getCommunityStats() {

    this.profileService.getCommunityStats(this.user.email_id).subscribe(data => {
      this.communityStats = data;

      console.log('communityStats', this.communityStats)
    },
      error => {

      })
  }

  getMyNews() {
    this.loading = true;
    this.profileService.getMyNews(this.user.member_id).subscribe(data => {
      console.log('mynews', data)
      this.MyNews = data;
      this.MyNews.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }

  getRecentDiscussionsAndPhotos() {
    this.profileService.getRecentDiscussionsAndPhotos(this.user.email_id).subscribe(data => {
      debugger;
      console.log('recent disc and photos', data)
      if (data['RD']) {
        this.recentDiscussions = data['RD']['recent_discussions'];
        this.recentDiscussions.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
      }
      if (data['RP']) {
        this.recentPhotos = data['RP']['recent_photos'];
        this.recentPhotos.forEach((el) => { el.thumbnail_file_name = environment.IMAGEPREPENDURL + el.thumbnail_file_name });
        this.recentPhotos.sort((a, b) => new Date(b.create_ts).getTime() - new Date(a.create_ts).getTime())
      }
      this.loading = false;
    },
      error => {
      })
  }

  navigateToDiscussion(url: string) {
    url = url.slice(31)
    this.router.navigateByUrl(url)
  }

}
