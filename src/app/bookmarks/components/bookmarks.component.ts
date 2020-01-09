import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../services/bookmarks.service';
import { Utils } from '../../shared/Utils';
import { Bookmarks } from '../../bookmarks/models/bookmarks'
import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarksList: Bookmarks[];
  loading = false;

  constructor(private bookmarksService: BookmarksService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.getBookmarks();
  }

  public user = Utils.GetCurrentUser();

  getBookmarks() {
    this.loading = true;
    this.bookmarksService.getBookmarks(this.user.email_id).subscribe(data => {
      this.bookmarksList = data['Bookmarks'];
      this.bookmarksList.forEach((el) => { el.post_by_emailId = environment.IMAGEPREPENDURL + el.post_by_emailId + '.png' })
      this.bookmarksList.sort((a, b) => new Date(b.bookmarkdate).getTime() - new Date(a.bookmarkdate).getTime())
      this.loading = false
      console.log('bookmarkslist', this.bookmarksList);
    },
      error => {
        this.loading = false;
      })
  }

  removeBookmark(docId: string, subcat_id: string) {
    let body = {
      email_id: this.user.email_id,
      disc_doc_id: docId,
      subcat_id: subcat_id
    }
    this.bookmarksService.removeBookmark(body).subscribe(data => {
      console.log('removebookmark', data);
      this.flashMessagesService.show('You have successfully removed this post from bookmarks...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getBookmarks();
    },
      error => {
        console.log(error);
      })
  }

  goToBookmarkedLink(Url: string) {
    Url = Url.slice(31);
    this.router.navigateByUrl(Url);
  }

}
