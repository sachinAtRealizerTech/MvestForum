import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './side-nav/components/side-nav.component';
import { TopNavComponent } from './top-nav/components/top-nav.component';
import { RequestsComponent } from './myaccount/requests/components/requests.component';
import { MessagesComponent } from './community/messages/components/messages.component';
import { ScrollToBottomDirective } from './community/messages/directives/ScrollToBottomDirective';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { SigninLayoutComponent } from './layouts/signin-layout/signin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommunityModule } from './community/community.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyaccountComponent } from './myaccount/components/myaccount.component';
import { NotificationComponent } from './myaccount/notification/components/notification.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuard } from './authentication/Components/guards/auth.guards';
import { SettingsComponent } from './myaccount/settings/components/settings.component';
import { SearchresultsComponent } from './searchresults/components/searchresults.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomDatePipe } from './community/messages/pipes/custom.datepipe';
import { SortByDateChronological } from './community/messages/pipes/SortByDateChronological';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    SigninLayoutComponent,
    SideNavComponent,
    TopNavComponent,
    RequestsComponent,
    MessagesComponent,
    ScrollToBottomDirective,
    DashboardComponent,
    MyaccountComponent,
    NotificationComponent,
    SettingsComponent,
    SearchresultsComponent,
    CustomDatePipe,
    SortByDateChronological
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommunityModule,
    NgbModule,
    AuthenticationModule,
    ClickOutsideModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    [AuthGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
