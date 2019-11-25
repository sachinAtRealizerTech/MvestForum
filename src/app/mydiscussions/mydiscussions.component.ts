import { Component, OnInit } from '@angular/core';
import { MydiscussionsService } from './mydiscussions.service';

@Component({
  selector: 'app-mydiscussions',
  templateUrl: './mydiscussions.component.html',
  styleUrls: ['./mydiscussions.component.scss']
})
export class MydiscussionsComponent implements OnInit {
  myDiscussionGroups: any;

  constructor(private mydiscussionsService: MydiscussionsService) { }

  ngOnInit() {
    this.getMyDiscussionGroups('newsachins@gmail.com')
  }

  getMyDiscussionGroups(email: string) {
    this.mydiscussionsService.getMyDiscussionGroups(email).subscribe(data => {
      console.log('mydiscussions', data['data']);
      this.myDiscussionGroups = data['data']
    })
  }


}
