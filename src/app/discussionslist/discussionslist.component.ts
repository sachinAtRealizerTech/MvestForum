import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DiscussionslistService} from './Services/discussionslist.service'

@Component({
  selector: 'app-discussionslist',
  templateUrl: './discussionslist.component.html',
  styleUrls: ['./discussionslist.component.scss']
})
export class DiscussionslistComponent implements OnInit {
  subcategoryid:number;
  discussionList:any;
  constructor(private discussionlistService:DiscussionslistService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subcategoryid = params['subcategoryid'];
    });
    this.getDiscussionList(this.subcategoryid)
  }

  getDiscussionList(id){
    debugger;
    this.discussionlistService.getAllDiscussionsList(id).subscribe(data=>{
      this.discussionList=data['data'];
      console.log(data['data'])
    })
}

}
