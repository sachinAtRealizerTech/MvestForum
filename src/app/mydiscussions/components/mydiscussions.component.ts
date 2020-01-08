import { Component, OnInit } from '@angular/core';
import { MydiscussionsService } from '../services/mydiscussions.service';
import { DiscussionslistService } from '../../community/discussions/discussionlist/Services/discussionslist.service';
import { Utils } from '../../shared/Utils';
import { BookmarksService } from '../../bookmarks/services/bookmarks.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';

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
  subCategoryId: string;
  imagePrepend: string;
  png: string;

  constructor(private mydiscussionsService: MydiscussionsService,
    private discussionslistService: DiscussionslistService,
    private bookmarksService: BookmarksService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.imagePrepend = environment.IMAGEPREPENDURL;
    this.png = '.png'
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
    this.subCategoryId = subCatId;
    this.discussionslistService.getAllDiscussionsList(subCatId, true, this.user.email_id).subscribe(data => {
      this.discussionListPage = true;
      this.loading = false;
      this.myDiscussionList = data;
      // this.myDiscussionList.discussions.forEach((el) => { el.post_by_emailId = environment.IMAGEPREPENDURL + el.post_by_emailId + '.png' })
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

  bookmarkDiscussion(docId: string) {
    debugger;
    let body = {
      email_id: this.user.email_id,
      subcat_id: this.subCategoryId,
      disc_doc_id: docId,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.bookmarksService.bookmarkDiscussion(body).subscribe(data => {
      console.log('bookmark', data);
      this.flashMessagesService.show('You have successfully added this post to bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getMyDiscussionsList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }


  removeBookmark(docId: string) {
    let body = {
      email_id: this.user.email_id,
      disc_doc_id: docId,
      subcat_id: this.subCategoryId
    }
    this.bookmarksService.removeBookmark(body).subscribe(data => {
      console.log('removebookmark', data);
      this.flashMessagesService.show('You have successfully removed this post from bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getMyDiscussionsList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }


}
