import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  savebutton=false;
  editflag=false;
  editPlanflag=false;
  plansavebutton=false;
  oldPassword= false;
  changePasswordText=true;
  newPassword=false;
  constructor() { }

  ngOnInit() {
  }
  openSave(){
    this.savebutton=true;
    this.editflag=true;
  }
  closeSave(){
    this.savebutton=false;
    this.editflag=false;
  }
  openPlanSave(){
    this.plansavebutton=true;
    this.editPlanflag=true;
  }
  closePlanSave(){
    this.plansavebutton=false;
    this.editPlanflag=false;
  }
  openOldPassword(){
    this.oldPassword=true;
    
  }
  closeOldPassword(){
    this.oldPassword=false
  }

openNewPassword(){
  this.newPassword=true;
  this.oldPassword=false;
}
closeNewPassword(){
  this.newPassword=false;
}

  
}
