import { Component } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `<div class="container-fluid">
  <div class="row">
    <app-side-nav></app-side-nav>

<main class="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
<app-top-nav></app-top-nav>	
<router-outlet></router-outlet> 
  <!-- <div class="main-content-container container-fluid px-4">	
  
</div>   -->
</main>
    </div>
    </div>
  `,
  styles: []
})
export class HomeLayoutComponent {}