import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../services/bookmarks.service';
import { Utils } from '../../shared/Utils';
import { Bookmarks } from '../../bookmarks/models/bookmarks'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarksList: Bookmarks[] = [];

  constructor(private bookmarksService: BookmarksService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getBookmarks();
  }

  public user = Utils.GetCurrentUser();

  getBookmarks() {
    this.bookmarksService.getBookmarks(this.user.email_id).subscribe(data => {
      this.bookmarksList = data['Bookmarks'];
      console.log('bookmarkslist', this.bookmarksList);
    })
  }

  removeBookmark(docId: string) {
    let body = {
      email_id: this.user.email_id,
      disc_doc_Id: docId
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

}
