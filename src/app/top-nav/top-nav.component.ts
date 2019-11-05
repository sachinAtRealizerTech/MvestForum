import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/Utils';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  userName: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public user = Utils.GetCurrentUser();

  logout() {
    console.log('seuser', this.user)
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

}
