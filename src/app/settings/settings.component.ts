import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Utils } from '../shared/Utils';
import { SignupService } from '../authentication/signup/services/signup.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  editPreferencesPage = false;
  editPreferenceflag = false;
  communityNotification = false;
  communityNotificationflag = false;
  neighborsNotificationflag = false;
  notificationMessagePrefForm: FormGroup
  notificationOptions: any;
  replyToDiscussion: boolean;
  likedOnComment: boolean;
  likedPost: boolean;
  replyOnComment: boolean;
  markAsRead: boolean;
  notificationCode: any;
  notificationPrefList: any;
  preferenceName: any;
  neighborsNotification = false;
  unMarkAsAnswer: boolean;

  constructor(public settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private flashMessagesService : FlashMessagesService) { }

  ngOnInit() {

    this.notificationMessagePrefForm = this.formBuilder.group({
      Preferences: [],
      alerts: []
    })

    this.getNotificationOptions();
    this.getNotificationPreferencesList();
  }

  public user = Utils.GetCurrentUser();

  openEditpreferences() {
    this.editPreferencesPage = true;
    this.editPreferenceflag = true;
  }
  closeEditpreferences() {
    this.editPreferencesPage = false;
    this.editPreferenceflag = false;
  }

  openCommunityNotification() {
    this.communityNotification = true;
    this.communityNotificationflag = true;
  }

  closeCommunityNotification() {
    this.communityNotification = false;
    this.communityNotificationflag = false;
  }

  getNotificationOptions() {
    let body = {
      emailId: "manisha@gmail.com"
    }
    this.settingsService.getNotificationOptions(body).subscribe(data => {
      this.notificationOptions = data
      console.log('notOptions', this.notificationOptions);
      this.replyToDiscussion = this.notificationOptions[0]['Blocked'];
      this.likedOnComment = this.notificationOptions[1]['Blocked'];
      this.likedPost = this.notificationOptions[2]['Blocked'];
      this.replyOnComment = this.notificationOptions[3]['Blocked'];
      this.markAsRead = this.notificationOptions[4]['Blocked'];
      this.unMarkAsAnswer = this.notificationOptions[5]['Blocked'];
    })
  }

  selectReplyOnDiscussion(flag: boolean) {
    debugger;
    this.replyToDiscussion = flag;
    this.notificationCode = this.notificationOptions[0]['code'];
    this.saveNotificationOptions(this.replyToDiscussion, this.notificationCode);
  }

  selectLikedOnComment(flag: boolean) {
    this.likedOnComment = flag;
    this.notificationCode = this.notificationOptions[1]['code'];
    this.saveNotificationOptions(this.likedOnComment, this.notificationCode);
  }

  selectLikedPost(flag: boolean) {
    this.likedPost = flag;
    this.notificationCode = this.notificationOptions[2]['code'];
    this.saveNotificationOptions(this.likedPost, this.notificationCode);
  }

  selectReplyOnComment(flag: boolean) {
    this.replyOnComment = flag;
    this.notificationCode = this.notificationOptions[3]['code'];
    this.saveNotificationOptions(this.replyOnComment, this.notificationCode);
  }

  selectMarkAsRead(flag: boolean) {
    this.markAsRead = flag;
    this.notificationCode = this.notificationOptions[4]['code'];
    this.saveNotificationOptions(this.markAsRead, this.notificationCode);
  }

  selectUnMarkAsAnswer(flag: boolean) {
    debugger;
    this.unMarkAsAnswer = flag;
    this.notificationCode = this.notificationOptions[5]['code'];
    this.saveNotificationOptions(this.unMarkAsAnswer, this.notificationCode);
  }

  saveNotificationOptions(notificationFlag: boolean, blockNotificationCode: string) {
    debugger;
    let body = {
      emailId: "manisha@gmail.com",
      blockNotificationsFlag: notificationFlag,
      blockNotification: blockNotificationCode
    }
    this.settingsService.saveNotificationOptions(body).subscribe(data => {
      this.getNotificationOptions();
    })
  }

  getNotificationPreferencesList() {
    this.signupService.getNotificationPreferencesList().subscribe(data => {
      console.log('preferenceinfo', data['data']);
      this.notificationPrefList = data['data'];
      for (let i = 0; i < this.notificationPrefList.length; i++) {
        if (this.user.preference_optioncode == this.notificationPrefList[i]['masterdata_id']) {
          this.preferenceName = this.notificationPrefList[i]['name'];
          break;
        }
      }

    })
  }

  postNotificationPrefernece() {
    debugger;
    let body = {
      phone_number: this.user.notification_phonenumber,
      email_id: this.user.notification_email,
      user_id: this.user.member_id,
      preferenceOption_Code: this.notificationMessagePrefForm.controls.alerts.value
    }

    this.signupService.postNotificationPrefernece(body).subscribe(data => {
      this.getNotificationPreferencesList();
      this.flashMessagesService.show('Your Notification Preferences updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });

    })
  }

  openNeighborsNotification() {
    this.neighborsNotification = true;
    this.neighborsNotificationflag = true;
  }

  closeNeighborsNotification() {
    this.neighborsNotification = false;
    this.neighborsNotificationflag = false;
  }

}
