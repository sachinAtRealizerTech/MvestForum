import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  searchText: any

  ngOnInit() {
    this.getNotificationMasterEntries();
    this.getMyNotifications('atul22@gmail.com');
  }

  getNotificationMasterEntries() {
    this.notificationService.getNotificationMasterEntries().subscribe(data => {
      console.log('notificationmaster', data);
    })
  }

  getMyNotifications(email: string) {
    this.notificationService.getMyNotifications(email).subscribe(data => {
      console.log('mynotifications', data)
    })
  }

}
