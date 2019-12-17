import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  myNotificationAllData: any;
  submitNotificationMessagePrefForm = false;
  prefCode: any;
  notePhoneValidate = false;

  constructor(public settingsService: SettingsService,
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    this.notificationMessagePrefForm = this.formBuilder.group({
      Preferences: [],
      alerts: [],
      notePhoneNo: [''],
      noteEmailId: ['', [Validators.required, Validators.email]]
    })

    this.getNotificationOptions();
    this.getMyNotificationPreferences();
  }

  public user = Utils.GetCurrentUser();
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  get g() { return this.notificationMessagePrefForm.controls }

  openEditpreferences() {
    this.editPreferencesPage = true;
    this.editPreferenceflag = true;
  }
  closeEditpreferences() {
    this.editPreferencesPage = false;
    this.editPreferenceflag = false;
    this.submitNotificationMessagePrefForm = false;
    this.getMyNotificationPreferences();
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
      emailId: this.user.email_id
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
      emailId: this.user.email_id,
      blockNotificationsFlag: notificationFlag,
      blockNotification: blockNotificationCode
    }
    this.settingsService.saveNotificationOptions(body).subscribe(data => {
      this.getNotificationOptions();
    })
  }

  postNotificationPrefernece() {
    debugger;
    this.submitNotificationMessagePrefForm = true
    if (this.notificationMessagePrefForm.invalid) {
      return
    }
    if (this.notificationMessagePrefForm.controls.alerts.value) {
      this.prefCode = this.notificationMessagePrefForm.controls.alerts.value
    }
    if (this.prefCode == "53" || this.prefCode == "51") {
      this.notePhoneValidate = true;
      return
    }
    this.notePhoneValidate = false
    let body = {
      phone_number: this.notificationMessagePrefForm.controls.notePhoneNo.value,
      email_id: this.notificationMessagePrefForm.controls.noteEmailId.value,
      user_id: this.user.member_id,
      preferenceOption_Code: this.prefCode
    }

    this.signupService.postNotificationPrefernece(body).subscribe(data => {
      this.getMyNotificationPreferences();
      this.flashMessagesService.show('Your Notification Preferences updated successfully...', { cssClass: 'bg-accent flash-message', timeout: 2000 });
      this.submitNotificationMessagePrefForm = false
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

  getMyNotificationPreferences() {
    this.settingsService.getMyNotificationPreferences(this.user.email_id).subscribe(data => {
      console.log('prefdata', data);
      this.notificationPrefList = data['data']['myNotPrefs'];
      this.myNotificationAllData = data['data'];
      this.prefCode = this.myNotificationAllData.notprefId;
      let body = {
        notePhoneNo: this.myNotificationAllData.notphoneno,
        noteEmailId: this.myNotificationAllData.notemailid
      }
      this.notificationMessagePrefForm.patchValue(body);
      for (let i = 0; i < this.notificationPrefList.length; i++) {
        if (this.notificationPrefList[i]['selected'] == true) {
          this.preferenceName = this.notificationPrefList[i]['notPref'];

          break;
        }
      }
    })
  }

}
