import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Utils } from '../shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HighlightText } from '../shared/pipes/highlightText.pipe';
import { error } from 'util';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  masterEntries: any;
  masterEntriesFeature: any = [];
  masterEntriesType: any = [];
  masterEntriesStatus: any = [];
  myNotifications: any = [];
  p: any;
  q: any;

  showNotificationsPage = true;
  showArchivesPage = false;
  archivedNotifications: any = [];
  constructor(private notificationService: NotificationService,
    private flashMessagesService: FlashMessagesService) { }

  searchText: any;
  emailId: string;
  currentFeature: string = "All";
  currentStatus: string = "Unread";
  currentType: string = "Info";

  ngOnInit() {
    this.getNotificationMasterEntries();
    this.getMyNotifications();
  }

  public user = Utils.GetCurrentUser();

  showNotifications() {
    this.showNotificationsPage = true;
    this.showArchivesPage = false;
  }
  showArchives() {
    this.showNotificationsPage = false;
    this.showArchivesPage = true;
    this.getMyArchNotification(this.user.email_id);
  }
  getNotificationMasterEntries() {
    this.notificationService.getNotificationMasterEntries().subscribe(data => {
      console.log('notificationmaster', data);
      this.masterEntries = data;

      for (let i = 0; i < this.masterEntries.length; i++) {
        if (this.masterEntries[i].Entities.Key == "NFeature") {
          this.masterEntriesFeature.push(this.masterEntries[i]);
          console.log('feature', this.masterEntriesFeature)
        }
        if (this.masterEntries[i].Entities.Key == "NType") {
          this.masterEntriesType.push(this.masterEntries[i]);
          console.log('type', this.masterEntriesType)
        }
        if (this.masterEntries[i].Entities.Key == "NStatus") {
          this.masterEntriesStatus.push(this.masterEntries[i]);
          console.log('status', this.masterEntriesStatus)
        }
      }

    })
  }

  getMyNotifications() {
    this.notificationService.getMyNotifications(this.user.email_id, this.currentFeature, this.currentStatus, this.currentType).subscribe(data => {
      debugger;
      this.myNotifications = data;
      this.myNotifications.sort((a, b) => new Date(b.Notifications.Date).getTime() - new Date(a.Notifications.Date).getTime())
      console.log('mynotifications', data)
    })
    err => {
      console.log('getMyNotifications', err)
    }
  }

  selectFeature(event: any) {
    this.currentFeature = event.target.value;
    this.getMyNotifications();
  }

  selectType(event: any) {
    debugger;
    this.currentType = event.target.value;
    this.getMyNotifications();
  }

  selectStatus(event: any) {
    this.currentStatus = event.target.value;
    this.getMyNotifications();
  }

  archievingNotification(id: string) {
    debugger;
    let body = {
      emailid: this.user.email_id,
      NotificationId: id
    }
    this.notificationService.archievingNotification(body).subscribe(data => {
      this.flashMessagesService.show('Your have successfully archieved notification...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.getMyNotifications()
    })
  }

  getMyArchNotification(email: string) {
    this.notificationService.getMyArchNotification(this.user.email_id).subscribe(data => {
      console.log('Archive', data);
      this.archivedNotifications = data;
      this.archivedNotifications.sort((a, b) => new Date(b.Notifications.Date).getTime() - new Date(a.Notifications.Date).getTime())
    })
  }

}
