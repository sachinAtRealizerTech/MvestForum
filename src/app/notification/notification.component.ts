import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Utils } from '../shared/Utils';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  myNotifications: Object;

  constructor(private notificationService: NotificationService,
    private flashMessagesService: FlashMessagesService) { }

  searchText: any;
  emailId: string = "atul22@gmail.com";
  currentFeature: string = "All";
  currentStatus: string = "Unread";
  currentType: string = "Info";

  ngOnInit() {
    this.getNotificationMasterEntries();
    this.getMyNotifications();
    this.getMyArchNotification("atul22@gmail.com");
  }

  public user = Utils.GetCurrentUser();

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
    this.notificationService.getMyNotifications(this.emailId, this.currentFeature, this.currentStatus, this.currentType).subscribe(data => {
      this.myNotifications = data;
      console.log('mynotifications', data)
    })
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
      emailid: "atul22@gmail.com",
      NotificationId: id
    }
    this.notificationService.archievingNotification(body).subscribe(data => {
      this.flashMessagesService.show('Your have successfully archieved notification...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
    })
  }

  getMyArchNotification(email: string) {
    this.notificationService.getMyArchNotification(email).subscribe(data => {
      console.log('Archive', data)
    })
  }

}
