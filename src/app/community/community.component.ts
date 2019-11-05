import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/Utils';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public user = Utils.GetCurrentUser()

}
