import { Component, OnInit } from '@angular/core';
import { Utils } from '../../shared/Utils';
import { ProfileService } from 'src/app/community/profile/services/profile.service';
import { CommunityStats } from 'src/app/community/models/communitystats';
import { environment } from 'src/environments/environment';
import { RecentDiscussions } from 'src/app/community/profile/models/recentDiscussions';
import { RecentPhotos } from 'src/app/community/profile/models/recentPhotos';
import { MyNews } from 'src/app/community/profile/models/myNews';

@Component({
  selector: 'app-mvest-user',
  templateUrl: './mvest-user.component.html',
  styleUrls: ['./mvest-user.component.scss']
})
export class MvestUserComponent implements OnInit {
  userEmailId: string;
  memberId: number;
  communityStats: CommunityStats;
  recentDiscussions: RecentDiscussions[];
  recentPhotos: RecentPhotos[];
  loading = false;
  MyNews: MyNews[];


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    debugger;
    if (history.state.emailId && history.state.memberId) {
      localStorage.setItem('userEmailId', history.state.emailId);
      this.userEmailId = localStorage.getItem('userEmailId');
      localStorage.setItem('userMemberId', history.state.memberId)
      this.memberId = Number(localStorage.getItem('userMemberId'));
    }
    else {
      this.userEmailId = localStorage.getItem('userEmailId');
      this.memberId = Number(localStorage.getItem('userMemberId'));
    }
    console.log(this.userEmailId, this.memberId);
    this.getCommunityStats();
    this.getRecentDiscussionsAndPhotos();
    this.getUserNews();
  }

  public user = Utils.GetCurrentUser();

  getCommunityStats() {
    this.profileService.getCommunityStats(this.userEmailId).subscribe(data => {
      this.communityStats = data;
      console.log('commstats', this.communityStats)
    },
      error => {

      })
  }

  getRecentDiscussionsAndPhotos() {
    this.profileService.getRecentDiscussionsAndPhotos(this.userEmailId).subscribe(data => {
      if (data['RD']) {
        this.recentDiscussions = data['RD']['recent_discussions'];
        this.recentDiscussions.sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
      }
      if (data['RP']) {
        this.recentPhotos = data['RP']['recent_photos'];
        this.recentPhotos.forEach((el) => { el.thumbnail_file_name = environment.IMAGEPREPENDURL + el.thumbnail_file_name });
        this.recentPhotos.sort((a, b) => new Date(b.create_ts).getTime() - new Date(a.create_ts).getTime())
      }
    },
      error => {
      })
  }

  getUserNews() {
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



}
