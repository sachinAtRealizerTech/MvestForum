import { Component, OnInit } from '@angular/core';
import { MydiscussionsService } from './mydiscussions.service';
import { DiscussionslistService } from '../community/discussions/discussionlist/Services/discussionslist.service';
import { Utils } from '../shared/Utils';

@Component({
  selector: 'app-mydiscussions',
  templateUrl: './mydiscussions.component.html',
  styleUrls: ['./mydiscussions.component.scss']
})
export class MydiscussionsComponent implements OnInit {
  myDiscussionGroups: any;
  myDiscussionList: any;
  discussionListPage = false;
  loading = false;
  pageNotFound = false;

  constructor(private mydiscussionsService: MydiscussionsService,
    private discussionslistService: DiscussionslistService) { }

  ngOnInit() {
    this.getMyDiscussionGroups(this.user.email_id)
  }

  public user = Utils.GetCurrentUser();

  getMyDiscussionGroups(email: string) {
    this.loading = true;
    this.mydiscussionsService.getMyDiscussionGroups(email).subscribe(data => {
      console.log('mydiscussions', data['data']);
      this.loading = false;
      this.myDiscussionGroups = data['data']
    },
      error => {
        this.loading = false;
      })
  }

  getMyDiscussionsList(subCatId: string) {
    debugger;
    this.loading = true;
    this.discussionslistService.getAllDiscussionsList(subCatId, true, this.user.email_id).subscribe(data => {
      this.discussionListPage = true;
      this.loading = false;
      this.myDiscussionList = data;
      this.myDiscussionList.discussions.sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime())
      console.log('mydisclist', this.myDiscussionList)
    },
      error => {
        this.loading = false;
      })
  }

  goToMyDiscussionGroup() {
    this.discussionListPage = false;
  }

  markAsAnswer(dl: boolean) {
    if (dl == true) {
      return true
    }
    else {
      return false
    }
  }


}
