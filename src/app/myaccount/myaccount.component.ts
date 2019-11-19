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
  changePasswordText=true;
  Openpassword= false;
  
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
 
openChangePassword(){
  this.Openpassword=true;
}

closeChangePassword(){
 this.Openpassword=false;
}
  
}
