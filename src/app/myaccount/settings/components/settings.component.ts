import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from '../../../shared/Utils';
import { SignupService } from '../../../authentication/signup/services/signup.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserNotificationOptions } from '../models/notificationOptions';

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
  notificationCode: any;
  notificationPrefList: any;
  preferenceName: any;
  neighborsNotification = false;
  myNotificationAllData: any;
  submitNotificationMessagePrefForm = false;
  prefCode: any;
  notePhoneValidate = false;
  loading = false;
  notificationOptions: UserNotificationOptions[];
  communityNoteOptions: UserNotificationOptions[];
  neighborsNoteOptions: UserNotificationOptions[];
  setTrueFalse: boolean;

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
    this.loading = true;
    let body = {
      emailId: this.user.email_id
    }
    this.settingsService.getNotificationOptions(body).subscribe(data => {
      this.notificationOptions = data
      console.log('notOptions', this.notificationOptions);
      debugger;
      this.communityNoteOptions = [];
      this.neighborsNoteOptions = [];
      for (let i = 0; i < this.notificationOptions.length; i++) {
        debugger;
        if (this.notificationOptions[i].feature == "Community") {
          this.communityNoteOptions.push(this.notificationOptions[i])
          console.log('communitynotOptions', this.communityNoteOptions);
        }
        if (this.notificationOptions[i].feature == "Neighbors") {
          this.neighborsNoteOptions.push(this.notificationOptions[i])
          console.log('nebnotOptions', this.neighborsNoteOptions);
        }
      }
      this.loading = false;
    },
      error => {
        this.loading = false;
      })
  }

  selectOnOffOption(flag: boolean, noteCode: string) {
    this.setTrueFalse = flag;
    this.notificationCode = noteCode;
    this.saveNotificationOptions(this.setTrueFalse, this.notificationCode);
  }

  saveNotificationOptions(notificationFlag: boolean, blockNotificationCode: string) {
    debugger;
    this.loading = true
    let body = {
      emailId: this.user.email_id,
      blockNotificationsFlag: notificationFlag,
      blockNotification: blockNotificationCode
    }
    this.settingsService.saveNotificationOptions(body).subscribe(data => {
      this.loading = false
      this.getNotificationOptions();
    },
      error => {
        this.loading = false
      })
  }

  postNotificationPrefernece() {
    debugger;
    this.submitNotificationMessagePrefForm = true;
    if (this.g.alerts.value == "53" || this.g.alerts.value == "51") {
      if (this.g.notePhoneNo.value == "") {
        this.notePhoneValidate = true;
        return
      }
    }
    if (this.notificationMessagePrefForm.invalid) {
      return
    }
    if (this.notificationMessagePrefForm.controls.alerts.value) {
      this.prefCode = this.notificationMessagePrefForm.controls.alerts.value
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
      this.submitNotificationMessagePrefForm = false;
      this.editPreferencesPage = false;
      this.editPreferenceflag = false;
    },
      error => {
        this.submitNotificationMessagePrefForm = false;
        this.editPreferencesPage = false;
        this.editPreferenceflag = false;
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
    this.loading = true;
    this.settingsService.getMyNotificationPreferences(this.user.email_id).subscribe(data => {
      console.log('prefdata', data);
      this.loading = false;
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
    },
      error => {
        this.loading = false;
      })
  }

}
