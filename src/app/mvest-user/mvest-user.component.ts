import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/Utils';

@Component({
  selector: 'app-mvest-user',
  templateUrl: './mvest-user.component.html',
  styleUrls: ['./mvest-user.component.scss']
})
export class MvestUserComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  public user = Utils.GetCurrentUser();

}
