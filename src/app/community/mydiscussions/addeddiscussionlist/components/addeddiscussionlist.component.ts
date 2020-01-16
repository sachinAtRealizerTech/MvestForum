import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { DiscussionslistService } from 'src/app/community/discussions/discussionlist/Services/discussionslist.service';
import { BookmarksService } from 'src/app/community/bookmarks/services/bookmarks.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-addeddiscussionlist',
  templateUrl: './addeddiscussionlist.component.html',
  styleUrls: ['./addeddiscussionlist.component.scss']
})
export class AddeddiscussionlistComponent implements OnInit {
  loading: boolean;
  myDiscussionList: any[];
  subCatId: string;
  isMyDiscussions: boolean;

  constructor(private discussionslistService: DiscussionslistService,
    private bookmarksService: BookmarksService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    debugger;
    if (history.state.subCatId) {
      localStorage.setItem("subCatId", history.state.subCatId);
      this.subCatId = localStorage.getItem('subCatId');
      localStorage.setItem("isMyDiscussions", history.state.isMyDiscussions)
      this.isMyDiscussions = Boolean(localStorage.getItem('isMyDiscussions'))
    }
    else {
      this.subCatId = localStorage.getItem('subCatId');
      this.isMyDiscussions = Boolean(localStorage.getItem('isMyDiscussions'))
    }

    this.getDiscussionsList(this.subCatId, this.isMyDiscussions)

  }

  public user = Utils.GetCurrentUser();

  getDiscussionsList(subCatId: string, isMyDiscussion: boolean) {
    this.loading = true;
    this.discussionslistService.getAllDiscussionsList(subCatId, isMyDiscussion, this.user.email_id).subscribe(data => {
      debugger;
      this.loading = false;
      this.myDiscussionList = data['discussions'];
      this.myDiscussionList.sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime())
      console.log('subcatdisclist', this.myDiscussionList)
    },
      error => {
        this.loading = false;
      })
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
      subcat_id: this.subCatId,
      disc_doc_id: docId,
      name: this.user.f_name + " " + this.user.l_name
    }
    this.bookmarksService.bookmarkDiscussion(body).subscribe(data => {
      console.log('bookmark', data);
      this.flashMessagesService.show('You have successfully added this post to bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      // this.getMyDiscussionsList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }


  removeBookmark(docId: string) {
    let body = {
      email_id: this.user.email_id,
      disc_doc_id: docId,
      subcat_id: this.subCatId
    }
    this.bookmarksService.removeBookmark(body).subscribe(data => {
      console.log('removebookmark', data);
      this.flashMessagesService.show('You have successfully removed this post from bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      // this.getMyDiscussionsList(this.subCategoryId);
    },
      error => {
        console.log(error);
      })
  }

  goToMyDiscussionGroup() {
    this.router.navigate(['/community/mydiscussions'])
  }

}
