import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  editPreferencesPage=false ;
  editPreferenceflag=false;
  constructor() { }

  ngOnInit() {
  }
  openEditpreferences(){
    this.editPreferencesPage=true;
    this.editPreferenceflag=true; 
  }
  closeEditpreferences(){
    this.editPreferencesPage=false;
    this.editPreferenceflag=false;
  }
}
