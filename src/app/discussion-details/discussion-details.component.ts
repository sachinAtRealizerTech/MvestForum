import { Component, OnInit } from '@angular/core';
import { DiscussiondetailsService } from './Services/discussiondetails.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.scss']
})
export class DiscussionDetailsComponent implements OnInit {
  discussionId:string;
  discussionDetails:any;
  discussionDetailsId:any;
  subCategoryId:any;
  public current_date=new Date();

  constructor(private discussiondetailsService:DiscussiondetailsService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subCategoryId=params['subCategoryId']
       this.discussionId = params['discussionId'];
       this.discussionDetailsId=params['discussionDetailsId']
       //this.discussionId = '5d6dfaa980deae617b3f3925';
    });
    this.getDiscussionDeatils(this.discussionDetailsId);
  }

  getDiscussionDeatils(id:string){
    this.discussiondetailsService.getAllDiscussionsDetails(id).subscribe(data=>{
      this.discussionDetails=data['data'][0];
      console.log(this.discussionDetails)
    })
  }

}
